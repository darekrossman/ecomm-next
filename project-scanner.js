#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

export const NEXT_EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];
export function checkFileExists(dir, baseName, extensions = NEXT_EXTENSIONS) {
	return extensions.some((ext) => existsSync(join(dir, `${baseName}${ext}`)));
}

// Migration tracker functions (copied from migration-tracker.js)
const TRACKER_FILE_NAME = "migrated-pages.json";

/**
 * Get the path to the migration tracker file
 * @param {string} targetDir - Target project directory
 * @returns {string} - Path to tracker file
 */
function getTrackerPath(targetDir) {
	return join(targetDir, ".pages-to-app", TRACKER_FILE_NAME);
}

/**
 * Load the migration tracker data
 * @param {string} targetDir - Target project directory
 * @returns {Object} - Tracker data with version and migrations array
 */
function loadMigrationTracker(targetDir) {
	const trackerPath = getTrackerPath(targetDir);

	if (!existsSync(trackerPath)) {
		return {
			version: "1.0",
			migrations: [],
		};
	}

	try {
		const content = readFileSync(trackerPath, "utf-8");
		return JSON.parse(content);
	} catch (_error) {
		return {
			version: "1.0",
			migrations: [],
		};
	}
}

/**
 * Check if a page has been migrated
 * @param {string} targetDir - Target project directory
 * @param {string} pagePath - Page path relative to pages/ directory (e.g., "index.js", "about.tsx", "blog/[slug].js")
 * @returns {boolean} - True if the page has been migrated
 */
function isPageMigrated(targetDir, pagePath) {
	const tracker = loadMigrationTracker(targetDir);
	return tracker.migrations.some(
		(migration) =>
			migration.type === "page" && migration.sourcePath === pagePath,
	);
}

/**
 * Check if an API route has been migrated
 * @param {string} targetDir - Target project directory
 * @param {string} apiPath - API route path relative to pages/api/ directory (e.g., "hello.js", "users/[id].ts")
 * @returns {boolean} - True if the API route has been migrated
 */
function isApiRouteMigrated(targetDir, apiPath) {
	const tracker = loadMigrationTracker(targetDir);
	return tracker.migrations.some(
		(migration) => migration.type === "api" && migration.sourcePath === apiPath,
	);
}

/**
 * Check if a special file has been migrated
 * @param {string} targetDir - Target project directory
 * @param {string} specialFile - Special file name (e.g., "_app.js", "_document.tsx", "404.js")
 * @returns {boolean} - True if the special file has been migrated
 */
function isSpecialFileMigrated(targetDir, specialFile) {
	const tracker = loadMigrationTracker(targetDir);
	return tracker.migrations.some(
		(migration) =>
			migration.type === "special" && migration.sourcePath === specialFile,
	);
}

/**
 * Detect project structure (root-based vs src-based)
 * @param {string} targetDir - Target project directory
 * @returns {Object} - Project structure information
 */
export function detectProjectStructure(targetDir) {
	const srcPagesDir = join(targetDir, "src", "pages");
	const rootPagesDir = join(targetDir, "pages");

	// Check for src-based structure first
	if (existsSync(srcPagesDir)) {
		return {
			type: "src-based",
			baseDir: "src",
			pagesDir: join("src", "pages"),
			appDir: join("src", "app"),
			pagesFullPath: srcPagesDir,
			appFullPath: join(targetDir, "src", "app"),
		};
	}

	// Default to root-based structure
	if (existsSync(rootPagesDir)) {
		return {
			type: "root-based",
			baseDir: ".",
			pagesDir: "pages",
			appDir: "app",
			pagesFullPath: rootPagesDir,
			appFullPath: join(targetDir, "app"),
		};
	}

	// No pages directory found - still return root-based as default
	return {
		type: "root-based",
		baseDir: ".",
		pagesDir: "pages",
		appDir: "app",
		pagesFullPath: rootPagesDir,
		appFullPath: join(targetDir, "app"),
	};
}

/**
 * Recursively scan a directory for files
 * @param {string} dir - Directory to scan
 * @param {string} baseDir - Base directory for relative paths
 * @param {Array<string>} fileList - Accumulated file list
 * @returns {Array<string>} - List of file paths relative to baseDir
 */
function scanDirectory(dir, baseDir = dir, fileList = []) {
	const files = readdirSync(dir);

	for (const file of files) {
		const filePath = join(dir, file);
		const stat = statSync(filePath);

		if (stat.isDirectory()) {
			// Skip node_modules, .next, .git, etc.
			if (!["node_modules", ".next", ".git", "dist", "build"].includes(file)) {
				scanDirectory(filePath, baseDir, fileList);
			}
		} else {
			const relativePath = relative(baseDir, filePath);
			fileList.push(relativePath);
		}
	}

	return fileList;
}

/**
 * Scan the pages directory of a Next.js project
 * @param {string} targetDir - Target project directory
 * @param {Object} structure - Project structure information
 * @returns {Object} - Pages information
 */
export function scanPages(targetDir, structure) {
	const pagesDir = structure
		? structure.pagesFullPath
		: join(targetDir, "pages");

	if (!existsSync(pagesDir)) {
		return {
			pages: [],
			dynamicRoutes: [],
			catchAllRoutes: [],
			apiRoutes: [],
		};
	}

	const allFiles = scanDirectory(pagesDir);

	// Filter for page files (not API routes)
	const pages = allFiles
		.filter((f) => !f.startsWith(`api${sep}`) && !f.startsWith("api/"))
		.filter((f) => /\.(js|jsx|ts|tsx)$/.test(f))
		.filter((f) => !f.startsWith("_")); // Exclude _app, _document, etc.

	const dynamicRoutes = pages.filter((f) => f.includes("[") && f.includes("]"));
	const catchAllRoutes = pages.filter((f) => f.includes("[..."));
	const regularPages = pages.filter((f) => !f.includes("["));

	return {
		pages: regularPages,
		dynamicRoutes: dynamicRoutes.filter((f) => !f.includes("[...")),
		catchAllRoutes,
		allPages: pages,
	};
}

/**
 * Scan API routes in a Next.js project
 * @param {string} targetDir - Target project directory
 * @param {Object} structure - Project structure information
 * @returns {Array<string>} - List of API routes
 */
export function scanApiRoutes(targetDir, structure) {
	const pagesDir = structure
		? structure.pagesFullPath
		: join(targetDir, "pages");
	const apiDir = join(pagesDir, "api");

	if (!existsSync(apiDir)) {
		return [];
	}

	const allFiles = scanDirectory(apiDir);

	return allFiles.filter((f) => /\.(js|jsx|ts|tsx)$/.test(f));
}

/**
 * Check for special Next.js files
 * @param {string} targetDir - Target project directory
 * @param {Object} structure - Project structure information
 * @returns {Object} - Special files status
 */
export function checkSpecialFiles(targetDir, structure) {
	const pagesDir = structure
		? structure.pagesFullPath
		: join(targetDir, "pages");

	const checks = {
		customApp: false,
		customDocument: false,
		custom404: false,
		custom500: false,
		middleware: false,
	};

	if (!existsSync(pagesDir)) {
		return checks;
	}

	// Check for _app
	["_app.js", "_app.jsx", "_app.ts", "_app.tsx"].forEach((file) => {
		if (existsSync(join(pagesDir, file))) {
			checks.customApp = file;
		}
	});

	// Check for _document
	["_document.js", "_document.jsx", "_document.ts", "_document.tsx"].forEach(
		(file) => {
			if (existsSync(join(pagesDir, file))) {
				checks.customDocument = file;
			}
		},
	);

	// Check for 404
	["404.js", "404.jsx", "404.ts", "404.tsx"].forEach((file) => {
		if (existsSync(join(pagesDir, file))) {
			checks.custom404 = file;
		}
	});

	// Check for 500
	["500.js", "500.jsx", "500.ts", "500.tsx"].forEach((file) => {
		if (existsSync(join(pagesDir, file))) {
			checks.custom500 = file;
		}
	});

	// Check for middleware (at root or src/ level)
	const middlewareBaseDir =
		structure?.type === "src-based" ? join(targetDir, "src") : targetDir;

	["middleware.js", "middleware.ts"].forEach((file) => {
		if (existsSync(join(middlewareBaseDir, file))) {
			checks.middleware = file;
		}
	});

	return checks;
}

/**
 * Analyze data fetching methods used in a file
 * @param {string} filePath - Path to the file
 * @returns {Array<string>} - Data fetching methods found
 */
function analyzeDataFetching(filePath) {
	try {
		const content = readFileSync(filePath, "utf-8");
		const methods = [];

		if (content.includes("getStaticProps")) methods.push("getStaticProps");
		if (content.includes("getServerSideProps"))
			methods.push("getServerSideProps");
		if (content.includes("getInitialProps")) methods.push("getInitialProps");
		if (content.includes("getStaticPaths")) methods.push("getStaticPaths");

		return methods;
	} catch (_error) {
		return [];
	}
}

/**
 * Scan for data fetching methods across all pages
 * @param {string} targetDir - Target project directory
 * @param {Array<string>} pages - List of page files
 * @param {Object} structure - Project structure information
 * @returns {Object} - Data fetching analysis
 */
export function scanDataFetching(targetDir, pages, structure) {
	const pagesDir = structure
		? structure.pagesFullPath
		: join(targetDir, "pages");
	const methodsUsed = new Set();
	const filesByMethod = {
		getStaticProps: [],
		getServerSideProps: [],
		getInitialProps: [],
		getStaticPaths: [],
	};

	pages.forEach((page) => {
		const filePath = join(pagesDir, page);
		const methods = analyzeDataFetching(filePath);

		methods.forEach((method) => {
			methodsUsed.add(method);
			filesByMethod[method].push(page);
		});
	});

	return {
		methodsUsed: Array.from(methodsUsed),
		filesByMethod,
	};
}

/**
 * Check for compatibility issues
 * @param {string} targetDir - Target project directory
 * @returns {Array<string>} - List of potential issues
 */
export function checkCompatibilityIssues(targetDir) {
	const issues = [];
	const packageJsonPath = join(targetDir, "package.json");

	try {
		const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
		const dependencies = {
			...packageJson.dependencies,
			...packageJson.devDependencies,
		};

		// Check for deprecated packages
		if (dependencies["next-images"]) {
			issues.push(
				"next-images is deprecated, use Next.js built-in image optimization",
			);
		}

		if (dependencies["next-fonts"]) {
			issues.push("next-fonts is deprecated, use next/font instead");
		}

		// Check for getInitialProps usage (should be migrated)
		const nextVersion = dependencies.next;
		if (
			nextVersion &&
			!nextVersion.includes("13") &&
			!nextVersion.includes("14") &&
			!nextVersion.includes("15") &&
			nextVersion !== "latest" &&
			!nextVersion.includes("latest")
		) {
			issues.push(
				"Consider upgrading to Next.js 14+ for latest App Router features",
			);
		}
	} catch (error) {
		issues.push(`Could not read package.json: ${error.message}`);
	}

	return issues;
}

/**
 * Perform comprehensive project scan
 * @param {string} targetDir - Target project directory
 * @returns {Object} - Complete project analysis
 */
export function scanProject(targetDir) {
	// Detect project structure (root-based vs src-based)
	const structure = detectProjectStructure(targetDir);

	const pagesInfo = scanPages(targetDir, structure);
	const apiRoutes = scanApiRoutes(targetDir, structure);
	const specialFiles = checkSpecialFiles(targetDir, structure);
	const dataFetching = scanDataFetching(
		targetDir,
		pagesInfo.allPages,
		structure,
	);
	const compatibilityIssues = checkCompatibilityIssues(targetDir);

	// Get Next.js version
	const packageJsonPath = join(targetDir, "package.json");
	let nextVersion = "unknown";
	try {
		const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
		nextVersion =
			packageJson.dependencies?.next ||
			packageJson.devDependencies?.next ||
			"unknown";
	} catch (_error) {
		// Already validated earlier, shouldn't happen
	}

	const analysis = {
		projectStructure: structure,
		pages: pagesInfo.pages,
		dynamicRoutes: pagesInfo.dynamicRoutes,
		catchAllRoutes: pagesInfo.catchAllRoutes,
		apiRoutes,
		dataFetchingMethods: dataFetching.methodsUsed,
		dataFetchingByFile: dataFetching.filesByMethod,
		customApp: specialFiles.customApp,
		customDocument: specialFiles.customDocument,
		custom404: specialFiles.custom404,
		custom500: specialFiles.custom500,
		middleware: specialFiles.middleware,
		nextVersion,
		compatibilityIssues,
		summary: {
			totalPages: pagesInfo.allPages.length,
			totalApiRoutes: apiRoutes.length,
			hasDynamicRoutes: pagesInfo.dynamicRoutes.length > 0,
			hasCustomApp: !!specialFiles.customApp,
			hasCustomDocument: !!specialFiles.customDocument,
			hasMiddleware: !!specialFiles.middleware,
		},
	};

	return analysis;
}

/**
 * Read file contents for context
 * @param {string} targetDir - Target project directory
 * @param {Array<string>} files - Files to read
 * @param {Object} structure - Project structure information
 * @param {number} maxFiles - Maximum number of files to read
 * @returns {Object} - File contents
 */
export function readFilesForContext(
	targetDir,
	files,
	structure,
	maxFiles = 10,
) {
	const contents = {};
	const filesToRead = files.slice(0, maxFiles);
	const pagesDir = structure
		? structure.pagesFullPath
		: join(targetDir, "pages");

	filesToRead.forEach((file) => {
		try {
			const fullPath = join(pagesDir, file);
			contents[file] = readFileSync(fullPath, "utf-8");
		} catch (error) {
			contents[file] = `Error reading file: ${error.message}`;
		}
	});

	return contents;
}

/**
 * Check for remaining items that haven't been migrated yet
 * @param {string} targetDir - Target project directory
 * @returns {Object} - Information about remaining items
 */
export function checkRemainingItems(targetDir) {
	// Detect project structure
	const structure = detectProjectStructure(targetDir);
	const pagesDir = structure.pagesFullPath;
	const appDir = structure.appFullPath;

	// If pages directory doesn't exist, nothing to migrate
	if (!existsSync(pagesDir)) {
		return {
			hasRemaining: false,
			remainingPages: [],
			remainingApiRoutes: [],
			remainingSpecialFiles: [],
			totalRemaining: 0,
		};
	}

	// Scan for remaining pages (excluding API routes and special files)
	const pagesInfo = scanPages(targetDir, structure);
	const apiRoutes = scanApiRoutes(targetDir, structure);
	const specialFiles = checkSpecialFiles(targetDir, structure);

	// Filter out pages that have been migrated (check migration tracker and app/ directory)
	const remainingPages = pagesInfo.allPages.filter((page) => {
		// Skip API routes, they're tracked separately
		if (page.startsWith(`api${sep}`) || page.startsWith("api/")) {
			return false;
		}

		// Skip special files (_app, _document, etc.) - tracked separately
		if (
			page.includes("_app") ||
			page.includes("_document") ||
			page.includes("_error") ||
			page === "404.js" ||
			page === "404.tsx" ||
			page === "500.js" ||
			page === "500.tsx"
		) {
			return false;
		}

		// Check if the page still exists in pages/ directory
		const pageExists = existsSync(join(pagesDir, page));
		if (!pageExists) {
			return false; // Already deleted, so it's migrated
		}

		// Check migration tracker first
		if (isPageMigrated(targetDir, page)) {
			return false; // Already tracked as migrated
		}

		// Convert pages route to app route
		// pages/index.js -> app/page.js
		// pages/about.js -> app/about/page.js
		// pages/blog/[slug].js -> app/blog/[slug]/page.js
		let appRoute = page.replace(/\.(js|jsx|ts|tsx)$/, "");

		if (appRoute === "index") {
			appRoute = "page";
		} else {
			const parts = appRoute.split(sep);
			appRoute = [...parts, "page"].join(sep);
		}

		// Check if page has been migrated to app directory
		return !checkFileExists(appDir, appRoute);
	});

	// Check for remaining API routes
	const remainingApiRoutes = apiRoutes.filter((route) => {
		// Check if still exists in pages/api/
		const apiExists = existsSync(join(pagesDir, "api", route));
		if (!apiExists) {
			return false;
		}

		// Check migration tracker first
		if (isApiRouteMigrated(targetDir, route)) {
			return false; // Already tracked as migrated
		}

		// Convert to app route format
		// api/hello.js -> app/api/hello/route.js
		const appRoute = route.replace(/\.(js|jsx|ts|tsx)$/, "");
		const parts = appRoute.split(sep);
		const routePath = [...parts, "route"].join(sep);

		return !checkFileExists(join(appDir, "api"), routePath);
	});

	// Check for remaining special files
	const remainingSpecialFiles = [];

	if (
		specialFiles.customApp &&
		existsSync(join(pagesDir, specialFiles.customApp))
	) {
		// Check migration tracker first
		if (!isSpecialFileMigrated(targetDir, specialFiles.customApp)) {
			// Check if root layout exists
			if (!checkFileExists(appDir, "layout")) {
				remainingSpecialFiles.push(specialFiles.customApp);
			}
		}
	}

	if (
		specialFiles.customDocument &&
		existsSync(join(pagesDir, specialFiles.customDocument))
	) {
		// Check migration tracker first
		if (!isSpecialFileMigrated(targetDir, specialFiles.customDocument)) {
			// Check if root layout exists (document is merged into layout)
			if (!checkFileExists(appDir, "layout")) {
				remainingSpecialFiles.push(specialFiles.customDocument);
			}
		}
	}

	if (specialFiles.custom404 && existsSync(join(pagesDir, "404.js"))) {
		// Check migration tracker first
		if (!isSpecialFileMigrated(targetDir, "404.js")) {
			if (!checkFileExists(appDir, "not-found")) {
				remainingSpecialFiles.push("404.js");
			}
		}
	}

	if (specialFiles.custom500 && existsSync(join(pagesDir, "500.js"))) {
		// Check migration tracker first
		if (!isSpecialFileMigrated(targetDir, "500.js")) {
			if (!checkFileExists(appDir, "error")) {
				remainingSpecialFiles.push("500.js");
			}
		}
	}

	const totalRemaining =
		remainingPages.length +
		remainingApiRoutes.length +
		remainingSpecialFiles.length;

	return {
		hasRemaining: totalRemaining > 0,
		remainingPages,
		remainingApiRoutes,
		remainingSpecialFiles,
		totalRemaining,
	};
}

// Main execution block - runs when file is executed directly
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
	// Parse command-line arguments
	let targetDir = process.cwd();

	for (let i = 2; i < process.argv.length; i++) {
		if (process.argv[i] === "-t" && i + 1 < process.argv.length) {
			targetDir = process.argv[i + 1];
			break;
		}
	}

	// Execute scan and output results as JSON
	const analysis = scanProject(targetDir);
	console.log(JSON.stringify(analysis, null, 2));
}

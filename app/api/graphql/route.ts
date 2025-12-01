import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { NextRequest } from 'next/server'
import { merge } from 'lodash'

// Import schema utilities
const { createSchema } = require('@/graphql/schemas')

// Import plugins
const ocapiPlugin = require('@/graphql/plugins/gql-source-ocapi')

// Initialize plugins
let typeDefs: any[] = []
let resolvers: any = {}
let dataSources: Record<string, any> = {}

const concatTypeDefs = (_typeDefs: any) => (typeDefs = typeDefs.concat(_typeDefs))
const mergeResolvers = (_resolvers: any) => (resolvers = merge(resolvers, _resolvers))
const addDataSource = (dsKey: string, ds: any) => (dataSources[dsKey] = ds)

// Setup plugin schema and data sources
if (ocapiPlugin.onCreateSchema) {
  ocapiPlugin.onCreateSchema({ concatTypeDefs, mergeResolvers })
}
if (ocapiPlugin.onCreateDataSources) {
  ocapiPlugin.onCreateDataSources({ addDataSource })
}

// Create the schema
const schema = createSchema({ typeDefs, resolvers })

// Create Apollo Server instance
const server = new ApolloServer({
  schema,
  introspection: true,
})

// Create handler with Next.js App Router integration
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    // Initialize data sources
    const sources = Object.keys(dataSources).reduce((acc, key) => {
      return {
        ...acc,
        [key]: new dataSources[key](),
      }
    }, {})

    return {
      token: req.headers.get('authorization') || '',
      dataSources: sources,
    }
  },
})

// Handle CORS preflight
function handleCors(response: Response): Response {
  const headers = new Headers(response.headers)
  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  headers.set('Access-Control-Max-Age', '86400')

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

export async function GET(request: NextRequest) {
  const response = await handler(request)
  return handleCors(response)
}

export async function POST(request: NextRequest) {
  const response = await handler(request)
  return handleCors(response)
}

export async function OPTIONS() {
  return new Response('ok', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  })
}

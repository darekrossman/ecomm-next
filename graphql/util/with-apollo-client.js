import React from 'react'
import initApollo from './init-apollo'
import { getDataFromTree } from '@apollo/client/react/ssr'

export default (App, apolloClientConfig = {}) => {
  return class Apollo extends React.Component {
    static displayName = 'withApollo(App)'
    static async getInitialProps(ctx) {
      const { Component, router } = ctx

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo(apolloClientConfig)
      if (typeof window === 'undefined') {
        try {
          // Run all GraphQL queries using Apollo Client 3.x SSR utility
          await getDataFromTree(
            <App {...appProps} Component={Component} router={router} apolloClient={apollo} />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/performance/server-side-rendering/
          console.error('Error while running `getDataFromTree`', error)
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState
      }
    }

    constructor(props) {
      super(props)
      this.apolloClient = initApollo(apolloClientConfig, props.apolloState)
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
}

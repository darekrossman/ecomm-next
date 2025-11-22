'use client'

import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '../lib/gql'
import { RootCategoryFragment } from '../lib/fragments'

const USER_AUTH_QUERY = gql`
  query UserQuery {
    user {
      id
      type
      locale
      token
      cart {
        id
        items {
          id
        }
      }
    }
  }
`

const categoryProductListQuery = gql`
  query category($id: String!) {
    category: getCategory(id: $id) {
      ...RootCategoryFragment
    }
  }
  ${RootCategoryFragment}
`

export function RootProvider({ children }: { children: React.ReactNode }) {
  const { data, error, refetch } = useQuery(USER_AUTH_QUERY, { ssr: false })
  const rootCategoryQuery = useQuery(categoryProductListQuery, { variables: { id: 'root' } })

  useEffect(() => {
    if (data && data.user) {
      localStorage.setItem('ae_token', data.user.token)
    }
    if (error) {
      const { code } = error.graphQLErrors[0].extensions
      if (code === 'UNAUTHENTICATED') {
        localStorage.removeItem('ae_token')
        refetch()
      }
    }
  }, [data, error, refetch])

  if (!rootCategoryQuery.data || !rootCategoryQuery.data.category) {
    return null
  }

  return <>{children}</>
}

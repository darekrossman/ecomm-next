export { default as gql } from 'graphql-tag'
import { useQuery as _useQuery, useMutation as _useMutation } from '@apollo/client'

// In Apollo Client 3.x, suspend is handled differently via Suspense integration
// The suspend: false option from react-apollo-hooks is no longer needed
export const useQuery = (query, opts) => _useQuery(query, { ...opts })
export const useMutation = _useMutation

import { QueryClient } from 'react-query'
import { request, RequestDocument } from 'graphql-request'

export const getClient = () => {
  let client: QueryClient | null = null

  if (!client) {
    client = new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 1000 * 60 * 60 * 24, // 데이터가 inactive 상태일 때 캐싱된 상태로 남아있는 시간
          staleTime: 2000 * 60, // 데이터가 fresh -> stale 상태로 변경되는데 걸리는 시간
          refetchOnMount: false, // 쿼리의 새 인스턴스가 마운트 될 때
          refetchOnReconnect: false, // 네트워크가 끊어졌다가 다시 연결될 때
          refetchOnWindowFocus: false, // window 가 다시 포커스 될 때
        },
      },
    })
  }

  return client
}

const BASE_URL = import.meta.env.VITE_SERVER_URL as string

export const graphqlFetcher = (query: RequestDocument, variables = {}) =>
  request(`${BASE_URL}/graphql`, query, variables)

export const QueryKeys = {
  PRODUCTS: 'PRODUCTS',
  CART: 'CART',
}

import { QueryClient } from 'react-query'
import { METHOD, fetchObj } from './types/types'
import axios from 'axios'
import { request, RequestDocument } from 'graphql-request'

export const getClient = () => {
  let client: QueryClient | null = null

  if (!client) {
    client = new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 1000 * 60 * 60 * 24, // 데이터가 inactive 상태일 때 캐싱된 상태로 남아있는 시간
          staleTime: 1000, // 데이터가 fresh -> stale 상태로 변경되는데 걸리는 시간
          refetchOnMount: false, // 쿼리의 새 인스턴스가 마운트 될 때
          refetchOnReconnect: false, // 네트워크가 끊어졌다가 다시 연결될 때
          refetchOnWindowFocus: false, // window 가 다시 포커스 될 때
        },
      },
    })
  }
  return client
}

// axios.defaults.baseURL = 'https://fakestoreapi.com'

const URL = 'https://api.jin-shop.link/graphql'

// export const fetcher = async (
//   method: METHOD,
//   url: string,
//   ...rest: { [key: string]: any }[]
// ) => {
//   const res = await axios[method](url, ...rest)
//   return res.data
// }

export const graphqlFetcher = (query: RequestDocument, variables = {}) =>
  request(URL, query, variables)

export const QueryKeys = {
  PRODUCTS: 'PRODUCTS',
  CART: 'CART',
}

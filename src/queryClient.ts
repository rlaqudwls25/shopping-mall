import { QueryClient } from 'react-query'
import { METHOD, fetchObj } from './types/types'

export const getClient = (() => {
  let client: QueryClient | null = null

  return () => {
    if (!client) {
      client = new QueryClient({})
    }
    return client
  }
})()

const BASE_URL = 'https://fakestoreapi.com'

export const fetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: METHOD
  path: string
  body?: fetchObj
  params?: fetchObj
}) => {
  try {
    const url = `${BASE_URL}${path}`
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': BASE_URL,
      },
    }
    const res = await fetch(url, fetchOptions)
    const json = await res.json()
    return json
  } catch (error) {
    console.error(Error)
  }
}

export const QueryKeys = {
  PRODUCTS: 'PRODUCTS',
}

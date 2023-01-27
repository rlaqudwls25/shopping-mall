import { useParams } from 'react-router-dom'

import {
  QueryFunctionContext,
  QueryKey,
  useQuery,
  UseQueryOptions,
} from 'react-query'
import { CartType } from '../pages/graphql/cart'
import { GET_PRODUCT } from '../pages/graphql/products'
import { graphqlFetcher, QueryKeys } from '../queryClient'

const useGetProductDetailData = () => {
  const { id } = useParams()

  console.log('id', id)
  const { data } = useQuery([QueryKeys.PRODUCTS, id], () =>
    graphqlFetcher(GET_PRODUCT, { id })
  )

  return { data }
}

export default useGetProductDetailData

import { useInfiniteQuery } from 'react-query'
import { GET_PRODUCTS, Products } from '../pages/graphql/products'
import { graphqlFetcher, QueryKeys } from '../queryClient'

const useGetProduct = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQuery<Products>(
      QueryKeys.PRODUCTS,
      ({ pageParam = '' }) =>
        graphqlFetcher(GET_PRODUCTS, { cursor: pageParam }),
      {
        getNextPageParam: (res) => {
          return res.products?.[res.products.length - 1]?.id
        },
      }
    )

  return { data, isLoading, hasNextPage, fetchNextPage }
}

export default useGetProduct

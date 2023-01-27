import { useQuery } from 'react-query'
import { GET_CART } from '../pages/graphql/cart'
import { graphqlFetcher, QueryKeys } from '../queryClient'

const useGetCartData = () => {
  const { data } = useQuery(QueryKeys.CART, () => graphqlFetcher(GET_CART), {
    staleTime: 0,
    cacheTime: 1000,
  })

  return { data }
}

export default useGetCartData

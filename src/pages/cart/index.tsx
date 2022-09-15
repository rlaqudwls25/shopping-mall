import React from 'react'
import { useQuery } from 'react-query'
import CartItem from '../../components/cart/cartList'
import { CartType, GET_CART } from '../../graphql/cart'
import { graphqlFetcher, QueryKeys } from '../../queryClient'

const Cart = () => {
  const { data } = useQuery(QueryKeys.CART, () => graphqlFetcher(GET_CART), {
    staleTime: 0,
    cacheTime: 1000,
  })

  const newData = Object.values(data || {}) as CartType[]

  if (!newData.length) return <div>장바구니가 비었습니다.</div>

  return (
    <>
      <CartItem items={newData} />
    </>
  )
}

export default Cart

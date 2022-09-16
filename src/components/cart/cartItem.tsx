import React, { SyntheticEvent } from 'react'
import { useMutation } from 'react-query'
import { CartType, UPDATE_CART } from '../../graphql/cart'
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient'

const CartItem = ({ id, imageUrl, price, title, amount }: CartType) => {
  const queryClient = getClient()
  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher(UPDATE_CART, { id, amount }),

    {
      // 응답이 성공했을 때 값을 update 시켜준다.
      onSuccess: (newValue) => {
        // cartItem 하나에 대한 데이터 update
        const prevCart = queryClient.getQueryData(QueryKeys.CART)
        const newCart = {
          ...(prevCart || {}),
          [id]: newValue,
        }

        // cartItem 전체에 대한 데이터를 update
        queryClient.setQueryData(QueryKeys.CART, newCart)
      },
    }
  )

  const handleAmountCount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value)
    updateCart({ id, amount })
  }
  return (
    <div className="cart-item">
      <img src={imageUrl} />
      <p>{title}</p>
      <p>{price}</p>
      <input type="number" value={amount} onChange={handleAmountCount}></input>
    </div>
  )
}

export default CartItem

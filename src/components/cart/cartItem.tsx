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
      onSuccess: () => queryClient.invalidateQueries(QueryKeys.CART),
    }
  )

  console.log('quertClient', queryClient)

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

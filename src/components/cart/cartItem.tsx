import React from 'react'
import { CartType } from '../../graphql/cart'

const CartItem = ({ id, imageUrl, price, title, amount }: CartType) => {
  return (
    <div>
      {id}
      {imageUrl}
      {price}
      {title}
      {amount}
    </div>
  )
}

export default CartItem

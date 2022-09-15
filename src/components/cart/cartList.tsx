import React from 'react'
import { CartType } from '../../graphql/cart'
import CartItem from './cartItem'

const CartList = ({ items }: { items: CartType[] }) => {
  return (
    <>
      <ul className="cart">
        {items.map((item) => (
          <CartItem {...item} key={item.id} />
        ))}
      </ul>
    </>
  )
}

export default CartList
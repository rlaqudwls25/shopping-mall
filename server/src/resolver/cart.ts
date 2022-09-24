import { mockProducts } from './product'
import { Resolver } from './type'

let cartData: { [key: string]: any } = []

const cartResolver: Resolver = {
  Query: {
    cart: (parent, args, context, info) => {
      return cartData
    },
  },
  Mutation: {
    addCart: (parent, { id }, context, info) => {
      let newCartData = { ...cartData }
      const targetProduct = mockProducts.find((item) => item.id === id)

      const newItem = {
        ...targetProduct,
        amount: (newCartData[id]?.amount || 0) + 1,
      }

      newCartData[id] = newItem
      cartData = newCartData

      return newItem
    },
    updateCart: (parent, { id, amount }, context, info) => {
      let newData = { ...cartData }

      const newItem = {
        ...newData[id],
        amount,
      }

      newData[id] = newItem
      cartData = newData

      return newItem
    },
    deleteCart: (parent, { id }, context, info) => {
      let newData = { ...cartData }

      delete newData[id]
      cartData = newData

      return id
    },
    executePay: (parent, { ids }, context, info) => {
      const newCartData = cartData.filter(
        (cartItem: { [key: string]: string | number }) =>
          !ids.includes(cartItem.id)
      )
      cartData = newCartData

      return ids
    },
  },
}

export default cartResolver

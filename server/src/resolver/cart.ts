import { DBField, writeDB } from '../dbController'
import { Cart, Resolver } from './type'

const setJSON = (data: Cart) => writeDB(DBField.CART, data)

const cartResolver: Resolver = {
  Query: {
    cart: (parent, args, { db }) => {
      return db.cart
    },
  },
  Mutation: {
    addCart: (parent, { id }, { db }) => {
      if (!id) throw new Error('상품 ID가 없습니다.')
      // targetProduct는 어떤 상품을 담았는지 알기 위함
      // 그런데 지금은 cart data에서 직접 찾아 index를 뽑아낸다.
      const targetProduct = db.products.find((item) => item.id === id)
      if (!targetProduct) {
        throw new Error('상품이 없습니다.')
      }

      const existCartIndex = db.cart.findIndex((item) => item.id === id)
      console.log('????')
      if (existCartIndex > -1) {
        const newCartItem = {
          // ...db.cart[existCartIndex],
          id,
          amount: db.cart[existCartIndex].amount + 1,
        }

        console.log('newCartItem', newCartItem)
        db.cart.splice(existCartIndex, 1, newCartItem)
        setJSON(db.cart)

        return newCartItem
      }

      // amount 증가 문제..
      // newItem에 id만 오는 이유가 뭘까..

      const newItem = {
        id,
        amount: 1,
      }

      db.cart.push(newItem)
      setJSON(db.cart)

      console.log('db.cart', db.cart)
      console.log('newItem', newItem)
      return newItem
    },
    updateCart: (parent, { id, amount }, { db }) => {
      const updateTarget = db.cart.findIndex((item) => item.id === id)

      if (!updateTarget) throw Error('상품이 없다.')

      const newCartItem = {
        // ...db.cart[updateTarget],
        id,
        amount,
      }

      db.cart.splice(updateTarget, 1, newCartItem)
      setJSON(db.cart)
      return newCartItem
    },
    deleteCart: (parent, { id }, { db }, info) => {
      const deleteTarget = db.cart.findIndex((item) => item.id === id)

      db.cart.splice(deleteTarget, 1)
      setJSON(db.cart)
      return id
    },
    executePay: (parent, { ids }, { db }, info) => {
      const newCartData = db.cart.filter(
        (cartItem) => !ids.includes(cartItem.id)
      )
      db.cart = newCartData
      setJSON(db.cart)
      return ids
    },
  },

  CartItem: {
    product: (cartItem, args, { db }) =>
      db.products.find((product: any) => product.id === cartItem.id),
  },
}

export default cartResolver

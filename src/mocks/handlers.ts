import { graphql } from 'msw'
// import { v4 as uuid } from 'uuid'
import {
  ADD_CART,
  CartType,
  DELETE_CART,
  GET_CART,
  UPDATE_CART,
} from '../graphql/cart'
import { GET_PRODUCT, GET_PRODUCTS } from '../graphql/products'

const mockProducts = Array.from({ length: 20 }).map((_, idx) => ({
  id: idx + 1 + '',
  imageUrl: `http://placeimg.com/440/280/${idx + 1}`,
  price: 50000,
  title: `임시상품${idx + 1}`,
  description: `임시상세내용${idx + 1}`,
  createdAt: new Date(1646745501883 + idx * 1000 * 60 * 60 * 24).toString(),
}))

let cartData: { [key: string]: CartType } = {}

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, ctx) => {
    return res(
      ctx.data({
        products: mockProducts,
      })
    )
  }),

  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    const targetDetail = mockProducts.find(
      (item) => item.id === req.variables.id
    )

    if (targetDetail) {
      return res(ctx.data(targetDetail))
    }
    return res()
  }),

  graphql.query(GET_CART, (req, res, ctx) => {
    return res(ctx.data(cartData))
  }),

  graphql.mutation(ADD_CART, (req, res, ctx) => {
    let newCartData = { ...cartData }
    const cartId = req.variables.id

    const targetProduct = mockProducts.find(
      (item) => item.id === req.variables.id
    )

    if (!targetProduct) throw new Error('상품이 없습니다.')

    const newItem = {
      ...targetProduct,
      amount: (newCartData[cartId]?.amount || 0) + 1,
    }

    newCartData[cartId] = newItem

    console.log('cartData1', cartData)
    cartData = newCartData

    console.log('cartData2', cartData)
    return res(ctx.data(newItem))
  }),

  graphql.mutation(UPDATE_CART, (req, res, ctx) => {
    let newData = { ...cartData }
    const cartId = req.variables.id
    const amount = req.variables.amount

    if (!newData[cartId]) throw new Error('없는 데이터 입니다.')

    const newItem = {
      ...newData[cartId],
      amount,
    }

    newData[cartId] = newItem
    cartData = newData

    return res(ctx.data(newItem))
  }),

  graphql.mutation(DELETE_CART, (req, res, ctx) => {
    let newData = { ...cartData }

    // const deleteId = req.variables.id

    delete newData[req.variables.id]

    cartData = newData

    return res(ctx.data(req.variables.id))
  }),
]

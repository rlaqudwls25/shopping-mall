import { graphql } from 'msw'
// import { v4 as uuid } from 'uuid'
import { ADD_CART, CartType, GET_CART, UPDATE_CART } from '../graphql/cart'
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
    let newData = { ...cartData }
    const cartId = req.variables.id

    if (newData[cartId]) {
      newData[cartId] = {
        ...newData[cartId],
        amount: (newData[cartId].amount || 0) + 1,
      }
    } else {
      const targetDetail = mockProducts.find(
        (item) => item.id === req.variables.id
      )

      if (targetDetail) {
        newData[cartId] = {
          ...targetDetail,
          amount: 1,
        }
      }
    }

    console.log(res)
    cartData = newData
    return res(ctx.data(newData))
  }),

  graphql.mutation(UPDATE_CART, (req, res, ctx) => {
    let newData = { ...cartData }
    const cartId = req.variables.id
    const amount = req.variables.amount

    if (!newData[cartId]) throw new Error('없는 데이터 입니다.')

    newData[cartId] = {
      ...newData[cartId],
      amount,
    }

    cartData = newData

    console.log('cartData', cartData)

    return res(ctx.data(cartData))
  }),
]

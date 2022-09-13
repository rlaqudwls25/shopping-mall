import { graphql } from 'msw'
import { v4 as uuid } from 'uuid'
import { GET_PRODUCT, GET_PRODUCTS } from '../graphql/products'

const mockProducts = Array.from({ length: 20 }).map((_, idx) => ({
  id: uuid(),
  imageUrl: `http://placeimg.com/440/280/${idx + 1}`,
  price: 50000,
  title: `임시상품${idx + 1}`,
  description: `임시상세내용${idx + 1}`,
  createdAt: new Date(1646745501883 + idx * 1000 * 60 * 60 * 24).toString(),
}))

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, ctx) => {
    return res(
      ctx.data({
        products: mockProducts,
      })
    )
  }),

  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    return res(ctx.data(mockProducts[0]))
  }),
]

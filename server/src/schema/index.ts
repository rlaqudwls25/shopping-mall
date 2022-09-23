import { gql } from 'apollo-server-express'
import productSchema from './product'
import cartSchema from './cart'

// Query 안에 각각에 스키마 파일에 존재하는 Query 애들을 묶어주는 형태라고 보면 된다
// products: [Product!
// product(id: ID!): Product!
// carts: [CartItem!]
//
const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`

export default [linkSchema, productSchema, cartSchema]

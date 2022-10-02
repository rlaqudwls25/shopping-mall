import { gql } from 'apollo-server-express'

const adminSchema = gql`
  type Product {
    id: ID!
    imageUrl: String!
    title: String!
    description: String
    price: Int!
    createdAt: Float
  }
  extend type Mutation {
    addProduct(
      imageUrl: String!
      title: String!
      description: String!
      price: Int!
    ): Product!

    updateProduct(
      id: ID!
      imageUrl: String
      price: Int
      title: String
      description: String
    ): Product!
  }
`

export default adminSchema

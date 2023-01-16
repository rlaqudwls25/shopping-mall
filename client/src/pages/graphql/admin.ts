import { gql } from 'graphql-tag'

export const ADD_PRODUCT = gql`
  mutation ADD_PRODUCT(
    $imageUrl: String!
    $price: Int!
    $title: String!
    $description: String!
  ) {
    addProduct(
      price: $price
      imageUrl: $imageUrl
      title: $title
      description: $description
    ) {
      id
      imageUrl
      price
      title
      description
      createdAt
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $id: ID!
    $imageUrl: String
    $price: Int
    $title: String
    $description: String
  ) {
    updateProduct(
      id: $id
      imageUrl: $imageUrl
      price: $price
      title: $title
      description: $description
    ) {
      id
      title
      imageUrl
      price
      description
      createdAt
    }
  }
`

// export const DELETE_PRODUCT = gql`
//   mutation DELETE_PRODUCT($id: ID!) {
//     deleteProduct(id: $id) {
//       id
//     }
//   }
// `

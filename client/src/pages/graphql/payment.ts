import { gql } from 'graphql-tag'

export type PaymentInfos = {
  id: string
}
export const EXCUTE_PAY = gql`
  mutation EXCUTE_PAY($id: [String!]) {
    id
  }
`

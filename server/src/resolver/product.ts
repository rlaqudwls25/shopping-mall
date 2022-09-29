import { Resolver } from './type'

const productResolver: Resolver = {
  Query: {
    products: (parent, { cursor = '' }, { db }) => {
      const findIndex = db.products.findIndex((item) => item.id === cursor) + 1
      return db.products.slice(findIndex, 10 + findIndex)
    },
    product: (parent, { id }, { db }) => {
      const found = db.products.find((item) => item.id === id)

      if (found) return found
      return null
    },
  },
}

export default productResolver

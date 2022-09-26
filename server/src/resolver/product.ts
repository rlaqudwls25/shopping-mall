import { Resolver } from './type'

const productResolver: Resolver = {
  Query: {
    products: (parent, args, { db }) => {
      return db.products
    },
    product: (parent, { id }, { db }) => {
      const found = db.products.find((item: any) => item.id === id)
      console.log('found', found)

      if (found) return found
      return null
    },
  },
}

export default productResolver

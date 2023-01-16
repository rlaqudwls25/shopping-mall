import { Resolver } from './type'

const productResolver: Resolver = {
  Query: {
    // 삭제한 상품은 admin에서 상품이 보여야하고 product에서는 상품이 보여지면 안된다.
    products: (parent, { cursor = '', showDeleted = false }, { db }) => {
      const filterDB = showDeleted
        ? db.products
            .filter((product) => !!product.createdAt)
            .sort((a, b) => b.createdAt! - a.createdAt!)
        : db.products
            .filter((product) => !!product.createdAt)
            .sort((a, b) => b.createdAt! - a.createdAt!)

      const findIndex = filterDB.findIndex((item) => item.id === cursor) + 1
      return filterDB.slice(findIndex, 10 + findIndex)
    },
    product: (parent, { id }, { db }) => {
      const found = db.products.find((item) => item.id === id)

      if (found) return found
      return null
    },
  },
}

export default productResolver

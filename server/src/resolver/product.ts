import { Resolver } from './type'

export const mockProducts = Array.from({ length: 20 }).map((_, idx) => ({
  id: idx + 1 + '',
  imageUrl: `https://picsum.photos/id/${idx + 1}/200/150`,
  price: 50000,
  title: `임시상품${idx + 1}`,
  description: `임시상세내용${idx + 1}`,
  createdAt: new Date(1646745501883 + idx * 1000 * 60 * 60 * 24).toString(),
}))

const productResolver: Resolver = {
  Query: {
    products: (parent, args, context, info) => {
      return mockProducts
    },
    product: (parent, { id }, context, info) => {
      return mockProducts.find((item) => item.id === id)
    },
  },
}

export default productResolver

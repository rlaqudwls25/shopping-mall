import React from 'react'
import { useQuery } from 'react-query'
import ProductItem from '../../components/productsItem/productItem'
import { graphqlFetcher, QueryKeys } from '../../queryClient'
// import { METHOD, Product } from '../../types/types'
import { GET_PRODUCTS, Product, Products } from '../graphql/products'

const ProductList = () => {
  const { data } = useQuery<Products>(QueryKeys.PRODUCTS, () =>
    graphqlFetcher(GET_PRODUCTS)
  )

  return (
    <>
      <div>
        <h2>상품 목록</h2>
        <ul className="products">
          {data?.products?.map((product: Product) => (
            <ProductItem {...product} key={product.id} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default ProductList

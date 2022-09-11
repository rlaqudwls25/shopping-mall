import React from 'react'
import { useQuery } from 'react-query'
import ProductItem from '../../components/productsItem/productItem'
import { fetcher, QueryKeys } from '../../queryClient'
import { METHOD, Product } from '../../types/types'

const ProductList = () => {
  const { data } = useQuery<Product[]>(QueryKeys.PRODUCTS, () =>
    fetcher(METHOD.GET, '/products')
  )

  return (
    <>
      <div>
        <h2>상품 목록</h2>
        <ul className="products">
          {data?.map((product: Product) => (
            <ProductItem {...product} key={product.id} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default ProductList

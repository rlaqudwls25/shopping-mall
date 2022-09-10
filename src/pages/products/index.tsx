import React from 'react'
import { useQuery } from 'react-query'
import ProductItem from '../../components/productsItem/productItem'
import { fetcher, QueryKeys } from '../../queryClient'
import { METHOD, ProductList } from '../../types/types'

const ProductList = () => {
  const { data } = useQuery(QueryKeys.PRODUCTS, () =>
    fetcher({
      method: METHOD.GET,
      path: '/products',
    })
  )

  return (
    <>
      <div>
        <ul>
          {data?.map((product: ProductList) => (
            <ProductItem {...product} key={product.id} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default ProductList

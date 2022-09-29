import React, { useEffect, useRef } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import ProductItem from '../../components/productsItem/productItem'
import { graphqlFetcher, QueryKeys } from '../../queryClient'
// import { METHOD, Product } from '../../types/types'
import { GET_PRODUCTS, Product, Products } from '../graphql/products'

const ProductList = () => {
  const fetchMoreProduct = useRef<HTMLDivElement>(null)
  const { data, error, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery<Products>(
      QueryKeys.PRODUCTS,
      ({ pageParam = '' }) =>
        graphqlFetcher(GET_PRODUCTS, { cursor: pageParam }),
      {
        getNextPageParam: (res) => {
          return res.products?.[res.products.length - 1]?.id
        },
      }
    )

  useEffect(() => {
    if (!data?.pages) return
    console.log('data', data)
  }, [])

  /**
   * data : {
   *   pages: [
   * { products: [...]},
   * { products: [...]},
   * { products: [...]},
   * ],
   * pageParams: [undefiend, ...]
   * }
   */

  return (
    <>
      <h2>상품 목록</h2>
      <ul className="products">
        {data?.pages.map((list: { products: Product[] }) =>
          list.products.map((product: Product) => (
            <ProductItem {...product} key={product.id} />
          ))
        )}
      </ul>
      <div ref={fetchMoreProduct} />
    </>
  )
}

export default ProductList

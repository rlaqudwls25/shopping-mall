import React, { useEffect, useRef, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import ProductItem from '../../components/productsItem/productItem'
import { graphqlFetcher, QueryKeys } from '../../queryClient'
// import { METHOD, Product } from '../../types/types'
import { GET_PRODUCTS, Product, Products } from '../graphql/products'

const ProductList = () => {
  const fetchMoreProduct = useRef<HTMLDivElement>(null) // useRef를 통해 해당 div를 인식
  const observeRef = useRef<IntersectionObserver>()

  const [intersecting, setIntersecting] = useState<boolean>(false)

  useEffect(() => {
    getFetchPage()
  }, [intersecting])

  useEffect(() => {
    getObserve()
  }, [fetchMoreProduct.current])

  const {
    data,
    error,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage, // 다음 api요청을 하는 중 이라고 생각
  } = useInfiniteQuery<Products>(
    QueryKeys.PRODUCTS,
    ({ pageParam = '' }) => graphqlFetcher(GET_PRODUCTS, { cursor: pageParam }),
    {
      getNextPageParam: (res) => {
        return res.products?.[res.products.length - 1]?.id
      },
    }
  )

  const getObserve = () => {
    if (!fetchMoreProduct.current) {
      return
    }
    getObserver().observe(fetchMoreProduct.current)
  }

  const getFetchPage = () => {
    if (intersecting && hasNextPage) {
      fetchNextPage()
    }
  }

  const getObserver = () => {
    if (!observeRef.current) {
      observeRef.current = new IntersectionObserver((entries) => {
        let isIntersect = entries.some((entry) => entry.isIntersecting)
        setIntersecting(isIntersect)
      })
    }

    return observeRef.current
  }

  if (isLoading) return <div>로딩중이에오</div>

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

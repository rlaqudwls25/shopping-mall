import React, { useEffect, useRef, useState } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import ProductItem from '../../components/product/productItem'
import ProductList from '../../components/product/productList'
import useGetProduct from '../../hook/useGetProduct'
import { graphqlFetcher, QueryKeys } from '../../queryClient'
// import { METHOD, Product } from '../../types/types'
import { GET_PRODUCTS, Product, Products } from '../graphql/products'

const ProductPage = () => {
  const fetchMoreProduct = useRef<HTMLDivElement>(null) // useRef를 통해 해당 div를 인식
  const observeRef = useRef<IntersectionObserver>()

  const [intersecting, setIntersecting] = useState<boolean>(false)

  const { data, isLoading, hasNextPage, fetchNextPage } = useGetProduct()

  useEffect(() => {
    getFetchPage()
  }, [intersecting])

  useEffect(() => {
    getObserve()
  }, [fetchMoreProduct.current])

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
        <ProductList list={data?.pages || []} DiffItem={ProductItem} />
      </ul>
      <div ref={fetchMoreProduct} />
    </>
  )
}

export default ProductPage

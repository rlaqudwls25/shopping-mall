import React, { useEffect, useRef, useState } from 'react'
import ProductItem from '../../components/product/productItem'
import ProductList from '../../components/product/productList'
import useGetProduct from '../../hook/useGetProduct'
import useInfiniteScroll from '../../hook/useInfiniteScroll'

const ProductPage = () => {
  const fetchMoreProduct = useRef<HTMLDivElement>(null) // useRef를 통해 해당 div를 인식
  const isIntersecting = useInfiniteScroll(fetchMoreProduct)

  const { data, isLoading, hasNextPage, fetchNextPage } = useGetProduct()

  useEffect(() => {
    getFetchPage()
  }, [isIntersecting])

  const getFetchPage = () => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage()
    }
  }

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

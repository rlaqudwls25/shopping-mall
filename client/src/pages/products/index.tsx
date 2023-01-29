import React, { useEffect, useRef } from 'react'
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
    <section>
      <div className="productList_container">
        <div className="productList_title_box">
          <span className="productList_title">오늘의 상품</span>
        </div>
        <ul className="products">
          <ProductList list={data?.pages || []} DiffItem={ProductItem} />
        </ul>
        <div ref={fetchMoreProduct} />
      </div>
    </section>
  )
}

export default ProductPage

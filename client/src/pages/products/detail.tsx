import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import useGetProductDetailData from '../../hook/useGetProductDetailData'

const ProductDetail = () => {
  const { data } = useGetProductDetailData()

  if (!data) return null

  const { description, title, imageUrl, price } = data.product

  return (
    <>
      <h2>상품 상세</h2>
      <li className="products-detail">
        <p className="category-detail">{description}</p>
        <span className="title-detail">{title}</span>
        <img src={imageUrl} />
        <span className="price-detail">${price}</span>
      </li>
    </>
  )
}

export default ProductDetail

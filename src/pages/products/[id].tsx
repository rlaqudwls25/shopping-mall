import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetcher, QueryKeys } from '../../queryClient'
import { METHOD, Product } from '../../types/types'

const ProductDetail = () => {
  const { id } = useParams()

  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    fetcher(METHOD.GET, `/products/${id}`)
  )

  if (!data) return null

  return (
    <>
      <h2>상품 상세</h2>
      <li className="products-detail">
        <p className="category-detail">{data?.category}</p>
        <span className="title-detail">{data?.title}</span>
        <img src={data?.image} />
        <span className="price-detail">${data?.price}</span>
      </li>
    </>
  )
}

export default ProductDetail

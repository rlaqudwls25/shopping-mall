import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { graphqlFetcher, QueryKeys } from '../../queryClient'
// import { METHOD, Product } from '../../types/types'
import { GET_PRODUCT, Product } from '../graphql/products'

const ProductDetail = () => {
  const { id } = useParams()

  const { data } = useQuery<{ product: Product }>(
    [QueryKeys.PRODUCTS, id],
    () => graphqlFetcher(GET_PRODUCT, { id })
  )

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

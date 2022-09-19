import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { graphqlFetcher, QueryKeys } from '../../queryClient'
// import { METHOD, Product } from '../../types/types'
import { GET_PRODUCT, PRODUCT } from '../../graphql/products'

const ProductDetail = () => {
  const { id } = useParams()

  const { data } = useQuery<PRODUCT>([QueryKeys.PRODUCTS, id], () =>
    graphqlFetcher(GET_PRODUCT, { id })
  )

  if (!data) return null

  return (
    <>
      <h2>상품 상세</h2>
      <li className="products-detail">
        <p className="category-detail">{data?.description}</p>
        <span className="title-detail">{data?.title}</span>
        <img src={data?.imageUrl} />
        <span className="price-detail">${data?.price}</span>
      </li>
    </>
  )
}

export default ProductDetail

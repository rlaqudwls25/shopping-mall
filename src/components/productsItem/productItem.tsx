import React from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ADD_CART } from '../../graphql/cart'
import { PRODUCT } from '../../graphql/products'
import { graphqlFetcher, QueryKeys } from '../../queryClient'
import { Product } from '../../types/types'

const ProductItem = ({ description, imageUrl, price, title, id }: PRODUCT) => {
  const { mutate: addCart } = useMutation((id: string) =>
    graphqlFetcher(ADD_CART, { id })
  )

  return (
    <>
      <li className="products-item">
        <Link to={`/products/${id}`}>
          <p className="category">{description}</p>
          <span className="title">{title}</span>
          <img src={imageUrl} />
          <span className="price">${price}</span>
        </Link>
        <button onClick={() => addCart(id)}>담기</button>
      </li>
    </>
  )
}

export default ProductItem

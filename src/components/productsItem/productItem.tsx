import React from 'react'
import { Link } from 'react-router-dom'
import { PRODUCT } from '../../graphql/products'
import { Product } from '../../types/types'

const ProductItem = ({
  description,
  imageUrl,
  price,
  title,
  id,
  createdAt,
}: PRODUCT): JSX.Element => {
  return (
    <>
      <li className="products-item">
        <Link to={`/products/${id}`}>
          <p className="category">{description}</p>
          <span className="title">{title}</span>
          <img src={imageUrl} />
          <span className="price">${price}</span>
        </Link>
        <button>담기</button>
      </li>
    </>
  )
}

export default ProductItem

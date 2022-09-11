import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../../types/types'

const ProductItem = ({
  category,
  image,
  price,
  title,
  id,
}: Product): JSX.Element => {
  return (
    <>
      <li className="products-item">
        <Link to={`/products/${id}`}>
          <p className="category">{category}</p>
          <span className="title">{title}</span>
          <img src={image} />
          <span className="price">${price}</span>
        </Link>
      </li>
    </>
  )
}

export default ProductItem

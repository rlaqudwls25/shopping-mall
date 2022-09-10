import React from 'react'
import { Product } from '../../types/types'

const ProductItem = ({
  category,
  image,
  price,
  title,
}: Product): JSX.Element => {
  return (
    <li className="products-item">
      <p className="category">{category}</p>
      <span className="title">{title}</span>
      <img src={image} />
      <span className="price">${price}</span>
    </li>
  )
}

export default ProductItem

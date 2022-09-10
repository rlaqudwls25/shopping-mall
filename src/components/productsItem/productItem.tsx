import React from 'react'
import { ProductList } from '../../types/types'

const ProductItem = ({
  category,
  description,
  id,
  image,
  price,
  rating,
  title,
}: ProductList): JSX.Element => {
  return (
    <li>
      <p>{category}</p>
      <p>{description}</p>
      <img src={image} />
      <span>{price}</span>
      <span>
        {rating.count}
        {rating.rate}
      </span>
      <span>{title}</span>
    </li>
  )
}

export default ProductItem

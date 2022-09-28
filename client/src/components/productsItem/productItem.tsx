import React from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { ADD_CART } from '../../pages/graphql/cart'
import { Product } from '../../pages/graphql/products'
import { graphqlFetcher } from '../../queryClient'

const ProductItem = ({ description, imageUrl, price, title, id }: Product) => {
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

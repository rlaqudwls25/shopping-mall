import React from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { ADD_CART } from '../../pages/graphql/cart'
import { Product } from '../../pages/graphql/products'
import { graphqlFetcher } from '../../queryClient'

const AdminItem = ({
  description,
  imageUrl,
  price,
  title,
  id,
  createdAt,
}: Product) => {
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
          <span className="price">{price}원</span>
        </Link>
        {!createdAt && <span>삭제된 상품</span>}
        <button onClick={() => addCart(id)}>어드민</button>
      </li>
    </>
  )
}

export default AdminItem

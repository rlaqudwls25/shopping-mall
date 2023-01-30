import React from 'react'
import { useMutation } from 'react-query'
import Button from '../../components/Button/button'
import { ButtonStyle } from '../../enum'
import useGetProductDetailData from '../../hook/useGetProductDetailData'
import { graphqlFetcher } from '../../queryClient'
import { ADD_CART } from '../graphql/cart'

const ProductDetail = () => {
  const { data, id } = useGetProductDetailData()
  const { mutate: addCart } = useMutation((id: string | undefined) =>
    graphqlFetcher(ADD_CART, { id })
  )

  if (!data) return null

  const { description, title, imageUrl, price } = data.product

  return (
    <div className="detail_container">
      <div className="detail_wrapper">
        <li className="products-detail">
          <span className="title">{title}</span>
          <img src={imageUrl} />
          <p className="description">{description}</p>
          <span className="price">{price}원</span>
          <Button className={ButtonStyle.ADD} onClick={() => addCart(id)}>
            담기
          </Button>
        </li>
      </div>
    </div>
  )
}

export default ProductDetail

import React, { SyntheticEvent, useState } from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { UPDATE_PRODUCT } from '../../pages/graphql/admin'
import { ADD_CART } from '../../pages/graphql/cart'
import { Product } from '../../pages/graphql/products'
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient'
import arrToobj from '../../util/arrToojb'

const AdminItem = ({
  description,
  imageUrl,
  price,
  title,
  id,
  createdAt,
  isEdit,
  startEdit,
  doneEdit,
}: Product & {
  isEdit: boolean
  startEdit: () => void
  doneEdit: () => void
}) => {
  const queryClient = getClient()
  const { mutate: updateProduct } = useMutation(
    ({ title, imageUrl, price, description }: any) =>
      graphqlFetcher(UPDATE_PRODUCT, {
        id,
        title,
        imageUrl,
        price,
        description,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
          refetchInactive: true,
        })
        doneEdit()
      },
    }
  )

  const updateAdminItem = (e: SyntheticEvent) => {
    e.preventDefault()
    const formData = arrToobj([...new FormData(e.target as HTMLFormElement)])
    formData.price = Number(formData.price)
    console.dir(formData)
    updateProduct(formData as any)
  }

  return (
    <>
      {!isEdit ? (
        <li className="products-item">
          <Link to={`/products/${id}`}>
            <p className="category">{description}</p>
            <span className="title">{title}</span>
            <img src={imageUrl} />
            <span className="price">{price}원</span>
          </Link>
          {!createdAt && <span>삭제된 상품</span>}
          <button onClick={startEdit}>수정</button>
        </li>
      ) : (
        <>
          <li className="products-item">
            <form onSubmit={updateAdminItem}>
              <label>
                상품명:{' '}
                <input name="title" type="text" required defaultValue={title} />
              </label>
              <label>
                이미지URL:{' '}
                <input
                  name="imageUrl"
                  type="text"
                  required
                  defaultValue={imageUrl}
                />
              </label>
              <label>
                상품가격:{' '}
                <input
                  name="price"
                  type="number"
                  required
                  min="1000"
                  defaultValue={price}
                />
              </label>
              <label>
                상세: <textarea name="description" defaultValue={description} />
              </label>
              <button type="submit">저장</button>
            </form>
          </li>
        </>
      )}
    </>
  )
}

export default AdminItem

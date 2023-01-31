import React, { SyntheticEvent } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { ButtonStyle } from '../../enum'
import { DELETE_PRODUCT, UPDATE_PRODUCT } from '../../pages/graphql/admin'
import { Product } from '../../pages/graphql/products'
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient'
import { adminEditState } from '../../recoils/admin'
import arrToobj from '../../util/arrToojb'
import Button from '../Button/button'

const AdminItem = ({
  description,
  imageUrl,
  price,
  title,
  id,
  createdAt,
}: Product) => {
  const queryClient = useQueryClient()

  const [itemIndex, setItemIndex] = useRecoilState(adminEditState)
  const isEdit = id === itemIndex

  const abc = () => {
    setItemIndex(id)
  }

  const { mutate: updateProduct } = useMutation(
    ({ title, imageUrl, price, description }: Product) =>
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
        setItemIndex(null)
      },
    }
  )

  const { mutate: deleteProduct } = useMutation(
    ({ id }: { id: string }) => graphqlFetcher(DELETE_PRODUCT, { id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
          refetchInactive: true,
        })
      },
    }
  )

  const updateAdminItem = (e: SyntheticEvent) => {
    e.preventDefault()
    const formData = arrToobj([...new FormData(e.target as HTMLFormElement)])
    formData.price = Number(formData.price)
    updateProduct(formData as any)
  }

  const deleteAdminItem = () => {
    deleteProduct({ id })
  }

  return (
    <>
      {!isEdit ? (
        <li className="products_item">
          <span className="item_title">{title}</span>
          <Link to={`/products/${id}`}>
            <img src={imageUrl} />
          </Link>
          <div className="item_space">
            <p className="item_description">{description}</p>
            <span className="item_price">{price}원</span>
          </div>
          {!createdAt && <span>삭제된 상품</span>}
          <div className="button_box">
            <Button className={ButtonStyle.UPDATE} onClick={abc}>
              수정
            </Button>
            <Button className={ButtonStyle.DELETE} onClick={deleteAdminItem}>
              삭제
            </Button>
          </div>
        </li>
      ) : (
        <>
          <form onSubmit={updateAdminItem}>
            <li className="admin_update_form">
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
                상세: <input name="description" defaultValue={description} />
              </label>
              <Button className={ButtonStyle.UPDATE} type={'submit'}>
                상품 내용 수정
              </Button>
            </li>
          </form>
        </>
      )}
    </>
  )
}

export default AdminItem

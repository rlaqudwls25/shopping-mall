import { SyntheticEvent, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { ButtonStyle } from '../../enum'
import { ADD_PRODUCT } from '../../pages/graphql/admin'
import { graphqlFetcher, QueryKeys } from '../../queryClient'
import arrToobj from '../../util/arrToojb'
import Button from '../Button/button'

// type OmitProduct = Omit<Product, 'id' | 'createdAt'>

interface AdminProps {
  title: string
  imageUrl: string
  price: number
  description: string
}

const AddItem = () => {
  const queryClient = useQueryClient()
  const [toggle, setToggle] = useState(false)

  const { mutate: addProduct } = useMutation(
    ({ title, imageUrl, price, description }: AdminProps) =>
      graphqlFetcher(ADD_PRODUCT, { title, imageUrl, price, description }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
          refetchInactive: true,
        })
      },
    }
  )

  const addAdminItem = (e: SyntheticEvent) => {
    e.preventDefault()
    const formData = arrToobj([...new FormData(e.target as HTMLFormElement)])
    formData.price = Number(formData.price)
    console.dir(formData)
    addProduct(formData as AdminProps)
  }

  const toggleAdminItemBox = () => {
    setToggle((prev) => !prev)
  }

  return (
    <div className="admin_add_container">
      <Button className={ButtonStyle.ADD} onClick={toggleAdminItemBox}>
        상품 추가
      </Button>
      {toggle ? (
        <div className="admin_form">
          <div className="add_item_title">
            <span>상품을 추가해주세요</span>
          </div>
          <div className="admin_form_box">
            <form onSubmit={addAdminItem}>
              <label>
                <input name="title" type="text" required placeholder="상품명" />
              </label>
              <label>
                <input
                  name="imageUrl"
                  type="text"
                  required
                  placeholder="이미지"
                />
              </label>
              <label>
                <input
                  name="price"
                  type="number"
                  required
                  min="1000"
                  placeholder="가격"
                />
              </label>
              <label>
                <input name="description" placeholder="상세" />
              </label>
              <Button className={ButtonStyle.ADD} type={'submit'}>
                등록
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default AddItem

import { SyntheticEvent } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { ADD_PRODUCT } from '../../pages/graphql/admin'
import { graphqlFetcher, QueryKeys } from '../../queryClient'
import arrToobj from '../../util/arrToojb'

// type OmitProduct = Omit<Product, 'id' | 'createdAt'>

interface AdminProps {
  title: string
  imageUrl: string
  price: number
  description: string
}

const AddItem = () => {
  const queryClient = useQueryClient()

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

  return (
    <form onSubmit={addAdminItem}>
      <label>
        상품명: <input name="title" type="text" required />
      </label>
      <label>
        이미지URL: <input name="imageUrl" type="text" required />
      </label>
      <label>
        상품가격: <input name="price" type="number" required min="1000" />
      </label>
      <label>
        상세: <textarea name="description" />
      </label>
      <button type="submit">등록</button>
    </form>
  )
}

export default AddItem

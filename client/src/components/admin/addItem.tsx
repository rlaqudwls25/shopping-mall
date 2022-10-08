import { SyntheticEvent } from 'react'
import { useMutation } from 'react-query'
import { ADD_PRODUCT } from '../../pages/graphql/admin'
import { Product } from '../../pages/graphql/products'
import { graphqlFetcher } from '../../queryClient'
import arrToobj from '../../util/arrToojb'

type OmitProduct = Omit<Product, 'id' | 'createdAt'>

const AddItem = () => {
  const { mutate: addProduct } = useMutation(
    ({ title, imageUrl, price, description }: OmitProduct) =>
      graphqlFetcher(ADD_PRODUCT, { title, imageUrl, price, description })
    // {
    //   // 응답이 성공했을 때 값을 update 시켜준다.
    //   onSuccess: ({ updateCart }) => {
    //     // cartItem 하나에 대한 데이터 update
    //     const { cart: prevCart } = queryClient.getQueryData<{
    //       cart: CartType[]
    //     }>(QueryKeys.CART) || { cart: [] }

    //     const targetIndex = prevCart?.findIndex(
    //       (item) => item.id === updateCart.id
    //     )

    //     if (!prevCart || targetIndex === undefined || targetIndex < 0) return

    //     const newCart = [...prevCart]

    //     // const newCart = {
    //     //   ...(prevCart || {}),
    //     //   [id]: newValue,
    //     // }

    //     newCart.splice(targetIndex, 1, updateCart)

    //     // cartItem 전체에 대한 데이터를 update
    //     queryClient.setQueryData(QueryKeys.CART, { cart: newCart })
    //   },
    // }
  )

  const addAdminItem = (e: SyntheticEvent) => {
    e.preventDefault()
    const formData = arrToobj([...new FormData(e.target as HTMLFormElement)])
    formData.price = Number(formData.price)
    console.dir(formData)
    addProduct(formData as OmitProduct)
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

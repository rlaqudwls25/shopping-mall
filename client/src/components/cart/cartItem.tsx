import React, { ForwardedRef, forwardRef, SyntheticEvent } from 'react'
import { useMutation } from 'react-query'
import { CartType, DELETE_CART, UPDATE_CART } from '../../pages/graphql/cart'
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient'

const CartItem = (
  { id, amount, product: { imageUrl, price, title } }: CartType,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const queryClient = getClient()
  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher(UPDATE_CART, { id, amount }),

    {
      // 응답이 성공했을 때 값을 update 시켜준다.
      onSuccess: ({ updateCart }) => {
        // cartItem 하나에 대한 데이터 update
        const { cart: prevCart } = queryClient.getQueryData<{
          cart: CartType[]
        }>(QueryKeys.CART) || { cart: [] }

        const targetIndex = prevCart?.findIndex(
          (item) => item.id === updateCart.id
        )

        if (!prevCart || targetIndex === undefined || targetIndex < 0) return

        const newCart = [...prevCart]

        // const newCart = {
        //   ...(prevCart || {}),
        //   [id]: newValue,
        // }

        newCart.splice(targetIndex, 1, updateCart)

        // cartItem 전체에 대한 데이터를 update
        queryClient.setQueryData(QueryKeys.CART, { cart: newCart })
      },
    }
  )

  const { mutate: deleteCart } = useMutation(
    ({ id }: { id: string }) => graphqlFetcher(DELETE_CART, { id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.CART)
      },
    }
  )

  const handleAmountCount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value)
    if (amount < 1) return
    updateCart({ id, amount })
  }

  const onDeleteCart = () => {
    deleteCart({ id })
  }
  return (
    <div className="cart-item">
      <input
        className="cart-item-checkbox"
        type="checkbox"
        name="select-item"
        ref={ref}
        data-id={id}
      />
      <img src={imageUrl} />
      <p>{title}</p>
      <p>{price}</p>
      <input
        type="number"
        value={amount}
        min={0}
        onChange={handleAmountCount}
      ></input>
      <button type="button" onClick={onDeleteCart}>
        삭제
      </button>
    </div>
  )
}

export default forwardRef(CartItem)

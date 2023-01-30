import React, { ForwardedRef, forwardRef, SyntheticEvent } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { CartType, DELETE_CART, UPDATE_CART } from '../../pages/graphql/cart'
import { graphqlFetcher, QueryKeys } from '../../queryClient'

const CartItem = (
  { id, amount, product: { imageUrl, price, title, createdAt } }: CartType,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const queryClient = useQueryClient()
  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher(UPDATE_CART, { id, amount }),

    {
      // 응답이 성공했을 때 값을 update 시켜준다.
      onMutate: async ({ id, amount }) => {
        await queryClient.cancelQueries(QueryKeys.CART)
        // cartItem 하나에 대한 데이터 update}
        const prevCart = queryClient.getQueryData<{ cart: CartType[] }>(
          QueryKeys.CART
        )

        const targetIndex = prevCart?.cart?.findIndex((item) => item.id === id)

        if (!prevCart || targetIndex === undefined || targetIndex < 0) return

        const newCart = [...prevCart.cart]

        newCart.splice(targetIndex, 1, { ...newCart[targetIndex], amount })

        // cartItem 전체에 대한 데이터를 update
        queryClient.setQueryData(QueryKeys.CART, { cart: newCart })

        return prevCart
      },

      onError: (error, context: any) => {
        queryClient.setQueryData(QueryKeys.CART, context.prevCart)
      },

      onSettled: () => {
        // 일부러 stale 하게 해서 업데이트를 시켜준다
        queryClient.invalidateQueries(QueryKeys.CART)
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
    <div className="cart_item">
      <div style={{ padding: '5px 0px 15px 0px' }}>
        <span>상품 선택</span>
        <input
          className="cart-item-checkbox"
          type="checkbox"
          name="select-item"
          ref={ref}
          data-id={id}
          disabled={!createdAt}
        />
      </div>
      <img src={imageUrl} />
      <p>상품 이름 : {title}</p>
      <p>상품 가격 : {price}원</p>
      <div style={{ display: 'flex' }}>
        <span>상품 수량 : </span>
        <input
          type="number"
          value={amount}
          min={0}
          onChange={handleAmountCount}
          disabled={!createdAt}
        ></input>
      </div>
      {createdAt ? (
        <button type="button" onClick={onDeleteCart}>
          삭제
        </button>
      ) : (
        <>삭제된 상품입니다.</>
      )}
    </div>
  )
}

export default forwardRef(CartItem)

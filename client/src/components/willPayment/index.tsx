import React from 'react'
import { useRecoilValue } from 'recoil'
import { CartType } from '../../pages/graphql/cart'
import { cartState } from '../../recoils/cart'

// 장바구니
const WillPayment = ({
  goNextStep,
  subTitle,
}: {
  goNextStep?: () => void
  subTitle: string
}) => {
  const checkedItems = useRecoilValue<CartType[]>(cartState)
  const totalPrice = checkedItems.reduce(
    (cur, { amount, product: { price } }) => (cur += amount * price),
    0
  )

  return (
    <div className="cart-payment">
      <ul>
        {checkedItems?.map((item: CartType) => {
          const {
            amount,
            product: { price, title, imageUrl },
            id,
          } = item
          return (
            <li key={id}>
              <img src={imageUrl} />
              <p>{title}</p>
              <p>수량: {amount}</p>
              <p>금액: {price * amount}</p>
            </li>
          )
        })}
      </ul>
      <div className="payBox">
        <span>전체 금액:{totalPrice}</span>
        <button onClick={goNextStep}>{subTitle}</button>
      </div>
    </div>
  )
}

export default WillPayment

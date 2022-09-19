import React from 'react'
import { useRecoilValue } from 'recoil'
import { CartType } from '../../graphql/cart'
import { cartState } from '../../recoils/cart'
import { useNavigate } from 'react-router-dom'

const WillPayment = () => {
  const navigate = useNavigate()
  const checkedItems = useRecoilValue(cartState)
  const totalPrice = checkedItems.reduce(
    (cur, { amount, price }) => (cur += amount * price),
    0
  )

  const goPaymentPage = () => {
    navigate('/payment')
  }

  return (
    <div className="cart-payment">
      <ul>
        {checkedItems?.map((item: CartType) => {
          const { amount, price, title, imageUrl } = item
          return (
            <li key={item.id}>
              <img src={imageUrl} />
              <p>{title}</p>
              <p>수량: {amount}</p>
              <p>금액: {price * amount}</p>
            </li>
          )
        })}
      </ul>
      <div>전체 금액:{totalPrice}</div>
      <button onClick={goPaymentPage}>결제하기</button>
    </div>
  )
}

export default WillPayment

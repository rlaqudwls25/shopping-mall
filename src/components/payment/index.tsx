import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { CartType } from '../../graphql/cart'
import { cartState } from '../../recoils/cart'
import WillPayment from '../willPayment'
import PaymentModal from './modal'

// 모달 결제
const Payment = () => {
  const setCheckedCartData = useSetRecoilState<CartType[]>(cartState)

  const navigate = useNavigate()
  const [toggleModal, setToggleModal] = useState<boolean>(false)

  const showModal = () => {
    setToggleModal(true)
  }

  const proceed = () => {
    setCheckedCartData([])
    navigate('/products', { replace: true })
  }

  const cancel = () => {
    setToggleModal(false)
  }
  return (
    <div>
      <WillPayment subTitle="결제하기" goNextStep={showModal} />
      <PaymentModal show={toggleModal} proceed={proceed} cancel={cancel} />
    </div>
  )
}

export default Payment

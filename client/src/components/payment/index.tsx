import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { EXCUTE_PAY } from '../../pages/graphql/payment'
import { graphqlFetcher } from '../../queryClient'
import { cartState } from '../../recoils/cart'
import WillPayment from '../willPayment'
import PaymentModal from './modal'

// 모달 결제
const Payment = () => {
  const [checkedCartData, setCheckedCartData] = useRecoilState(cartState)

  const navigate = useNavigate()
  const [toggleModal, setToggleModal] = useState<boolean>(false)

  const { mutate: excutePay } = useMutation((id: string[]) =>
    graphqlFetcher(EXCUTE_PAY, id)
  )

  const showModal = () => {
    setToggleModal(true)
  }

  const proceed = () => {
    const payInfos = checkedCartData.map(({ id }) => id)
    setCheckedCartData([])
    excutePay(payInfos)
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

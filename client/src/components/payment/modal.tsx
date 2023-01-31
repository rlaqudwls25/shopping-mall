import React, { ReactChild } from 'react'
import { createPortal } from 'react-dom'
import { ButtonStyle } from '../../enum'
import Button from '../Button/button'

const ModalPortal = ({ children }: { children: ReactChild }) => {
  // 첫번 째 인자 child는 엘리먼트, 혹은 fragment와 같은 어떤 종류이든 렌더링 할 수 있는 React 자식
  // 두 번째 인자는 DOM 엘리먼트
  return createPortal(children, document.getElementById('modal')!)
}

const PaymentModal = ({
  show,
  cancel,
  proceed,
}: {
  show: boolean
  cancel: () => void
  proceed: () => void
}) => {
  return (
    <>
      {show ? (
        <ModalPortal>
          <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal_inner">
              <div className="modal_space">
                <p>결제 하시겠습니까?</p>
                <div className="payment_btn">
                  <Button className={ButtonStyle.NEXT} onClick={proceed}>
                    예
                  </Button>
                  <Button className={ButtonStyle.CANCEL} onClick={cancel}>
                    아니요
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      ) : null}
    </>
  )
}

export default PaymentModal

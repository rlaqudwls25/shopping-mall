import React, { SyntheticEvent, useRef } from 'react'
import { CartType } from '../../graphql/cart'
import CartItem from './cartItem'

const CartList = ({ items }: { items: CartType[] }) => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleCheckBoxChanged = (e: SyntheticEvent) => {
    if (!formRef.current) return

    // cart-item-checkbox라는 classname을 가진 모든 태그 선택
    const checkboxes = formRef.current.querySelectorAll<HTMLInputElement>(
      '.cart-item-checkbox'
    )
    // 어떤 input이 target 되었는지 알 수 있음
    const targetInput = e.target as HTMLInputElement
    const data = new FormData(formRef.current)

    if (targetInput.classList.contains('select-all')) {
      // select-all 선택시
      const allChecked = targetInput.checked
      checkboxes.forEach((inputEle) => {
        inputEle.checked = allChecked
      })
    } else {
      // 개별 아이템 선택시
      const allChecked = data.getAll('select-item').length === items.length
      formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked =
        allChecked
    }
  }
  return (
    <form ref={formRef} onChange={handleCheckBoxChanged}>
      <label>
        전체삭제
        <input className="select-all" name="select-all" type="checkbox" />
      </label>
      <ul className="cart">
        {items.map((item) => (
          <CartItem {...item} key={item.id} />
        ))}
      </ul>
    </form>
  )
}

export default CartList

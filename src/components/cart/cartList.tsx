import React, {
  SyntheticEvent,
  useState,
  useRef,
  createRef,
  useEffect,
} from 'react'
import { useRecoilState } from 'recoil'
import { CartType } from '../../graphql/cart'
import { cartState } from '../../recoils/cart'
import CartItem from './cartItem'
import Payment from './willPayment'

const CartList = ({ items }: { items: CartType[] }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const checkboxRefs = items.map(() => createRef<HTMLInputElement>())
  const [checkedCartData, setCheckedCartData] =
    useRecoilState<CartType[]>(cartState)
  const [formData, setFormData] = useState<FormData>()

  useEffect(() => {
    maintainCartData()
  }, [])

  useEffect(() => {
    updateCheckedData()
  }, [items, formData])

  useEffect(() => {
    checkedCartData.forEach((item) => {
      const isItem = checkboxRefs.find(
        (ref) => ref.current?.dataset.id === item.id
      )

      if (isItem) {
        isItem.current!.checked = true
      }
    })
  }, [])

  const handleCheckBoxChanged = (e: SyntheticEvent) => {
    if (!formRef.current) return

    // 어떤 input이 target 되었는지 알 수 있음
    const targetInput = e.target as HTMLInputElement

    const data = new FormData(formRef.current)

    if (targetInput.classList.contains('select-all')) {
      // select-all 선택시
      const allChecked = targetInput.checked
      checkboxRefs.forEach((inputEle) => {
        inputEle.current!.checked = allChecked
      })
    } else {
      // 개별 아이템 선택시
      const allChecked = data.getAll('select-item').length === items.length
      formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked =
        allChecked
    }

    setFormData(data)
  }

  const maintainCartData = () => {
    checkedCartData.forEach((item) => {
      const isItem = checkboxRefs.find(
        (ref) => ref.current?.dataset.id === item.id
      )

      if (isItem) {
        isItem.current!.checked = true
      }
    })
  }

  const updateCheckedData = () => {
    const checkedItem = checkboxRefs.reduce<CartType[]>((res, ref, idx) => {
      if (ref.current?.checked) res.push(items[idx])
      return res
    }, [])

    setCheckedCartData(checkedItem)
  }

  return (
    <>
      <form ref={formRef} onChange={handleCheckBoxChanged}>
        <label>
          전체선택
          <input className="select-all" name="select-all" type="checkbox" />
        </label>
        <ul className="cart">
          {items.map((item, idx) => (
            <CartItem {...item} key={item.id} ref={checkboxRefs[idx]} />
          ))}
        </ul>
      </form>
      <Payment />
    </>
  )
}

export default CartList

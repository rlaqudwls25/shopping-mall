import { useRecoilValue } from 'recoil'
import { ButtonStyle } from '../../enum'
import { CartType } from '../../pages/graphql/cart'
import { cartState } from '../../recoils/cart'
import Button from '../Button/button'

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
    (result, { amount, product: { price } }) => (result += amount * price),
    0
  )

  return (
    <div className="cart_payment">
      <div className="cart_box">
        <span className="select_item">선택한 상품</span>
      </div>
      <div>
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
        <div className="pay_box">
          <span>전체 금액: {totalPrice}원</span>
          <Button className={ButtonStyle.NEXT} onClick={goNextStep}>
            결제창으로 이동
          </Button>
        </div>
      </div>
    </div>
  )
}

export default WillPayment

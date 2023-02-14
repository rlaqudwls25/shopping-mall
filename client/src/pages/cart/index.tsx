import CartItem from '../../components/cart/cartList'
import useGetCartData from '../../hook/useGetCartData'

const Cart = () => {
  const { data } = useGetCartData()

  const newData = data?.cart || []

  if (!newData.length)
    return (
      <div className="blank_cart_container">
        <span>장바구니가 비었습니다.</span>
      </div>
    )

  return <CartItem items={newData} />
}

export default Cart

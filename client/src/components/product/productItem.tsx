import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { ButtonStyle } from '../../enum'
import { ADD_CART } from '../../pages/graphql/cart'
import { Product } from '../../pages/graphql/products'
import { graphqlFetcher } from '../../queryClient'
import Button from '../Button/button'

const ProductItem = ({ description, imageUrl, price, title, id }: Product) => {
  const { mutate: addCart } = useMutation((id: string) =>
    graphqlFetcher(ADD_CART, { id })
  )

  return (
    <li className="products_item">
      <span className="item_title">{title}</span>
      <div className="img_box">
        <Link to={`/products/${id}`}>
          <img src={imageUrl} />
        </Link>
      </div>
      <p className="item_description">{description}</p>
      <div className="item_space">
        <span className="item_price">{price} 원</span>
      </div>
      <div className="button_box">
        <Button className={`${ButtonStyle.ADD}`} onClick={() => addCart(id)}>
          담기
        </Button>
      </div>
    </li>
  )
}

export default ProductItem

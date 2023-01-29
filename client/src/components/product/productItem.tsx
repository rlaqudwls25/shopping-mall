import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { ADD_CART } from '../../pages/graphql/cart'
import { Product } from '../../pages/graphql/products'
import { graphqlFetcher } from '../../queryClient'

const ProductItem = ({ description, imageUrl, price, title, id }: Product) => {
  const { mutate: addCart } = useMutation((id: string) =>
    graphqlFetcher(ADD_CART, { id })
  )

  return (
    <li className="products_item">
      <span className="item_title">{title}</span>
      <Link to={`/products/${id}`}>
        <img src={imageUrl} />
      </Link>
      <p className="item_description">{description}</p>
      <div className="item_space">
        <span className="item_price">{price} 원</span>
      </div>
      <div>
        <button onClick={() => addCart(id)}>담기</button>
      </div>
    </li>
  )
}

export default ProductItem

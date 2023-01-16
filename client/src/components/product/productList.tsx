import { Product, Products } from '../../pages/graphql/products'

const ProductList = ({
  list,
  DiffItem,
}: {
  list: Products[]
  DiffItem: ({
    description,
    imageUrl,
    price,
    title,
    id,
  }: Product) => JSX.Element
}) => {
  console.log('list', list)
  return (
    <>
      {list.map((item) =>
        item.products.map((product) => (
          <DiffItem {...product} key={product.id} />
        ))
      )}
    </>
  )
}

export default ProductList

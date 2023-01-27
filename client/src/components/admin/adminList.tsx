import { Products } from '../../pages/graphql/products'
import AdminItem from './adminItem'

const AdminList = ({ list }: { list: Products[] }) => {
  return (
    <>
      {list?.map((item) =>
        item?.products.map((adminProduct, idx) => (
          <AdminItem {...adminProduct} key={adminProduct.id} />
        ))
      )}
    </>
  )
}

export default AdminList

import { useEffect, useRef } from 'react'
import AddItem from '../../components/admin/addItem'
import AdminList from '../../components/admin/adminList'
import useGetProduct from '../../hook/useGetProduct'
import useInfiniteScroll from '../../hook/useInfiniteScroll'

const Admin = () => {
  const fetchMoreProduct = useRef<HTMLDivElement>(null) // useRef를 통해 해당 div를 인식
  const isIntersecting = useInfiniteScroll(fetchMoreProduct)

  const { data, isLoading, hasNextPage, fetchNextPage } = useGetProduct()

  useEffect(() => {
    getFetchPage()
  }, [isIntersecting])

  const getFetchPage = () => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <div className="productList_container">
      <div className="productList_wrapper">
        <div className="productList_title_box">
          <span className="productList_title">상품 관리</span>
        </div>
        <AddItem />
        <ul className="products">
          <AdminList list={data?.pages || []} />
        </ul>
        <div ref={fetchMoreProduct} />
      </div>
    </div>
  )
}

export default Admin

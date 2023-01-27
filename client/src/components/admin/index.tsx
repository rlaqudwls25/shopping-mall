import { useEffect, useRef } from 'react'
import useGetProduct from '../../hook/useGetProduct'
import useInfiniteScroll from '../../hook/useInfiniteScroll'
import AddItem from './addItem'
import AdminList from './adminList'

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

  if (isLoading) return <div>로딩중이에오</div>

  return (
    <>
      <h2>관리자 목록</h2>
      <AddItem />
      <ul className="products">
        <AdminList list={data?.pages || []} />
      </ul>
      <div ref={fetchMoreProduct} />
    </>
  )
}

export default Admin

import { useEffect, useRef, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import AddItem from '../../components/admin/addItem'
import AdminItem from '../../components/admin/adminItem'
import ProductList from '../../components/product/productList'
import { graphqlFetcher, QueryKeys } from '../../queryClient'
import { GET_PRODUCTS, Products } from '../graphql/products'

const AdminPage = () => {
  const fetchMoreProduct = useRef<HTMLDivElement>(null) // useRef를 통해 해당 div를 인식
  const observeRef = useRef<IntersectionObserver>()

  const [intersecting, setIntersecting] = useState<boolean>(false)

  useEffect(() => {
    getFetchPage()
  }, [intersecting])

  useEffect(() => {
    getObserve()
  }, [fetchMoreProduct.current])

  const {
    data,
    error,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage, // 다음 페이지가 있을 경우
  } = useInfiniteQuery<Products>(
    [QueryKeys.PRODUCTS, true],
    ({ pageParam = '' }) =>
      graphqlFetcher(GET_PRODUCTS, {
        cursor: pageParam,
        showDeleted: true,
      }),
    {
      getNextPageParam: (res) => {
        return res.products?.[res.products.length - 1]?.id
      },
    }
  )

  const getObserve = () => {
    if (!fetchMoreProduct.current) {
      return
    }
    getObserver().observe(fetchMoreProduct.current)
  }

  const getFetchPage = () => {
    if (intersecting && hasNextPage) {
      fetchNextPage()
    }
  }

  const getObserver = () => {
    if (!observeRef.current) {
      observeRef.current = new IntersectionObserver((entries) => {
        let isIntersect = entries.some((entry) => entry.isIntersecting)
        setIntersecting(isIntersect)
      })
    }

    return observeRef.current
  }

  if (isLoading) return <div>로딩중이에오</div>

  return (
    <>
      <h2>관리자 목록</h2>
      <AddItem />
      <ul className="products">
        <ProductList list={data?.pages || []} DiffItem={AdminItem} />
      </ul>
      <div ref={fetchMoreProduct} />
    </>
  )
}

export default AdminPage

import React from 'react'
import { useQuery } from 'react-query'
import { fetcher, QueryKeys } from '../../queryClient'
import { METHOD } from '../../types/types'

const ProductList = () => {
  const { data } = useQuery(QueryKeys.PRODUCTS, () =>
    fetcher({
      method: METHOD.GET,
      path: '/products',
    })
  )

  console.log('data', data)
  return <div>상품 리스트</div>
}

export default ProductList

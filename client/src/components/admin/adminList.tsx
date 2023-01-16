import React, { useState } from 'react'
import { Products } from '../../pages/graphql/products'
import AdminItem from './adminItem'

const AdminList = ({
  list,
  startEdit,
  editIndex,
  doneEdit,
}: {
  list: Products[]
  startEdit: (index: number) => () => void
  editIndex: number | null
  doneEdit: () => void
}) => {
  return (
    <>
      {list?.map((item) =>
        item?.products.map((adminProduct, idx) => (
          <AdminItem
            {...adminProduct}
            key={adminProduct.id}
            isEdit={editIndex === idx}
            startEdit={startEdit(idx)}
            doneEdit={doneEdit}
          />
        ))
      )}
    </>
  )
}

export default AdminList

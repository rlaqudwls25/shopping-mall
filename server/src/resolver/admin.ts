import { Product, Products, Resolver } from './type'
import { v4 as uuid } from 'uuid'
import { DBField, writeDB } from '../dbController'

const setJSON = (data: Products) => writeDB(DBField.PRODUCTS, data)
const adminResolver: Resolver = {
  Mutation: {
    addProduct: (parent, { imageUrl, title, description, price }, { db }) => {
      const newProduct = {
        id: uuid(),
        imageUrl,
        price,
        title,
        description,
        createdAt: Date.now(),
      }

      db.products.push(newProduct)
      setJSON(db.products)

      return newProduct
    },
    updateProduct: (parent, { id, ...data }, { db }) => {
      const updateTarget = db.products.findIndex((item) => item.id === id)

      if (updateTarget < 0) {
        throw new Error('상품이 없습니다.')
      }

      const updatedItem = {
        ...db.products[updateTarget],
        ...data,
      }

      db.products.splice(updateTarget, 1, updatedItem)

      setJSON(db.products)
      return updatedItem
    },
    deleteProduct: (parent, { id }, { db }) => {
      const deleteTarget = db.products.findIndex((item) => item.id === id)

      if (deleteTarget < 0) {
        throw new Error('상품이 없습니다.')
      }

      const updateItem = {
        ...db.products[deleteTarget],
      }

      delete updateItem.createdAt

      db.products.splice(deleteTarget, 1, updateItem)
      setJSON(db.products)

      return id
    },
  },
}

export default adminResolver

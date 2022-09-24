import fs from 'fs'
import { resolve } from 'path'

const basePath = resolve()

enum DBField {
  CART = 'carts',
  PRODUCTS = 'products',
}
const filenames = {
  [DBField.CART]: resolve(basePath, 'src/db/cart.json'),
  [DBField.PRODUCTS]: resolve(basePath, 'src/db/product.json'),
}

export const readDB = (target: DBField) => {
  try {
    return JSON.parse(fs.readFileSync(filenames[target], 'utf-8'))
  } catch (error) {
    console.error(error)
  }
}

export const writeDB = (target: DBField, data: any) => {
  try {
    return fs.writeFileSync(filenames[target], JSON.stringify(data))
  } catch (error) {
    console.error(error)
  }
}

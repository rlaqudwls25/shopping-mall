import { atom } from 'recoil'
import { CartType } from '../pages/graphql/cart'

export const cartState = atom<CartType[]>({
  key: 'cartState',
  default: [],
})

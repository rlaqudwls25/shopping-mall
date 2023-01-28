import { atom } from 'recoil'
import { CartType } from '../pages/graphql/cart'

export const cartState = atom<CartType[]>({
  key: 'cartState',
  default: [],
})

// export const cartItemSelector = selectorFamily<number, string>({
//   key: 'cartItem',
//   get:
//     (id: string) =>
//     ({ get }) => {
//       const carts = get(cartState)
//       return carts.get(id)
//     },
//   set:
//     (id: string) =>
//     ({ get, set }, newValue) => {
//       if (typeof newValue === 'number') {
//         const newCarts = new Map([...get(cartState)])
//         newCarts.set(id, newValue)
//         set(cartState, newCarts)
//       }
//     },
// })

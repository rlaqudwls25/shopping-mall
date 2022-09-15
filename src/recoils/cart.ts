import { atom, selectorFamily } from 'recoil'

const cartState = atom({
  key: 'cartState',
  default: new Map(),
})

export const cartItemSelector = selectorFamily<number, string>({
  key: 'cartItem',
  get:
    (id: string) =>
    ({ get }) => {
      const carts = get(cartState)
      return carts.get(id)
    },
  set:
    (id: string) =>
    ({ get, set }, newValue) => {
      if (typeof newValue === 'number') {
        const newCarts = new Map([...get(cartState)])
        newCarts.set(id, newValue)
        set(cartState, newCarts)
      }
    },
})

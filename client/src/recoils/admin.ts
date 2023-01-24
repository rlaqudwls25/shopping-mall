import { atom } from 'recoil'

export const adminEditState = atom<null | string>({
  key: 'adminEditState',
  default: null,
})

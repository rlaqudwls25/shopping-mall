import { atom, DefaultValue, selector } from 'recoil'

export const adminEditState = atom<any>({
  key: 'adminEditState',
  default: false,
})

// export const handleEditAdminState = selector({
//   key: 'handleEditAdminState',
//   get: ({ get }) => get(adminEditState),
//   set: ({ set }, newValue) =>
//     set(adminEditState, newValue instanceof DefaultValue && !newValue),
// })

import { Menu } from '@/actions/getMenu/actions'
import { create } from 'zustand'

interface Store {
  menu: Menu[]
  menuAction: (action: Menu) => void
  removeAction: () => void
}
export const useStoreMenu = create<Store>((set) => ({
  menu: [],
  removeAction: () =>
    set({menu: []}),
  menuAction: (evt: Menu) =>
    set((state: { menu }) => {
      return {
        menu: [...state.menu, evt],
      }
    }),
}))

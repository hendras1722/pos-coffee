import { Menu } from '@/actions/getMenu/actions'
import { create } from 'zustand'

interface Store {
  checkout: Menu[]
  checkoutAction: (action: Menu) => void
}
export const useCheckoutMenu = create<Store>((set) => ({
  checkout: [],
  checkoutAction: (evt: Menu) =>
    set((state: { checkout }) => {
      return {
        checkout: [...state.checkout, evt],
      }
    }),
}))

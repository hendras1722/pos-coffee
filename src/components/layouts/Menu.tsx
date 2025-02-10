'use client'

import { useRoute } from '@/composable/useRoute'
import MenuSidebar from '../MenuSidebar'
import { FaBlender, FaHouse } from 'react-icons/fa6'

export default function ListMenu() {
  const route = useRoute()
  const menu = [
    { name: 'Pesanan', href: '/admin/dashboard', icon: () => <FaHouse /> },
    { name: 'Menu', href: '/admin/table', icon: () => <FaBlender /> },
    { name: 'History', href: '/admin/table', icon: () => <FaBlender /> },
    { name: 'Kasir', href: '/admin/kasir', icon: () => <FaBlender /> },
  ]
  return <MenuSidebar menu={menu} route={route} />
}

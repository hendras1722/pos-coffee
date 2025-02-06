'use client'

import { useRoute } from '@/composable/useRoute'
import MenuSidebar from '../MenuSidebar'
import {
  FaCalendarDays,
  FaClock,
  FaComputerMouse,
  FaDatabase,
  FaDoorOpen,
  FaDownLeftAndUpRightToCenter,
  FaFile,
  FaHouse,
  FaNetworkWired,
  FaTable,
  FaTarpDroplet,
} from 'react-icons/fa6'

export default function ListMenu() {
  const route = useRoute()
  const menu = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: () => <FaHouse /> },
    { name: 'Table', href: '/admin/table', icon: () => <FaTable /> },
    {
      name: 'Before Leave Route',
      href: '/admin/beforeleaveroute',
      icon: () => <FaDoorOpen />,
    },
  ]
  return <MenuSidebar menu={menu} route={route} />
}

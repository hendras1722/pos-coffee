import { getChair } from '@/actions/chair/actions'
import DashboardClient from '@/components/dashboard'

interface Chair {
  id: string
  created_at: string
  x: number
  y: number
  name: string
  width: number
  height: number
  place: string
  initialX: number
  initialY: number
}
export default async function Dashboard() {
  const data = (await getChair()) as Chair[]
  return <DashboardClient data={data} />
}

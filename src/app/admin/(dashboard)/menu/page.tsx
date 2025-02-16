import { RenderTable } from '@/components/TableMenu'
import { getMenu } from '@/actions/getMenu/actions'

export default async function User() {
  const { data } = await getMenu()

  return (
    <div>
      <RenderTable data={data || []} />
    </div>
  )
}

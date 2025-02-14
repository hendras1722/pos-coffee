import { RenderTable } from '@/components/TableMenu'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import AddProduct from './addProduct'
import { getMenu } from '@/actions/getMenu/actions'


export default async function User() {

  const { data } = await getMenu()
  
  return (
  <div>
    <div className="ml-auto flex justify-end w-full mb-3">
      <AddProduct />
    </div>
    <RenderTable data={data || []} />
  </div>
  )

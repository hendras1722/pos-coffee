import Checkout from '@/components/checkout'
import Form from '@/components/Menu/form'
// import Keyboard from '@/components/keyboard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/utils/lib'
import ButtonSubmit from './ButtonSubmit'
import SelectCategory from '@/components/SelectCategory'
import ListProduct from './ListProduct'
import { getMenu } from '@/actions/getMenu/actions'
export default async function Menu() {
  const { data } = await getMenu('available', true)

  return (
    <div className="min-h-screen flex w-full">
      <style>
        {`
          @media print {
            @page {
              size: 58mm auto;
             margin: 10mm 0 0 0;
            }
             #struct{
             display: flex !important;
             }
          #print-button {
              display: none !important;
            }
           body * {
              visibility: hidden;
              height: 0;
            }
            #order-section, #order-section * {
              visibility: visible;
              height: auto;
            }
            #order-section {
              position: absolute;
              left: 10pt;
              top: 0;
              width: 62mm; 
              height: auto;
              font-size: 10pt; /* Ukuran font yang lebih kecil */
            }
          }
        `}
      </style>
      <div className="p-10 flex-1">
        <h1>Cashsir App</h1>
        <Form />

        <div className="border-2 border-gray-800 w-full rounded-full my-5"></div>
        <div>
          <div className="mb-5 flex flex-wrap gap-3">
            <SelectCategory />
            <Input
              type="text"
              className="min-w-[80px] max-w-[500px]"
              placeholder="Search"
            />
            <Button className="bg-green-500">Search</Button>
          </div>
          <div className="bg-gray-50 w-full rounded p-5 flex gap-[2%] flex-wrap content-start h-[550px] overflow-auto">
            <ListProduct data={data || []} />
          </div>
        </div>
      </div>
      <div
        id="struct"
        className={cn(
          'w-[600px] border-l-2 border-black p-5 flex-col lg:flex hidden'
        )}
      >
        {/* <div id="order-section">
          <Struct />
        </div> */}
        <Checkout />
        <ButtonSubmit />
      </div>
    </div>
  )
}

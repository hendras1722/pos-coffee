'use client'

export default function Struct() {
  return (
    <div>
      <style>
        {`
          @media print {
            @page {
              size: 58mm auto;
             margin: 10mm 0 0 0;
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
              .cash_id{
              font-size: 10px;
              }
          }
        `}
      </style>
      <h3 className="text-center">Cashsirapp</h3>
      <div className="border-2 border-gray-800 w-full rounded-full my-5 border-dashed"></div>
      <div className="text-sm text-center cash_id">
        {' '}
        CASHSIR021025112903/SYAHENDRA/01
      </div>
      <div className="border-2 border-gray-800 w-full rounded-full my-5 border-dashed"></div>
      <div className="w-full">
        <table className="w-full">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="truncate max-w-[1px]">
                Alfreds Futterkiste asdksad mslamdksaldmaslkdmaslkm
              </td>
              <td>1</td>
              <td>harga</td>
              <td className="text-right">dikali</td>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>1</td>
              <td>harga</td>
              <td className="text-right">dikali</td>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>1</td>
              <td>harga</td>
              <td className="text-right">dikali</td>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>1</td>
              <td>harga</td>
              <td className="text-right">dikali</td>
            </tr>
          </tbody>
        </table>

        <div className="border-2 border-gray-800 w-full rounded-full my-5 border-dashed"></div>
        <div className="flex justify-between">
          <div>Subtotal</div>
          <div>Rp. 10.000</div>
        </div>
        <div className="flex justify-between">
          <div>Tunai</div>
          <div>Rp. 10.000</div>
        </div>
        <div className="flex justify-between">
          <div>Kembali</div>
          <div>Rp. 10.000</div>
        </div>
      </div>
    </div>
  )
}

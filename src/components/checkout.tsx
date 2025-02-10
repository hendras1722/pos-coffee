'use client'

import { useState } from 'react'
import Counter from './counting'
import { Button } from './ui/button'

export default function Checkout() {
  const [count, setCount] = useState(0)
  return (
    <div className="flex-1">
      <h3 className="text-center">Cashsirapp</h3>
      <div className="border-2 border-gray-800 w-full rounded-full my-5 border-dashed"></div>
      <div>
        <div>Name":</div>
        <div>No meja":</div>
      </div>
      <div className="border-2 border-gray-800 w-full rounded-full my-5 border-dashed"></div>
      <div className="h-[550px] overflow-auto">
        {/* start:item */}

        <div className="flex items-center justify-between first:mt-0 mt-5">
          <div className="flex gap-3">
            <div>Kopi Susu</div>
            <div>&#40; x1 &#41;</div>
          </div>
          <div>Rp.200.000</div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <div>
              {' '}
              <Counter start={0} end={count} duration={100} />
            </div>
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </div>
        </div>
        <div className="flex items-center justify-between first:mt-0 mt-5">
          <div className="flex gap-3">
            <div>Kopi Susu</div>
            <div>&#40; x1 &#41;</div>
          </div>
          <div>Rp.200.000</div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <div>
              {' '}
              <Counter start={0} end={count} duration={100} />
            </div>
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </div>
        </div>
        <div className="flex items-center justify-between first:mt-0 mt-5">
          <div className="flex gap-3">
            <div>Kopi Susu</div>
            <div>&#40; x1 &#41;</div>
          </div>
          <div>Rp.200.000</div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <div>
              {' '}
              <Counter start={0} end={count} duration={100} />
            </div>
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </div>
        </div>
        <div className="flex items-center justify-between first:mt-0 mt-5">
          <div className="flex gap-3">
            <div>Kopi Susu</div>
            <div>&#40; x1 &#41;</div>
          </div>
          <div>Rp.200.000</div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <div>
              {' '}
              <Counter start={0} end={count} duration={100} />
            </div>
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </div>
        </div>
        <div className="flex items-center justify-between first:mt-0 mt-5">
          <div className="flex gap-3">
            <div>Kopi Susu</div>
            <div>&#40; x1 &#41;</div>
          </div>
          <div>Rp.200.000</div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <div>
              {' '}
              <Counter start={0} end={count} duration={100} />
            </div>
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </div>
        </div>
        <div className="flex items-center justify-between first:mt-0 mt-5">
          <div className="flex gap-3">
            <div>Kopi Susu</div>
            <div>&#40; x1 &#41;</div>
          </div>
          <div>Rp.200.000</div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <div>
              {' '}
              <Counter start={0} end={count} duration={100} />
            </div>
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </div>
        </div>
        <div className="flex items-center justify-between first:mt-0 mt-5">
          <div className="flex gap-3">
            <div>Kopi Susu</div>
            <div>&#40; x1 &#41;</div>
          </div>
          <div>Rp.200.000</div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <div>
              {' '}
              <Counter start={0} end={count} duration={100} />
            </div>
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </div>
        </div>
        <div className="flex items-center justify-between first:mt-0 mt-5">
          <div className="flex gap-3">
            <div>Kopi Susu</div>
            <div>&#40; x1 &#41;</div>
          </div>
          <div>Rp.200.000</div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <div>
              {' '}
              <Counter start={0} end={count} duration={100} />
            </div>
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </div>
        </div>
        <div className="flex items-center justify-between first:mt-0 mt-5">
          <div className="flex gap-3">
            <div>Kopi Susu</div>
            <div>&#40; x1 &#41;</div>
          </div>
          <div>Rp.200.000</div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <div>
              {' '}
              <Counter start={0} end={count} duration={100} />
            </div>
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </div>
        </div>
        <div className="flex items-center justify-between first:mt-0 mt-5">
          <div className="flex gap-3">
            <div>Kopi Susu</div>
            <div>&#40; x1 &#41;</div>
          </div>
          <div>Rp.200.000</div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <div>
              {' '}
              <Counter start={0} end={count} duration={100} />
            </div>
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </div>
        </div>
        <div className="flex items-center justify-between first:mt-0 mt-5">
          <div className="flex gap-3">
            <div>Kopi Susu</div>
            <div>&#40; x1 &#41;</div>
          </div>
          <div>Rp.200.000</div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <div>
              {' '}
              <Counter start={0} end={count} duration={100} />
            </div>
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </div>
        </div>
        <div className="flex items-center justify-between first:mt-0 mt-5">
          <div className="flex gap-3">
            <div>Kopi Susu</div>
            <div>&#40; x1 &#41;</div>
          </div>
          <div>Rp.200.000</div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <div>
              {' '}
              <Counter start={0} end={count} duration={100} />
            </div>
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </div>
        </div>
        <div className="flex items-center justify-between first:mt-0 mt-5">
          <div className="flex gap-3">
            <div>Kopi Susu</div>
            <div>&#40; x1 &#41;</div>
          </div>
          <div>Rp.200.000</div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <div>
              {' '}
              <Counter start={0} end={count} duration={100} />
            </div>
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </div>
        </div>
        {/* end:item */}
      </div>

      <div className="border-2 border-gray-800 w-full rounded-full my-5 border-dashed"></div>
      <div className="flex justify-between">
        <div>Total:</div>
        <div className="font-bold">Rp. 100.000</div>
      </div>
    </div>
  )
}

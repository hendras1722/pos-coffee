'use client'

import React, { useRef, useState } from 'react'
import { useElementBounding } from '@msa_cli/react-composable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DraggableItem } from '@/components/ComponentResizeble'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Struct from '@/components/struct'

interface DraggableItem {
  id: number
  initialX: number
  initialY: number
  x?: number
  y?: number
  name: string
  width?: number
  height?: number
  place: string
}

export default function MyDraggableComponent() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { width: containerWidth, height: containerHeight } = useElementBounding(
    containerRef as React.RefObject<HTMLElement>
  ) || {
    width: 0,
    height: 0,
  }
  const [addItems, setAddItems] = useState<DraggableItem>()
  const [place, setPlace] = useState<string>('1')

  const [draggableItems, setDraggableItems] = useState<DraggableItem[]>([
    {
      id: 362.76122245005513,
      initialX: 10,
      initialY: 10,
      name: 'Meja 1',
      width: 59,
      height: 32,
      x: 101.75,
      y: 161.22265625,
      place: '1',
    },
    {
      id: 260.5501203759428,
      initialX: 10,
      initialY: 10,
      name: 'Meja 2',
      width: 70,
      height: 35,
      x: 217.91015625,
      y: 256.8828125,
      place: '1',
    },
    {
      id: 121.37865963215144,
      initialX: 10,
      initialY: 10,
      name: 'Meja 3',
      width: 71,
      height: 34,
      x: 495.14453125,
      y: 133.75,
      place: '1',
    },

    {
      id: 365.76122245005513,
      initialX: 10,
      initialY: 10,
      name: 'Meja 4',
      width: 59,
      height: 32,
      x: 101.75,
      y: 161.22265625,
      place: '2',
    },
    {
      id: 265.5501203759428,
      initialX: 10,
      initialY: 10,
      name: 'Meja 5',
      width: 70,
      height: 35,
      x: 217.91015625,
      y: 256.8828125,
      place: '2',
    },
    {
      id: 125.37865963215144,
      initialX: 10,
      initialY: 10,
      name: 'Meja 6',
      width: 71,
      height: 34,
      x: 495.14453125,
      y: 133.75,
      place: '2',
    },
  ])

  const handlePositionChange = (id: number, x: number, y: number) => {
    setDraggableItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, x, y, place }
        }
        return item
      })
    )
  }

  const handleDeleteItem = (id: number) => {
    setDraggableItems((prevItems) => {
      const findIndex = prevItems.findIndex((item) => item.id === id)
      findIndex !== -1 && prevItems.splice(findIndex, 1)
      return [...prevItems]
    })
  }

  const handleResize = (id: number, width: number, height: number) => {
    setDraggableItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, width, height, place }
        }
        return item
      })
    )
  }
  const mathRandom = Math.random() * 500

  const printOrder = () => {
    const printButton = document.getElementById('print-button')
    if (printButton) printButton.style.display = 'none'

    window.print()

    if (printButton) printButton.style.display = 'block'
  }

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
          }
        `}
      </style>
      <Tabs defaultValue={place} className="w-full">
        <TabsList>
          <TabsTrigger onClick={() => setPlace('1')} value="1">
            Lantai 1
          </TabsTrigger>
          <TabsTrigger onClick={() => setPlace('2')} value="2">
            Lantai 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <div>
            <div className="grid lg:grid-cols-2 grid-cols-1 grid-rows-1 gap-6 mt-3 px-2 overflow-auto">
              <div
                ref={containerRef}
                className="relative h-[320px] w-[720px] bg-gray-100 rounded-lg overflow-auto"
              >
                <img src="/desain-cafe.jpg" className="h-[320px] w-[720px]" />
                {draggableItems
                  .filter((item) => item.place === place)
                  .map((item, index) => (
                    <DraggableItem
                      key={item.name + index}
                      id={item.id}
                      initialX={item.x ?? item.initialX}
                      initialY={item.y ?? item.initialY}
                      containerWidth={containerWidth}
                      containerHeight={containerHeight}
                      onPositionChange={handlePositionChange}
                      onDelete={handleDeleteItem}
                      name={item.name}
                      onResize={handleResize}
                      width={item.width}
                      height={item.height}
                    />
                  ))}
              </div>
              <div className="border border-gray-500 rounded p-3 h-[320px]  overflow-auto">
                <div id="order-section">
                  <Struct />
                </div>
                <Button
                  id="print-button"
                  onClick={printOrder}
                  className="sticky bottom-0 mt-2 w-full z-[1]"
                >
                  Print Pesanan
                </Button>
              </div>
            </div>
            <div className="px-2 mt-5">
              <div className="mb-3">
                <Input
                  name="name"
                  placeholder="Masukkan Nomer Meja"
                  onChange={(e) =>
                    setAddItems({
                      id: mathRandom,
                      initialX: 10,
                      initialY: 10,
                      name: e.target.value,
                      place: '1',
                    })
                  }
                />
              </div>
              <Button
                className="border border-blue-400 bg-transparent text-blue-400 hover:bg-blue-400 hover:text-white"
                onClick={() =>
                  addItems && setDraggableItems([...draggableItems, addItems])
                }
              >
                Add chair
              </Button>
              <Button
                className="border border-green-400 bg-transparent text-green-400 hover:bg-green-400 hover:text-white ml-3"
                onClick={() =>
                  addItems && setDraggableItems([...draggableItems, addItems])
                }
              >
                Save
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="2">
          <div>
            <div className="grid lg:grid-cols-2 grid-cols-1 grid-rows-1 gap-6 mt-3 px-2 overflow-auto">
              <div
                ref={containerRef}
                className="relative h-[320px] w-[720px] bg-gray-100 rounded-lg overflow-auto"
              >
                <img src="/desain-cafe.jpg" className="h-[320px] w-[720px]" />
                {draggableItems
                  .filter((item) => item.place === place)
                  .map((item, index) => (
                    <DraggableItem
                      key={item.name + index}
                      id={item.id}
                      initialX={item.x ?? item.initialX}
                      initialY={item.y ?? item.initialY}
                      containerWidth={containerWidth}
                      containerHeight={containerHeight}
                      onPositionChange={handlePositionChange}
                      onDelete={handleDeleteItem}
                      name={item.name}
                      onResize={handleResize}
                      width={item.width}
                      height={item.height}
                    />
                  ))}
              </div>
              <div className="border border-gray-500 rounded p-3 h-[320px]  overflow-auto">
                <div id="order-section">
                  <Struct />
                </div>
                <Button
                  id="print-button"
                  onClick={printOrder}
                  className="sticky bottom-0 mt-2 w-full z-[1]"
                >
                  Print Pesanan
                </Button>
              </div>
            </div>
            <div className="px-2 mt-5">
              <div className="mb-3">
                <Input
                  name="name"
                  placeholder="Masukkan Nomer Meja"
                  onChange={(e) =>
                    setAddItems({
                      id: mathRandom,
                      initialX: 10,
                      initialY: 10,
                      name: e.target.value,
                      place: '1',
                    })
                  }
                />
              </div>
              <Button
                className="border border-blue-400 bg-transparent text-blue-400 hover:bg-blue-400 hover:text-white"
                onClick={() =>
                  addItems && setDraggableItems([...draggableItems, addItems])
                }
              >
                Add chair
              </Button>
              <Button
                className="border border-green-400 bg-transparent text-green-400 hover:bg-green-400 hover:text-white ml-3"
                onClick={() =>
                  addItems && setDraggableItems([...draggableItems, addItems])
                }
              >
                Save
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

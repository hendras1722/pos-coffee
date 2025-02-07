'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useElementBounding } from '@msa_cli/react-composable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DraggableItem } from '@/components/ComponentResizeble'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface DraggableItem {
  id: number
  initialX: number
  initialY: number
  x?: number
  y?: number
  name: string
  width?: number
  height?: number
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
    },
  ])

  const handlePositionChange = (id: number, x: number, y: number) => {
    setDraggableItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, x, y }
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
          return { ...item, width, height }
        }
        return item
      })
    )
  }
  const mathRandom = Math.random() * 500

  useEffect(() => {
    console.log('wewe')
  }, [])

  return (
    <div>
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-bold !no-underline">
            Lantai 1
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid lg:grid-cols-2 grid-cols-1 grid-rows-1 gap-6 mt-3 px-2 overflow-auto">
              <div
                ref={containerRef}
                className="relative h-[320px] w-[720px] bg-gray-100 rounded-lg overflow-auto"
              >
                <img src="/desain-cafe.jpg" className="h-[320px] w-[720px]" />
                {draggableItems.map((item, index) => (
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
              <div className=" border border-gray-500 rounded p-3 min-h-10 max-h-30 overflow-auto"></div>
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
          </AccordionContent>
        </AccordionItem>
        {/* <AccordionItem value="item-2">
          <AccordionTrigger className="font-bold !no-underline">
            Lantai 2
          </AccordionTrigger>
          <AccordionContent>
            <div
              ref={containerRef}
              className="relative h-80 w-full bg-gray-100 rounded-lg bg-[url('/desain-cafe.jpg')] bg-contain bg-center bg-no-repeat"
            >
              {draggableItems.map((item, index) => (
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
            <div className="grid grid-cols-2 grid-rows-1 gap-6 mt-3 py-3">
              <div>
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
              <div className="bg-gray-300 border border-gray-500 rounded p-3 min-h-10 max-h-30 overflow-auto"></div>
            </div>
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </div>
  )
}

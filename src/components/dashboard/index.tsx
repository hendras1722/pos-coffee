'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useElementBounding } from '@msa_cli/react-composable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DraggableItem } from '@/components/ComponentResizeble'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Struct from '@/components/struct'
import ArrayMap from '../ArrayMap'
import Image from 'next/image'
import imageAsset from '../../../public/desain-cafe.jpg'
import { createClient } from '@/utils/supabase/client'

interface Chair {
  id?: string
  created_at?: string
  x: number
  y: number
  name: string
  width: number
  height: number
  place: string
  initialX: number
  initialY: number
}

export interface Place {
  id: string
  created_at: Date
  place: string
}

export default function MyDraggableComponent({
  data,
}: Readonly<{ data: Chair[] }>) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { width: containerWidth, height: containerHeight } = useElementBounding(
    containerRef as React.RefObject<HTMLElement>
  ) || {
    width: 0,
    height: 0,
  }
  const [addItems, setAddItems] = useState<Chair>()
  const [place, setPlace] = useState<{
    id: string
    place: string
    created_at: Date
  }>({ id: '', place: '', created_at: new Date() })
  const [addPlace, setAddPlace] = useState<Place[]>([])

  const [draggableItems, setDraggableItems] = useState<Chair[]>(data)
  const [dirty, setDirty] = useState(false)
  const mathRandom = Math.random() * 500

  const handlePositionChange = (id: string, x: number, y: number) => {
    setDirty(true)
    setDraggableItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, x, y, place: place.id }
        }
        return item
      })
    )
  }

  const handleDeleteItem = (id: string) => {
    setDraggableItems((prevItems) => {
      const findIndex = prevItems.findIndex((item) => item.id === id)
      findIndex !== -1 && prevItems.splice(findIndex, 1)
      return [...prevItems]
    })
  }

  const handleResize = (id: string, width: number, height: number) => {
    setDirty(true)
    setDraggableItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, width, height, place: place.id }
        }
        return item
      })
    )
  }

  const printOrder = () => {
    const printButton = document.getElementById('print-button')
    if (printButton) printButton.style.display = 'none'

    window.print()

    if (printButton) printButton.style.display = 'block'
  }
  async function postChair<T>(item: T[]) {
    const supabase = createClient()
    const data = item.map((obj) => {
      const newObj: { [key: string]: any } = {}
      for (const key in obj) {
        if (obj[key] !== undefined) {
          newObj[key] = obj[key]
        }
      }
      return newObj
    })
    const { data: chair, error } = await supabase
      .from('chair')
      .insert(data)
      .select()
    if (error) return error
    return chair as T
  }
  const getPlace = useCallback(async () => {
    const supabase = createClient()

    const { data: place, error } = await supabase.from('place').select('*')
    if (place) {
      setAddPlace(place)
      setPlace(place[0])
    }

    if (error) {
      console.error('Error fetching place:', error) // Tambahkan logging error yang lebih baik
      return error
    }

    return place
  }, [])

  useEffect(() => {
    getPlace()
  }, [])

  const handleSave = async () => {
    const saveItems = draggableItems
      .filter(
        (item) =>
          data.filter((dataItem) => dataItem.id === item.id).length === 0
      )
      .map((item) => ({
        ...item,
        initialX: undefined,
        initialY: undefined,
        id: undefined,
      }))
    const saveData = await postChair(saveItems)
    window.location.reload()
    console.log(draggableItems, saveItems, saveData, 'inisave')
  }

  function removeDuplicatePlaces(arr: Chair[]) {
    if (arr.length === 0) return []
    const seenPlaces = new Set()
    const uniqueArray: Chair[] = []

    for (const obj of arr) {
      if (!seenPlaces.has(obj.place)) {
        seenPlaces.add(obj.place)
        uniqueArray.push(obj)
      }
    }

    return uniqueArray
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
      {place.place && (
        <Tabs defaultValue={place.place} className="w-full">
          <TabsList>
            <ArrayMap
              of={addPlace}
              render={(item, index) => (
                <TabsTrigger
                  key={index}
                  value={item.place}
                  onClick={() => setPlace(item)}
                >
                  {item.place}
                </TabsTrigger>
              )}
            />
          </TabsList>{' '}
          <Button className="scale-75">+</Button>
          <TabsContent value={place.place}>
            <div>
              <div className="grid lg:grid-cols-2 grid-cols-1 grid-rows-1 gap-6 mt-3 px-2 overflow-auto">
                <div
                  ref={containerRef}
                  className="relative h-[320px] w-[720px] bg-gray-100 rounded-lg overflow-auto"
                >
                  <Image
                    src={imageAsset}
                    className="h-[320px] w-[720px]"
                    width={0}
                    height={0}
                    alt="bg_cafe"
                  />
                  {(draggableItems || [])
                    .filter((item) => item.place === place.id)
                    .map((item, index) => (
                      <DraggableItem
                        key={item.name + index}
                        id={item?.id ?? ''}
                        initialX={item.x}
                        initialY={item.y}
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
                      setAddItems((prevState) => ({
                        ...prevState,
                        id: String(mathRandom),
                        initialX: 10,
                        initialY: 10,
                        x: prevState?.x ?? 0,
                        y: prevState?.y ?? 0,
                        name: e.target.value,
                        place: place.id ?? '',
                        width: prevState?.width ?? 0,
                        height: prevState?.height ?? 0,
                      }))
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
                  onClick={handleSave}
                  disabled={
                    (!dirty && draggableItems.length === data.length) ||
                    draggableItems.filter((item) => item.place === place.id)
                      .length === 0
                  }
                >
                  Save
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

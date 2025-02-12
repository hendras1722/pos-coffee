'use client'

import React, { use, useCallback, useEffect, useRef, useState } from 'react'
import { useElementBounding } from '@msa_cli/react-composable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DraggableItem } from '@/components/ComponentResizeble'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Struct from '@/components/struct'
import ArrayMap from '../ArrayMap'
import Image from 'next/image'
import { getChair } from '@/actions/chair/actions'

// import imageAsset from '../../../public/desain-cafe.jpg'
import { createClient } from '@/utils/supabase/client'
import { FaCheck } from 'react-icons/fa6'
import { TableDemo } from '@/components/table'

interface Chair {
  id?: string
  created_at?: string
  x: number
  y: number
  name: string
  width: number
  height: number
  place: string
  // initialX: number
  // initialY: number
}

export interface Place {
  id: string
  created_at: Date
  place: string
  Image: string
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
  const [isPlace, setIsPlace] = useState<boolean>(false)
  const [statePlace, setStatePlace] = useState<string>('')

  const [draggableItems, setDraggableItems] = useState<Chair[]>(data)
  const [dirty, setDirty] = useState(false)
  const mathRandom = Math.random() * 500

  const handlePositionChange = async (
    id: string,
    x: number,
    y: number,
    place: string
  ) => {
    setDirty(true)

    const supabase = createClient()
    setDraggableItems((prevItems) =>
      prevItems.map((item) => {
        console.log(item, x, y, item.id, id)
        if (item.id === id && item.place === place) {
          return { ...item, x, y, place }
        }
        return item
      })
    )

    const { data, error } = await supabase
      .from('chair')
      .update({ x, y })
      .eq('id', id)
      .select()
  }

  const handleDeleteItem = async (id: string) => {
    const supabase = createClient()
    console.log(id)

    const { status, error } = await supabase.from('chair').delete().eq('id', id)
    console.log(status)
    if (status >= 200 && status <= 300) {
      let { data: chair } = await supabase.from('chair').select('*')
      setDraggableItems(chair as Chair[])
    }
    if (error) return
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
    const supabase = createClient()

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
    console.log(saveItems)

    const saveData = await postChair(saveItems)
    if (saveData) {
      let { data: chair, error } = await supabase.from('chair').select('*')
      if (error) window.location.reload()
      setDraggableItems(chair as Chair[])
    }
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

  async function handleSavePlace() {
    const supabase = createClient()
    const { data: chair, error } = await supabase
      .from('place')
      .insert({ place: statePlace, Image: null })
      .select()
    if (error) return error
    await getPlace()
    setIsPlace(false)
    return chair
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
      <ArrayMap
        of={addPlace}
        render={(item, index) => (
          <div key={index} className="first:mt-0 mt-5">
            <div>Tempat: {item.place}</div>
            <div>
              <div className="grid lg:grid-cols-2 grid-cols-1 grid-rows-1 gap-6 mt-3 px-2 overflow-auto">
                <div
                  ref={containerRef}
                  className="relative h-[320px] w-[720px] bg-gray-100 rounded-lg overflow-auto"
                  onClick={() => {
                    if (
                      addPlace.find((item) => item.place === place.place)?.Image
                    )
                      return
                    const inputElement = document.getElementById('upload_file')
                    inputElement?.click()
                  }}
                >
                  {(item.Image && (
                    <img
                      src={item.Image}
                      className="h-[320px] w-[720px]"
                      width={0}
                      height={0}
                      alt="bg_cafe"
                    />
                  )) || (
                    <div className="h-[320px] w-[720px] flex items-center justify-center">
                      <Input type="file" id="upload_file" className="hidden" />
                      Upload Image
                    </div>
                  )}
                  {(draggableItems || [])
                    .filter((itemDrag) => itemDrag.place === item.id)
                    .map((itemData, index) => (
                      <DraggableItem
                        key={itemData.name + index}
                        id={itemData.id ?? ''}
                        initialX={itemData.x}
                        initialY={itemData.y}
                        containerWidth={containerWidth}
                        containerHeight={containerHeight}
                        onPositionChange={handlePositionChange}
                        onDelete={handleDeleteItem}
                        place={itemData.place}
                        name={itemData.name}
                        onResize={handleResize}
                        width={itemData.width}
                        height={itemData.height}
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
                        x: prevState?.x ?? 0,
                        y: prevState?.y ?? 0,
                        name: e.target.value,
                        place: item.id ?? '',
                        width: prevState?.width ?? 0,
                        height: prevState?.height ?? 0,
                      }))
                    }
                  />
                </div>
                <Button
                  className="border border-blue-400 bg-transparent text-blue-400 hover:bg-blue-400 hover:text-white"
                  onClick={async () => {
                    const supabase = createClient()
                    if (!addItems) return
                    const { data } = await supabase
                      .from('chair')
                      .upsert(addItems)
                      .select()
                    if (data) {
                      let { data: chair, error } = await supabase
                        .from('chair')
                        .select('*')
                      if (error) window.location.reload()
                      setDraggableItems(chair as Chair[])
                    }
                  }}
                >
                  Add chair
                </Button>
              </div>
            </div>
          </div>
        )}
      />
      {/* {place.place && (
        <Tabs defaultValue={place.place} className="w-full">
          <TabsList>
         
            <div className="flex gap 3">
              {(isPlace && (
                <>
                  <Input
                    className={`w-[100px]`}
                    onChange={(e) => setStatePlace(e.target.value)}
                  />
                  <Button
                    className="scale-75 bg-green-300 hover:bg-green-500"
                    onClick={handleSavePlace}
                  >
                    <FaCheck />
                  </Button>
                </>
              )) || (
                <Button
                  className="scale-75"
                  onClick={() => setIsPlace(!isPlace)}
                >
                  +
                </Button>
              )}
            </div>
          </TabsList>

          <TabsContent value={place.place}>
            <div>
              <div className="grid lg:grid-cols-2 grid-cols-1 grid-rows-1 gap-6 mt-3 px-2 overflow-auto">
                <div
                  ref={containerRef}
                  className="relative h-[320px] w-[720px] bg-gray-100 rounded-lg overflow-auto"
                  onClick={() => {
                    if (
                      addPlace.find((item) => item.place === place.place)?.Image
                    )
                      return
                    const inputElement = document.getElementById('upload_file')
                    inputElement?.click()
                  }}
                >
                  {(addPlace.find((item) => item.place === place.place)
                    ?.Image && (
                    <img
                      src={
                        addPlace.find((item) => item.place === place.place)
                          ?.Image ?? ''
                      }
                      className="h-[320px] w-[720px]"
                      width={0}
                      height={0}
                      alt="bg_cafe"
                    />
                  )) || (
                    <div className="h-[320px] w-[720px] flex items-center justify-center">
                      <Input type="file" id="upload_file" className="hidden" />
                      Upload Image
                    </div>
                  )}
                  {(draggableItems || [])
                    .filter((item) => item.place === place.id)
                    .map((item, index) => (
                      <DraggableItem
                        key={item.name + index}
                        id={item.id ?? ''}
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
                  onClick={async () => {
                    const supabase = createClient()
                    if (!addItems) return
                    const { data } = await supabase
                      .from('chair')
                      .upsert(addItems)
                      .select()
                    if (data) {
                      let { data: chair, error } = await supabase
                        .from('chair')
                        .select('*')
                      if (error) window.location.reload()
                      setDraggableItems(chair as Chair[])
                    }
                  }}
                >
                  Add chair
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )} */}
    </div>
  )
}

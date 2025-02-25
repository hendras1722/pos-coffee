'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useElementBounding } from '@msa_cli/react-composable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DraggableItem } from '@/components/ComponentResizeble'
import Struct from '@/components/struct'
import ArrayMap from '../ArrayMap'
import Image from 'next/image'

// import imageAsset from '../../../public/desain-cafe.jpg'
import { createClient } from '@/utils/supabase/client'
import { FaCheck } from 'react-icons/fa6'

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
  const [statePlace, setStatePlace] = useState<string>('')

  const [draggableItems, setDraggableItems] = useState<Chair[]>(data)
  const [isShowEditTitle, setIsShowEditTitle] = useState({})

  const handlePositionChange = async (
    id: string,
    x: number,
    y: number,
    place: string
  ) => {
    const supabase = createClient()
    setDraggableItems((prevItems) =>
      prevItems.map((item) => {
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

    const { status, error } = await supabase.from('chair').delete().eq('id', id)

    if (status >= 200 && status <= 300) {
      let { data: chair } = await supabase.from('chair').select('*')
      setDraggableItems(chair as Chair[])
    }
    if (error) return
  }

  const handleResize = (id: string, width: number, height: number) => {
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
    return chair
  }
  function generateUUID() {
    // Public Domain/MIT
    let d = new Date().getTime() //Timestamp
    let d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0 //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = Math.random() * 16 //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0
          d = Math.floor(d / 16)
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0
          d2 = Math.floor(d2 / 16)
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
      }
    )
  }

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) {
    const supabase = createClient()
    const file = e.target.files?.[0]
    if (file) {
      const { data: image, error } = await supabase.storage
        .from('pos')
        .upload(`uploads/${generateUUID()}`, file)

      const { data: dataImage, error: errorUpdate } = await supabase
        .from('place')
        .update({ Image: image?.fullPath })
        .eq('id', item)
        .select()
      await getPlace()
      if (error) {
        throw error
      }
      if (errorUpdate) {
        throw errorUpdate
      }
    }
  }
  const [title, setTitle] = useState({})
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>, id) {
    e.preventDefault()
    const supabase = createClient()

    const { data, error: errupdate } = await supabase
      .from('place')
      .update({ place: title[id] })
      .eq('id', id)
      .select()
    console.log(data)
    if (errupdate) {
      throw errupdate
    }
    await getPlace()
    setTitle({})
    setIsShowEditTitle({})
  }

  useEffect(() => {
    if (addPlace.length > 0) {
      const initialTitles = {}
      addPlace.forEach((item) => {
        initialTitles[item.id] = item.place
      })
      setTitle(initialTitles)
    }
  }, [addPlace])

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
            {isShowEditTitle[item.id] ? (
              <form
                onSubmit={(e) => handleSubmit(e, item.id)}
                className="flex gap-3 w-56"
              >
                <Input
                  type="text"
                  name="place"
                  value={title[item.id] || item.place}
                  onChange={(e) =>
                    setTitle((prevState) => ({
                      ...prevState,
                      [item.id]: e.target.value,
                    }))
                  }
                />
                <Button type="submit">Submit</Button>
              </form>
            ) : (
              <div
                className="text-nowrap"
                role="button"
                onClick={() =>
                  setIsShowEditTitle({ ...isShowEditTitle, [item.id]: true })
                }
              >
                Tempat: {item.place}
              </div>
            )}
            <Input
              type="file"
              id="upload_file"
              className="mt-2"
              placeholder={item.place}
              onChange={async (e) => handleUpload(e, item.id)}
            />
            <div>
              <div className="grid lg:grid-cols-2 grid-cols-1 grid-rows-1 gap-6 mt-3 px-2 overflow-auto">
                <div
                  ref={containerRef}
                  className="relative h-[320px] w-[720px] bg-gray-100 rounded-lg overflow-auto"
                >
                  {(item.Image && (
                    <div
                      style={{
                        position: 'relative',
                        width: '720px',
                        height: '320px',
                      }}
                    >
                      <Image
                        src={
                          'https://tikuwnepqhtjbypmcsst.supabase.co/storage/v1/object/' +
                          item.Image
                        }
                        alt="bg_cafe"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
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
      <div className="flex items-center mt-5">
        <Input
          className={`w-full`}
          onChange={(e) => setStatePlace(e.target.value)}
        />
        <Button
          className="scale-75 bg-green-300 hover:bg-green-500"
          onClick={handleSavePlace}
          disabled={!statePlace}
        >
          <FaCheck />
        </Button>
      </div>
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

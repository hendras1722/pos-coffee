'use client'

import React, { useRef } from 'react'
import { useElementBounding } from '@msa_cli/react-composable'
import useDraggable from '@/composable/useDraggable'
import ResizableComponent from '@/components/resizeable'

interface DraggableItemProps {
  id: string
  initialX: number
  initialY: number
  containerWidth: number
  containerHeight: number
  onPositionChange: (id: string, x: number, y: number, place: string) => void
  onDelete: (id: string) => void
  name: string
  onResize?: (id: string, width: number, height: number) => void
  width?: number
  height?: number
  place: string
}

export function DraggableItem({
  id,
  initialX,
  initialY,
  containerWidth,
  containerHeight,
  onPositionChange,
  onDelete,
  name,
  onResize,
  width,
  height,
  place,
}: Readonly<DraggableItemProps>) {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const { width: elementWidth, height: elementHeight } = useElementBounding(
    elementRef as React.RefObject<HTMLElement>
  ) || {
    width: 0,
    height: 0,
  }
  const { x, y, isDragging } = useDraggable(
    elementRef as React.RefObject<HTMLElement>,
    {
      initialPosition: { x: initialX, y: initialY }, // Kirim initialPosition
      boundaries: {
        minX: 10,
        maxX: containerWidth - (elementWidth || 0) - 10,
        minY: 10,
        maxY: containerHeight - (elementHeight || 0) - 10,
      },
      onStart: (pos) => {
        console.log(pos, 'start')
      },
      onEnd: (pos) => {
        console.log(`Drag ${id} ended at:`, pos)
        onPositionChange(id, pos.x, pos.y, place)
      },
      onMove: (pos) => {},
      enableDrag: true,
    }
  )

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(id)
  }

  function handleNotification(e) {
    e.stopPropagation()
    // alert(`You clicked on ${name}`)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      ref={elementRef}
      className="border border-gray-500 bg-gray-200 absolute text-black font-bold py-2 px-4 rounded text-nowrap w-fit resize -z-10 "
      style={{
        left: (x < 0 ? 0 : x) + 'px',
        top: (y < 0 ? 0 : y) + 'px',
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 1 : 0,
      }}
      onClick={handleNotification}
    >
      <ResizableComponent
        initialWidth={width}
        initialHeight={height}
        onResize={(width, height) =>
          height && width && id && onResize && onResize(id, width, height)
        }
        enableResize={true}
      >
        <div>
          <div className="flex items-center justify-center">
            <div>{name ?? id}</div>
          </div>
          <button
            onClick={(e) => handleDelete(e)}
            className="absolute -top-5 right-0 left-0 bottom-0 mx-auto cursor-pointer pointer-events-auto !important h-6 w-6 p-0 z-50 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center "
            aria-label={`Delete item ${id}`}
          >
            ×
          </button>
        </div>
      </ResizableComponent>
    </div>
  )
}

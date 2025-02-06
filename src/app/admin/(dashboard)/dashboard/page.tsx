"use client";

import React, {  useRef, useState } from "react";
import { useElementBounding } from "@msa_cli/react-composable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDraggable from "@/composable/useDraggable";

interface DraggableItemProps {
  id: number;
  initialX: number;
  initialY: number;
  containerWidth: number;
  containerHeight: number;
  onPositionChange: (id: number, x: number, y: number) => void;
  onDelete: (id: number) => void;
  name: string
}

// MyDraggableComponent.tsx

function DraggableItem({
  id,
  initialX,
  initialY,
  containerWidth,
  containerHeight,
  onPositionChange,
  onDelete,
  name,
}: DraggableItemProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const { width: elementWidth, height: elementHeight } =
    useElementBounding(elementRef as React.RefObject<HTMLElement>) || {
      width: 0,
      height: 0,
    };

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
        console.log(`Drag ${id} started at:`, pos);
      },
      onEnd: (pos) => {
        console.log(`Drag ${id} ended at:`, pos);
        // Panggil onPositionChange dengan x dan y terbaru
        onPositionChange(id, x, y);
      },
      onMove: (pos) => {
        // Hanya update posisi saat dragging
        //onPositionChange(id, pos.x, pos.y);
      },
    }
  );

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    onDelete(id);
  };

  return (
   <div    ref={elementRef}
      className="bg-red-300 absolute text-white font-bold py-2 px-4 rounded text-nowrap w-fit resize -z-10"
      style={{
        left: x + "px", // Gunakan x langsung
        top: y + "px",   // Gunakan y langsung
        cursor: isDragging  ? "grabbing" : "grab", // More control on cursor
        zIndex: isDragging ? 999 : 0, // Keep draggable item below the delete button
      }}>
    <div

    >
      <div>{name ?? id}</div>
    </div>
        <button
          onClick={(e) => handleDelete(e)}
          className="absolute -top-2 -right-2 cursor-pointer pointer-events-auto h-6 w-6 p-0 z-50 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center "
          aria-label={`Delete item ${id}`}
        >
          ×
        </button>

   </div>
  );
}

interface DraggableItem {
  id: number;
  initialX: number;
  initialY: number;
  x?: number;
  y?: number;
  name: string
}

export default function MyDraggableComponent() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width: containerWidth, height: containerHeight } =
    useElementBounding(containerRef as React.RefObject<HTMLElement>) || {
      width: 0,
      height: 0,
    };
  const [addItems, setAddItems] = useState<DraggableItem>();


  const [draggableItems, setDraggableItems] = useState<DraggableItem[]>(
 [{"id":1,"initialX":10,"initialY":10,"name":"1","x":30.84375,"y":266.6640625},{"id":2,"initialX":10,"initialY":10,"name":"2","x":82.75,"y":266.26953125},{"id":3,"initialX":10,"initialY":10,"name":"3","x":138.62890625,"y":266.5}]
  );

  const handlePositionChange = (id: number, x: number, y: number) => {
    setDraggableItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, x, y };
        }
        return item;
      })
    );
  };

  const handleDeleteItem = (id: number) => {
    setDraggableItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div
        ref={containerRef}
        className="relative h-80 w-full bg-gray-200 rounded-lg"
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
          />

        ))}
      </div>
      <Input name="name" placeholder="Masukkan Nomer Meja" onChange={(e) => setAddItems({id: draggableItems.length + 1, initialX: 10, initialY: 10, name: e.target.value})}/>
<Button onClick={() => addItems && setDraggableItems([...draggableItems, addItems])}>Add Kursi</Button>
   {JSON.stringify(draggableItems)}
     
    </div>
  );
}

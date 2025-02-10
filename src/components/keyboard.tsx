'use client'

import { RefObject, useEffect, useRef, useState } from 'react'
import {
  useDraggable,
  useElementBounding,
  useScreenlock,
} from '@msa_cli/react-composable'

export default function Keyboard({
  setValue,
}: Readonly<{
  setValue: React.Dispatch<React.SetStateAction<string>>
}>) {
  const [text, setText] = useState('')
  const [isCaps, setIsCaps] = useState(false)

  // Function to update the text state
  // const updateText = (newText) => {
  //   setText(newText)
  // }

  useEffect(() => {
    if (setValue) setValue(text)
    console.log(text)
  }, [text, setValue])

  const elementRef = useRef<HTMLDivElement | null>(null)
  const bodyRef = useRef<HTMLBodyElement>(
    document.getElementsByTagName('body')[0]
  )

  const { width, height } = useElementBounding(bodyRef)

  const { x, y, isDragging } = useDraggable(
    elementRef as React.RefObject<HTMLElement>,
    {
      initialPosition: {
        x: 100,
        y: 100,
      },
      boundaries: {
        minX: 10,
        maxX: width / 2 - 440,
        minY: 10,
        maxY: height / 2 - 20,
      },
      onStart: (pos) => console.log('Drag started at:', pos),
      onMove: (pos) => console.log('Dragging to:', pos),
      onEnd: (pos) => console.log('Drag ended at:', pos),
    }
  )

  // Function to handle key press
  const handleKeyPress = (key) => {
    setText((prevText) => prevText + key)
  }

  // Function to handle delete
  const handleDelete = () => {
    setText((prevText) => prevText.slice(0, prevText.length - 1))
  }

  // Function to handle enter
  const handleEnter = () => {
    setText((prevText) => prevText + '\n')
  }

  // Function to handle space
  const handleSpace = () => {
    setText((prevText) => prevText + '\u00A0')
  }

  // Function to handle caps lock
  const handleCapsLock = () => {
    setIsCaps((prevIsCaps) => !prevIsCaps)
  }

  // Function to toggle case
  const toggleCase = (key) => {
    return isCaps ? key.toUpperCase() : key.toLowerCase()
  }

  return (
    <>
      <style>{`
        .keyboard {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          height: 50vh;
          width: 70vw;
          border-radius: 1rem;
          padding: 5px;
        }

        .row {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }

        .last {
          width: 65%;
          margin: 0 auto;
        }

        .space {
          background: grey;
          width: 50%;
        }

        .key {
          cursor: pointer;
          padding: 1rem;
          border-radius: 3px;
          user-select: none; /* Prevent text selection on click */
          width: 100%;
          border:  2px solid black;
        }


        .active {
          background-color: white;
        }
      `}</style>

      <div
        ref={elementRef}
        className="keyboard border border-gray-500 bg-gray-200"
        style={{
          position: 'absolute',
          left: x + 'px',
          top: y + 'px',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <div className="row">
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress('1')}
          >
            1
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress('2')}
          >
            2
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress('3')}
          >
            3
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress('4')}
          >
            4
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress('5')}
          >
            5
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress('6')}
          >
            6
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress('7')}
          >
            7
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress('8')}
          >
            8
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress('9')}
          >
            9
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress('0')}
          >
            0
          </button>
          <button className="key delete" onClick={handleDelete}>
            <i className="fa-solid fa-delete-left"></i>
            Delete
          </button>
        </div>
        <div className="row">
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('q'))}
          >
            {toggleCase('q')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('w'))}
          >
            {toggleCase('w')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('e'))}
          >
            {toggleCase('e')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('r'))}
          >
            {toggleCase('r')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('t'))}
          >
            {toggleCase('t')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('y'))}
          >
            {toggleCase('y')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('u'))}
          >
            {toggleCase('u')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('i'))}
          >
            {toggleCase('i')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('o'))}
          >
            {toggleCase('o')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('p'))}
          >
            {toggleCase('p')}
          </button>
        </div>
        <div className="row">
          <button
            className={`key capslock ${isCaps ? 'active' : ''}`}
            onClick={handleCapsLock}
          >
            CapsLock
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('a'))}
          >
            {toggleCase('a')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('s'))}
          >
            {toggleCase('s')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('d'))}
          >
            {toggleCase('d')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('f'))}
          >
            {toggleCase('f')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('g'))}
          >
            {toggleCase('g')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('h'))}
          >
            {toggleCase('h')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('j'))}
          >
            {toggleCase('j')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('k'))}
          >
            {toggleCase('k')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('l'))}
          >
            {toggleCase('l')}
          </button>
          <button className="key enter" onClick={handleEnter}>
            Enter
          </button>
        </div>
        <div className="row last">
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('z'))}
          >
            {toggleCase('z')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('x'))}
          >
            {toggleCase('x')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('c'))}
          >
            {toggleCase('c')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('v'))}
          >
            {toggleCase('v')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('b'))}
          >
            {toggleCase('b')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('n'))}
          >
            {toggleCase('n')}
          </button>
          <button
            className="key active:bg-white"
            onClick={() => handleKeyPress(toggleCase('m'))}
          >
            {toggleCase('m')}
          </button>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-1/2 grid place-items-center">
            <button className="key space" onClick={handleSpace}>
              Space
            </button>
            <div className="border border-black w-10 mt-5"></div>
          </div>
        </div>
      </div>
    </>
  )
}

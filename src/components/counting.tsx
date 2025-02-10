'use client'
import React, { useState, useEffect, useRef } from 'react'

function Counter({ start, end, duration }) {
  const [count, setCount] = useState(start)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const range = end - start
    let startTime = null

    const animateNumber = (currentTime) => {
      if (!startTime) startTime = currentTime
      const timeElapsed = currentTime - (startTime ?? 0)
      const progress = Math.min(timeElapsed / duration, 1) // Pastikan progress tidak melebihi 1
      setCount(Math.floor(progress * range + start)) // Hitung angka saat ini

      if (timeElapsed < duration) {
        frameRef.current = requestAnimationFrame(animateNumber)
      } else {
        setCount(end) // Pastikan angka mencapai nilai akhir
      }
    }

    const cancelAnimation = () => {
      frameRef.current && cancelAnimationFrame(frameRef.current)
    }

    frameRef.current = requestAnimationFrame(animateNumber)

    return () => cancelAnimation() // Bersihkan animasi saat komponen di-unmount
  }, [start, end, duration])

  return <div>{count}</div>
}

export default Counter

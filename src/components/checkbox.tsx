import React, { useState, useEffect } from 'react'

const AnimatedCheckbox = ({
  checked = false,
  setChecked,
  id = 'cbx-12',
  onChange,
}: Readonly<{
  checked?: boolean
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>
  id?: string
  onChange: (item: boolean) => void
}>) => {
  const [isChecked, setIsChecked] = useState(checked)

  // Sync internal state with prop changes
  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  const handleChange = () => {
    const newValue = !isChecked
    if (setChecked) setChecked(newValue)
    onChange(newValue)
  }

  return (
    <div className="relative">
      <div className="checkbox-wrapper-12">
        <div className="cbx">
          <input
            id={id}
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            className="appearance-none cursor-pointer m-0 top-0 left-0 w-6 h-6 border-2 border-gray-400 rounded-full focus:outline-none"
          />
          <label
            htmlFor={id}
            className="w-6 h-6 bg-transparent rounded-full absolute top-0 left-0 pointer-events-none"
          ></label>
          <svg
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            className="absolute top-1 left-1 z-10 pointer-events-none"
          >
            <path
              d="M2 8.36364L6.23077 12L13 2"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: '19',
                strokeDashoffset: isChecked ? '0' : '19',
                transition: 'stroke-dashoffset 0.3s ease',
                transitionDelay: '0.2s',
              }}
            />
          </svg>
        </div>

        <div className="fixed -top-1/3 -left-1/2 w-28 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <filter id={`goo-${id}`}>
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="4"
                  result="blur"
                ></feGaussianBlur>
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                  result={`goo-${id}`}
                ></feColorMatrix>
                <feBlend in="SourceGraphic" in2={`goo-${id}`}></feBlend>
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes splash-${id} {
          40% {
            background: lime;
            box-shadow: 0 -18px 0 -8px lime, 16px -8px 0 -8px lime,
              16px 8px 0 -8px lime, 0 18px 0 -8px lime, -16px 8px 0 -8px lime,
              -16px -8px 0 -8px lime;
          }
          100% {
            background: lime;
            box-shadow: 0 -36px 0 -10px transparent,
              32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent,
              0 36px 0 -10px transparent, -32px 16px 0 -10px transparent,
              -32px -16px 0 -10px transparent;
          }
        }

        .cbx input:checked + label {
          animation: splash-${id} 0.6s ease forwards;
        }
      `}</style>
    </div>
  )
}

export default AnimatedCheckbox

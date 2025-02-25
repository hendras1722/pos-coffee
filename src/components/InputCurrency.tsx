import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { cn } from '@/utils/lib'

interface NumberInputProps {
  value?: string
  onChange?: (value: string) => void
  error?: string | boolean
  leading?: ReactNode
  trailing?: ReactNode
  [key: string]: any
}

const NumberInput = ({
  value = '',
  onChange,
  error,
  leading,
  trailing,
  disabled,
  className,
  ...props
}: NumberInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [formattedValue, setFormattedValue] = useState(value)

  const formatMoney = (value: string): string => {
    // Remove all non-digits
    const cleanValue = value?.replace(/\D/g, '') || ''
    if (!cleanValue) return ''

    // Remove leading zeros
    const withoutLeadingZeros = cleanValue.replace(/^0+/, '')
    if (!withoutLeadingZeros) return '0'

    // Add thousand separators
    return withoutLeadingZeros.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  useEffect(() => {
    // Set formatted value based on the provided value
    // Allow empty string to pass through
    const formatted = value === '' ? '' : formatMoney(value)
    setFormattedValue(formatted)
  }, [value])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
      'Tab',
    ]
    const isNumber = /[0-9]/.test(e.key)

    if (!isNumber && !allowedKeys.includes(e.key)) {
      e.preventDefault()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || !onChange) return

    const currentValue = e.target.value
    // If input is empty, pass empty string to onChange
    if (!currentValue) {
      onChange('')
      setFormattedValue('')
      return
    }

    const cursorPosition = e.target.selectionStart || 0

    const dotsBeforeCursor = (
      currentValue.slice(0, cursorPosition).match(/\./g) || []
    ).length

    const numericValue = currentValue.replace(/\D/g, '')
    const formattedValue = formatMoney(numericValue)

    const newDotsBeforeCursor = (
      formattedValue.slice(0, cursorPosition).match(/\./g) || []
    ).length

    const dotsDiff = newDotsBeforeCursor - dotsBeforeCursor
    let newPosition = Math.max(0, cursorPosition + dotsDiff)

    onChange(formattedValue)

    requestAnimationFrame(() => {
      if (inputRef.current) {
        newPosition = Math.min(newPosition, formattedValue.length)
        inputRef.current.setSelectionRange(newPosition, newPosition)
      }
    })
  }

  return (
    <div>
      <div className="relative w-full">
        {leading && (
          <span className="absolute top-1/2 left-4 -translate-y-1/2">
            {leading}
          </span>
        )}

        <Input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          className={cn(
            className,
            `
              w-full 
              bg-transparent 
              rounded-md 
              border 
              py-[10px]
              text-gray-800
              outline-none 
              transition
              ${error ? 'border-red-500' : ''}
              ${leading ? 'pl-12' : 'pl-5'}
              ${trailing ? 'pr-12' : 'pr-5'}
            `
          )}
          value={formattedValue}
          onKeyDown={handleKeyPress}
          onChange={handleInput}
          disabled={disabled}
          {...props}
        />

        {trailing && (
          <span className="absolute top-1/2 right-4 -translate-y-1/2">
            {trailing}
          </span>
        )}
      </div>

      {error && <p className="my-[10px] text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default NumberInput

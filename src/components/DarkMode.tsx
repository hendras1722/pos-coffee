// app/components/ThemeSwitcher.tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa6'
import { ConditionProvider, Else, If } from './if'

export default function DarkMode() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  function handleMode() {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  if (!mounted) return null

  return (
    <span>
      <ConditionProvider initialCondition={theme === 'light'}>
        <If condition={theme === 'light'}>
          <button onClick={() => handleMode()}>
            <FaSun />
          </button>
        </If>
        <Else>
          <button onClick={() => handleMode()}>
            <FaMoon />
          </button>
        </Else>
      </ConditionProvider>
    </span>
  )
}

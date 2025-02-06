'use client'

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'

// Context to manage condition state
const ConditionContext = createContext<{
  isConditionMet: boolean
  setIsConditionMet: (value: boolean) => void
}>({
  isConditionMet: false,
  setIsConditionMet: () => {},
})

// Provider to manage condition states across components
export const ConditionProvider: React.FC<{
  children: ReactNode
  initialCondition?: boolean
}> = ({ children, initialCondition = false }) => {
  const [isConditionMet, setIsConditionMet] = useState(initialCondition)

  return (
    <ConditionContext.Provider value={{ isConditionMet, setIsConditionMet }}>
      {children}
    </ConditionContext.Provider>
  )
}

// If Component
export const If: React.FC<{ condition: boolean; children: ReactNode }> = ({
  condition,
  children,
}) => {
  const { setIsConditionMet } = useContext(ConditionContext)

  useEffect(() => {
    setIsConditionMet(condition)
  }, [condition, setIsConditionMet])

  if (condition) {
    return <>{children}</>
  }

  return null
}

// Else Component
export const Else: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isConditionMet } = useContext(ConditionContext)
  return !isConditionMet ? <>{children}</> : null
}

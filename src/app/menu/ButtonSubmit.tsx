'use client'

import { Button } from '@/components/ui/button'

export default function ButtonSubmit() {
  const printOrder = () => {
    const printButton = document.getElementById('print-button')
    if (printButton) printButton.style.display = 'none'
    window.print()
    if (printButton) printButton.style.display = 'block'
  }

  return (
    <Button
      id="print-button"
      className="w-full bg-green-600"
      onClick={() => printOrder()}
    >
      Print
    </Button>
  )
}

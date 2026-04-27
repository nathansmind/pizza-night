'use client'

import { useState } from 'react'
import type { ToppingCombo } from '@/data/pizzaData'

const PLACEHOLDER = '/toppings/placeholder.png'

interface ComboImageProps {
  combo: ToppingCombo
  /** Visible width of the cropped window (px). */
  width?: number
  /** Visible height of the cropped window (px). */
  height?: number
  /** Render size of the source image (px, square). Larger values show less of the pizza. */
  imageSize?: number
  className?: string
}

export default function ComboImage({
  combo,
  width = 90,
  height = 170,
  imageSize = 150,
  className = '',
}: ComboImageProps) {
  const [errored, setErrored] = useState(false)
  const src = combo.image && !errored ? combo.image : PLACEHOLDER

  return (
    <div
      className={`relative overflow-hidden flex-shrink-0 self-stretch ${className}`}
      style={{ width, height }}
    >
      <img
        src={src}
        alt={combo.name}
        onError={() => setErrored(true)}
        style={{
          position: 'absolute',
          width: imageSize,
          height: imageSize,
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          maxWidth: 'none',
        }}
      />
    </div>
  )
}

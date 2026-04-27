'use client'

import { useState } from 'react'
import { TOPPING_COMBOS, SAUCES } from '@/data/pizzaData'
import { shareCombo } from '@/lib/comboShare'
import ComboCard from './ComboCard'

interface HomeTabProps {
  menuComboIds: string[]
  onRemove: (id: string) => void
  onAddPizzaClick: () => void
  onSauceLink: (sauceId: string) => void
}

const SAUCE_IDS = new Set(SAUCES.map((s) => s.id))

export default function HomeTab({ menuComboIds, onRemove, onAddPizzaClick, onSauceLink }: HomeTabProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const combos = menuComboIds
    .map((id) => TOPPING_COMBOS.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => c !== undefined)

  async function handleShare(comboId: string) {
    const combo = TOPPING_COMBOS.find((c) => c.id === comboId)
    if (!combo) return
    const result = await shareCombo(combo)
    if (result.kind === 'copied') {
      setCopiedId(combo.id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  function handleIngredientLink(sauceId: string) {
    if (SAUCE_IDS.has(sauceId)) {
      onSauceLink(sauceId)
    }
  }

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  if (combos.length === 0) {
    return (
      <div className="p-4">
        <div className="rounded-xl border border-dashed border-stone-300 bg-white px-6 py-12 text-center">
          <p className="text-lg font-bold text-gray-800">What&apos;s on the menu?</p>
          <p className="mt-1 text-sm text-stone-500">Pick a pizza from Toppings to add it here.</p>
          <button
            onClick={onAddPizzaClick}
            className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm hover:opacity-90 active:opacity-80 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Pizza
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      {combos.map((combo) => (
        <ComboCard
          key={combo.id}
          combo={combo}
          onMenu
          isExpanded={expandedId === combo.id}
          copied={copiedId === combo.id}
          onToggleExpand={() => toggleExpand(combo.id)}
          onToggleMenu={() => onRemove(combo.id)}
          onShare={() => handleShare(combo.id)}
          onIngredientLink={handleIngredientLink}
        />
      ))}
    </div>
  )
}

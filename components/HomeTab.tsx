'use client'

import { useState } from 'react'
import { TOPPING_COMBOS, SAUCES } from '@/data/pizzaData'
import { isSauceRef, shareCombo } from '@/lib/comboShare'

interface HomeTabProps {
  menuComboIds: string[]
  onRemove: (id: string) => void
  onAddPizzaClick: () => void
  onSauceLink: (sauceId: string) => void
}

const SAUCE_IDS = new Set(SAUCES.map((s) => s.id))

export default function HomeTab({ menuComboIds, onRemove, onAddPizzaClick, onSauceLink }: HomeTabProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

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

  if (combos.length === 0) {
    return (
      <div className="p-4">
        <div className="rounded-xl border border-dashed border-stone-300 bg-white px-6 py-12 text-center">
          <p className="text-lg font-semibold text-gray-800">What&apos;s on the menu?</p>
          <p className="mt-1 text-sm text-stone-500">Pick a pizza from Toppings to add it here.</p>
          <button
            onClick={onAddPizzaClick}
            className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 active:bg-red-900 transition-colors"
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
        <div key={combo.id} className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">{combo.name}</h2>
            <div className="flex items-center gap-3 ml-2">
              <button
                onClick={() => handleShare(combo.id)}
                className="text-stone-400 hover:text-stone-600 active:text-stone-800 transition-colors flex items-center gap-1"
                title="Share ingredients"
              >
                {copiedId === combo.id ? (
                  <span className="text-xs font-medium text-stone-500">Copied!</span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => onRemove(combo.id)}
                className="text-stone-400 hover:text-stone-600 active:text-stone-800 transition-colors flex items-center"
                title="Remove from menu"
                aria-label={`Remove ${combo.name} from menu`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
          <div className="px-4 py-3 space-y-3">
            <ul className="space-y-1.5">
              {combo.ingredients.map((ing, i) => {
                if (isSauceRef(ing)) {
                  return (
                    <li key={i} className="text-sm flex gap-2 items-start">
                      <span className="text-stone-300 mt-0.5">•</span>
                      <button
                        onClick={() => handleIngredientLink(ing.sauceId)}
                        className="text-primary hover:text-red-800 underline underline-offset-2 text-left font-medium"
                      >
                        {ing.label}
                      </button>
                    </li>
                  )
                }
                return (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-stone-300">•</span>
                    {ing}
                  </li>
                )
              })}
            </ul>
            {combo.finishWith && combo.finishWith.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Finish with</p>
                <ul className="space-y-1.5">
                  {combo.finishWith.map((ing, i) => {
                    if (isSauceRef(ing)) {
                      return (
                        <li key={i} className="text-sm flex gap-2 items-start">
                          <span className="text-stone-300 mt-0.5">•</span>
                          <button
                            onClick={() => handleIngredientLink(ing.sauceId)}
                            className="text-primary hover:text-red-800 underline underline-offset-2 text-left font-medium"
                          >
                            {ing.label}
                          </button>
                        </li>
                      )
                    }
                    return (
                      <li key={i} className="text-sm text-gray-700 flex gap-2">
                        <span className="text-stone-300">•</span>
                        {ing}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

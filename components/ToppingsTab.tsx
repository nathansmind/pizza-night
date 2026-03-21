'use client'

import { useRef, useState } from 'react'
import { TOPPING_COMBOS, SPECIAL_RECIPES, SAUCES, type IngredientRef, type ToppingCombo } from '@/data/pizzaData'

interface ToppingsTabProps {
  onSauceLink: (sauceId: string) => void
}

function isSauceRef(ing: IngredientRef): ing is { label: string; sauceId: string } {
  return typeof ing === 'object' && ing !== null
}

function ingLabel(ing: IngredientRef): string {
  return isSauceRef(ing) ? ing.label : ing
}

function formatComboText(combo: ToppingCombo): string {
  const lines = [combo.name, '']
  lines.push(...combo.ingredients.map((ing) => `• ${ingLabel(ing)}`))
  if (combo.finishWith && combo.finishWith.length > 0) {
    lines.push('', 'Finish with:')
    lines.push(...combo.finishWith.map((ing) => `• ${ingLabel(ing)}`))
  }
  return lines.join('\n')
}

const SAUCE_IDS = new Set(SAUCES.map((s) => s.id))
const SPECIAL_IDS = new Set(SPECIAL_RECIPES.map((r) => r.id))

type Filter = 'all' | 'NYC' | 'Grilled' | 'Detroit' | 'Calzone' | 'special'

export default function ToppingsTab({ onSauceLink }: ToppingsTabProps) {
  const recipeRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('all')

  function handleIngredientLink(sauceId: string) {
    if (SAUCE_IDS.has(sauceId)) {
      onSauceLink(sauceId)
    } else if (SPECIAL_IDS.has(sauceId)) {
      recipeRefs.current[sauceId]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  async function handleShare(combo: ToppingCombo) {
    const text = formatComboText(combo)
    if (navigator.share) {
      await navigator.share({ title: combo.name, text })
    } else {
      await navigator.clipboard.writeText(text)
      setCopiedId(combo.id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  const visibleCombos = filter === 'all'
    ? TOPPING_COMBOS
    : filter === 'special'
      ? []
      : TOPPING_COMBOS.filter((c) => c.styles.includes(filter as 'NYC' | 'Grilled' | 'Detroit' | 'Calzone'))

  const showSpecialRecipes = filter === 'all' || filter === 'special'

  return (
    <div className="p-4 space-y-4">
      {/* Filter */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Filter
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Filter)}
          className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
        >
          <option value="all">All</option>
          <option value="NYC">NYC</option>
          <option value="Grilled">Grilled</option>
          <option value="Detroit">Detroit</option>
          <option value="Calzone">Calzone</option>
          <option value="special">Special Toppings</option>
        </select>
      </div>

      {visibleCombos.map((combo) => (
        <div key={combo.id} className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">{combo.name}</h2>
            <button
              onClick={() => handleShare(combo)}
              className="text-stone-400 hover:text-stone-600 active:text-stone-800 transition-colors ml-2 flex items-center gap-1"
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

      {/* Special Topping Recipes */}
      {showSpecialRecipes && <div className="pt-2">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Special Topping Recipes</h2>
        <div className="space-y-4">
          {SPECIAL_RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              ref={(el) => { recipeRefs.current[recipe.id] = el }}
              className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden"
            >
              <div className="px-4 py-3 bg-stone-50 border-b border-stone-200">
                <h3 className="font-semibold text-gray-800">{recipe.name}</h3>
              </div>
              <div className="px-4 py-3 space-y-3">
                {recipe.sections.map((section, i) => (
                  <div key={i}>
                    {section.heading && (
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        {section.heading}
                      </p>
                    )}
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item} className="text-sm text-gray-700 flex gap-2">
                          <span className="text-stone-300">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  )
}

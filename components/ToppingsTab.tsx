'use client'

import { useRef } from 'react'
import { TOPPING_COMBOS, SPECIAL_RECIPES, SAUCES, type IngredientRef } from '@/data/pizzaData'

interface ToppingsTabProps {
  onSauceLink: (sauceId: string) => void
}

function isSauceRef(ing: IngredientRef): ing is { label: string; sauceId: string } {
  return typeof ing === 'object' && ing !== null
}

const SAUCE_IDS = new Set(SAUCES.map((s) => s.id))
const SPECIAL_IDS = new Set(SPECIAL_RECIPES.map((r) => r.id))

export default function ToppingsTab({ onSauceLink }: ToppingsTabProps) {
  const recipeRefs = useRef<Record<string, HTMLDivElement | null>>({})

  function handleIngredientLink(sauceId: string) {
    if (SAUCE_IDS.has(sauceId)) {
      onSauceLink(sauceId)
    } else if (SPECIAL_IDS.has(sauceId)) {
      recipeRefs.current[sauceId]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="p-4 space-y-4">
      {TOPPING_COMBOS.map((combo) => (
        <div key={combo.id} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">{combo.name}</h2>
          </div>
          <div className="px-4 py-3">
            <ul className="space-y-1.5">
              {combo.ingredients.map((ing, i) => {
                if (isSauceRef(ing)) {
                  return (
                    <li key={i} className="text-sm flex gap-2 items-start">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <button
                        onClick={() => handleIngredientLink(ing.sauceId)}
                        className="text-orange-500 hover:text-orange-700 underline underline-offset-2 text-left font-medium"
                      >
                        {ing.label}
                      </button>
                    </li>
                  )
                }
                return (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-gray-400">•</span>
                    {ing}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      ))}

      {/* Special Topping Recipes */}
      <div className="pt-2">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Special Topping Recipes</h2>
        <div className="space-y-4">
          {SPECIAL_RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              ref={(el) => { recipeRefs.current[recipe.id] = el }}
              className="rounded-lg border border-gray-200 bg-white overflow-hidden"
            >
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">{recipe.name}</h3>
              </div>
              <div className="px-4 py-3 space-y-3">
                {recipe.sections.map((section, i) => (
                  <div key={i}>
                    {section.heading && (
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        {section.heading}
                      </p>
                    )}
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item} className="text-sm text-gray-700 flex gap-2">
                          <span className="text-gray-400">•</span>
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
      </div>
    </div>
  )
}

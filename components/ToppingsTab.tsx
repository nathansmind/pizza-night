'use client'

import { useRef, useState } from 'react'
import { TOPPING_COMBOS, SPECIAL_RECIPES, SAUCES, type ToppingCombo } from '@/data/pizzaData'
import { shareCombo } from '@/lib/comboShare'
import ComboCard from './ComboCard'

interface ToppingsTabProps {
  onSauceLink: (sauceId: string) => void
  menuComboIds: string[]
  onAddToMenu: (id: string) => void
  onRemoveFromMenu: (id: string) => void
}

const SAUCE_IDS = new Set(SAUCES.map((s) => s.id))
const SPECIAL_IDS = new Set(SPECIAL_RECIPES.map((r) => r.id))

const SPECIAL_AS_COMBOS: ToppingCombo[] = SPECIAL_RECIPES.map((r) => ({
  id: r.id,
  name: r.name,
  styles: [],
  ingredients: r.sections.flatMap((s) => s.items),
}))

type Filter = 'all' | 'NYC' | 'Grilled' | 'Detroit' | 'Calzone' | 'special'

export default function ToppingsTab({ onSauceLink, menuComboIds, onAddToMenu, onRemoveFromMenu }: ToppingsTabProps) {
  const recipeRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  function handleIngredientLink(sauceId: string) {
    if (SAUCE_IDS.has(sauceId)) {
      onSauceLink(sauceId)
    } else if (SPECIAL_IDS.has(sauceId)) {
      recipeRefs.current[sauceId]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  async function handleShare(combo: ToppingCombo) {
    const result = await shareCombo(combo)
    if (result.kind === 'copied') {
      setCopiedId(combo.id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id))
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
        <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
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

      {visibleCombos.map((combo) => {
        const onMenu = menuComboIds.includes(combo.id)
        return (
          <ComboCard
            key={combo.id}
            combo={combo}
            onMenu={onMenu}
            isExpanded={expandedId === combo.id}
            copied={copiedId === combo.id}
            onToggleExpand={() => toggleExpand(combo.id)}
            onToggleMenu={() => (onMenu ? onRemoveFromMenu(combo.id) : onAddToMenu(combo.id))}
            onShare={() => handleShare(combo)}
            onIngredientLink={handleIngredientLink}
          />
        )
      })}

      {/* Special Topping Recipes */}
      {showSpecialRecipes && (
        <div className="pt-2">
          <h2 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Special Topping Recipes</h2>
          <div className="space-y-4">
            {SPECIAL_AS_COMBOS.map((combo) => (
              <div key={combo.id} ref={(el) => { recipeRefs.current[combo.id] = el }}>
                <ComboCard
                  combo={combo}
                  isExpanded={expandedId === combo.id}
                  copied={copiedId === combo.id}
                  onToggleExpand={() => toggleExpand(combo.id)}
                  onShare={() => handleShare(combo)}
                  onIngredientLink={handleIngredientLink}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

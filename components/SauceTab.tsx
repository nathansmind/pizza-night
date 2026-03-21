'use client'

import { useEffect, useRef, useState } from 'react'
import { SAUCES } from '@/data/pizzaData'

interface SauceTabProps {
  activeSauceId: string | null
  onClearActiveSauce: () => void
}

const DEFAULT_OZ = 28

export default function SauceTab({ activeSauceId, onClearActiveSauce }: SauceTabProps) {
  const sauceRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [ozValues, setOzValues] = useState<Record<string, number>>(
    Object.fromEntries(SAUCES.map((s) => [s.id, DEFAULT_OZ]))
  )

  useEffect(() => {
    if (!activeSauceId) return
    const el = sauceRefs.current[activeSauceId]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    onClearActiveSauce()
  }, [activeSauceId, onClearActiveSauce])

  function setOz(sauceId: string, value: number) {
    setOzValues((prev) => ({ ...prev, [sauceId]: Math.max(1, value) }))
  }

  return (
    <div className="p-4 space-y-6">
      {SAUCES.map((sauce) => {
        const oz = ozValues[sauce.id]

        return (
          <div
            key={sauce.id}
            id={`sauce-${sauce.id}`}
            ref={(el) => { sauceRefs.current[sauce.id] = el }}
            className={`rounded-xl border bg-white shadow-sm overflow-hidden transition-all ${
              activeSauceId === sauce.id
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-stone-200'
            }`}
          >
            <div className="px-4 py-3 bg-stone-50 border-b border-stone-200">
              <h2 className="font-semibold text-gray-800">{sauce.name}</h2>
            </div>
            <table className="w-full text-sm">
              <thead className="border-b border-stone-100">
                <tr>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Ingredient
                  </th>
                  <th className="text-right px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-right px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Grams
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {sauce.ingredients.map((ing) => {
                  // Tomatoes row — editable oz input
                  if (ing.fixedAmount === 'oz') {
                    return (
                      <tr key={ing.name}>
                        <td className="px-4 py-2 text-gray-800">{ing.name}</td>
                        <td className="px-4 py-2 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <input
                              type="number"
                              min={1}
                              value={oz}
                              onChange={(e) => setOz(sauce.id, parseInt(e.target.value) || 1)}
                              className="w-16 text-right rounded-lg border border-stone-300 bg-white px-2 py-0.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary"
                            />
                            <span className="text-gray-400 text-xs">oz</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-right text-gray-400">—</td>
                      </tr>
                    )
                  }

                  // Fixed non-scalable (e.g. Black Pepper "Pinch")
                  if (ing.fixedAmount) {
                    return (
                      <tr key={ing.name}>
                        <td className="px-4 py-2 text-gray-800">{ing.name}</td>
                        <td className="px-4 py-2 text-right text-gray-500">{ing.fixedAmount}</td>
                        <td className="px-4 py-2 text-right text-gray-400">—</td>
                      </tr>
                    )
                  }

                  // Scalable ingredient
                  const tsp = oz * (ing.tspPer28oz! / DEFAULT_OZ)
                  const grams = tsp * ing.gramsPerTsp!
                  return (
                    <tr key={ing.name}>
                      <td className="px-4 py-2 text-gray-800">{ing.name}</td>
                      <td className="px-4 py-2 text-right text-gray-500">{tsp.toFixed(2)} tsp</td>
                      <td className="px-4 py-2 text-right text-gray-500">{grams.toFixed(2)}g</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-stone-100 text-sm text-gray-700 leading-relaxed">
              <p>{sauce.instructions}</p>
              {sauce.notes && (
                <p className="mt-1 text-gray-400 text-xs">{sauce.notes}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import { SAUCES } from '@/data/pizzaData'

interface SauceTabProps {
  activeSauceId: string | null
  onClearActiveSauce: () => void
}

export default function SauceTab({ activeSauceId, onClearActiveSauce }: SauceTabProps) {
  const sauceRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    if (!activeSauceId) return
    const el = sauceRefs.current[activeSauceId]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    onClearActiveSauce()
  }, [activeSauceId, onClearActiveSauce])

  return (
    <div className="p-4 space-y-6">
      {SAUCES.map((sauce) => (
        <div
          key={sauce.id}
          id={`sauce-${sauce.id}`}
          ref={(el) => { sauceRefs.current[sauce.id] = el }}
          className={`rounded-lg border bg-white overflow-hidden transition-all ${
            activeSauceId === sauce.id ? 'border-orange-400 ring-2 ring-orange-300' : 'border-gray-200'
          }`}
        >
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">{sauce.name}</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Ingredient
                </th>
                <th className="text-right px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Amount
                </th>
                <th className="text-right px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Grams
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sauce.ingredients.map((ing) => (
                <tr key={ing.name}>
                  <td className="px-4 py-2">{ing.name}</td>
                  <td className="px-4 py-2 text-right text-gray-600">{ing.amount}</td>
                  <td className="px-4 py-2 text-right text-gray-500">{ing.grams ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-3 border-t border-gray-100 text-sm text-gray-700">
            <p>{sauce.instructions}</p>
            {sauce.notes && (
              <p className="mt-1 text-gray-500 text-xs">{sauce.notes}</p>
            )}
          </div>
        </div>
      ))}

    </div>
  )
}

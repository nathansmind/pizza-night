'use client'

import { PIZZA_STYLES, type PizzaStyle } from '@/data/pizzaData'

interface CrustTabProps {
  selectedStyle: PizzaStyle
  onStyleChange: (style: PizzaStyle) => void
  numPizzas: number
  onNumPizzasChange: (n: number) => void
  overrides: Partial<Record<string, number>>
  onOverride: (key: string, value: number) => void
  onResetIngredient: (key: string) => void
  onResetAll: () => void
}

// Water warm/ice split from spreadsheet
const WARM_RATIO = 0.22
const ICE_RATIO = 0.78

function calcIngredients(style: PizzaStyle, numPizzas: number) {
  const s = PIZZA_STYLES.find((p) => p.name === style)!
  const totalBakerPct = 1.0 + 0.01 + s.waterPct + 0.02 + 0.01 + s.maltOrSugarPct
  const flour = (s.doughBallGrams * numPizzas) / totalBakerPct
  const water = flour * s.waterPct
  return {
    flour,
    yeast: flour * 0.01,
    water,
    warmWater: water * WARM_RATIO,
    iceWater: water * ICE_RATIO,
    salt: flour * 0.02,
    oliveOil: flour * 0.01,
    maltOrSugar: flour * s.maltOrSugarPct,
    total: s.doughBallGrams * numPizzas,
  }
}

interface Row {
  key: string
  label: string
  bakersPct?: string
  isSubrow?: boolean
}

const ROWS: Row[] = [
  { key: 'flour', label: 'High-Gluten Flour', bakersPct: '100%' },
  { key: 'yeast', label: 'Active Dry Yeast', bakersPct: '1%' },
  { key: 'water', label: 'Water', bakersPct: '—' },
  { key: 'warmWater', label: 'Warm Water', isSubrow: true },
  { key: 'iceWater', label: 'Ice Water', isSubrow: true },
  { key: 'salt', label: 'Salt', bakersPct: '2%' },
  { key: 'oliveOil', label: 'Olive Oil', bakersPct: '1%' },
  { key: 'maltOrSugar', label: 'Malt or Sugar', bakersPct: '—' },
]

export default function CrustTab({
  selectedStyle,
  onStyleChange,
  numPizzas,
  onNumPizzasChange,
  overrides,
  onOverride,
  onResetIngredient,
  onResetAll,
}: CrustTabProps) {
  const calc = calcIngredients(selectedStyle, numPizzas)
  const styleData = PIZZA_STYLES.find((p) => p.name === selectedStyle)!
  const hasOverrides = Object.keys(overrides).length > 0

  function displayValue(key: string): number {
    return overrides[key] ?? calc[key as keyof typeof calc] as number
  }

  function isModified(key: string): boolean {
    return overrides[key] !== undefined
  }

  const totalBakerPct = Math.round(
    (1.0 + 0.01 + styleData.waterPct + 0.02 + 0.01 + styleData.maltOrSugarPct) * 100
  )

  return (
    <div className="p-4 space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Pizza Style
          </label>
          <select
            value={selectedStyle}
            onChange={(e) => onStyleChange(e.target.value as PizzaStyle)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {PIZZA_STYLES.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-36">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            # of Pizzas
          </label>
          <input
            type="number"
            min={1}
            value={numPizzas}
            onChange={(e) => onNumPizzasChange(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      {/* Ingredient Table */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-700">Dough Recipe</h2>
          {hasOverrides && (
            <button
              onClick={onResetAll}
              className="text-xs text-orange-500 hover:text-orange-700 font-medium"
            >
              Reset All
            </button>
          )}
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Ingredient
                </th>
                <th className="text-right px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide w-16">
                  Baker's%
                </th>
                <th className="text-right px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide w-28">
                  Grams
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ROWS.map((row) => {
                const val = displayValue(row.key)
                const modified = isModified(row.key)
                const isWater = row.key === 'water'
                // water baker's pct is dynamic
                const bakersPct =
                  isWater
                    ? `${Math.round(styleData.waterPct * 100)}%`
                    : row.key === 'maltOrSugar'
                    ? `${Math.round(styleData.maltOrSugarPct * 100)}%`
                    : row.bakersPct

                if (row.isSubrow) {
                  return (
                    <tr key={row.key} className="bg-gray-50">
                      <td className="px-3 py-1.5 text-gray-500 pl-7 text-xs">{row.label}</td>
                      <td className="px-3 py-1.5 text-right text-gray-400 text-xs">—</td>
                      <td className="px-3 py-1.5 text-right text-gray-500 text-xs pr-3">
                        {val.toFixed(1)}g
                      </td>
                    </tr>
                  )
                }

                return (
                  <tr key={row.key} className={modified ? 'bg-orange-50' : ''}>
                    <td className="px-3 py-2 font-medium">{row.label}</td>
                    <td className="px-3 py-2 text-right text-gray-500">{bakersPct}</td>
                    <td className="px-3 py-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {modified && (
                          <button
                            onClick={() => onResetIngredient(row.key)}
                            title="Reset to calculated value"
                            className="text-orange-400 hover:text-orange-600 text-xs"
                          >
                            ↺
                          </button>
                        )}
                        <input
                          type="number"
                          step="0.1"
                          value={val.toFixed(1)}
                          onChange={(e) => {
                            const n = parseFloat(e.target.value)
                            if (!isNaN(n)) onOverride(row.key, n)
                          }}
                          className={`w-20 text-right rounded border px-2 py-0.5 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 ${
                            modified
                              ? 'border-orange-300 bg-orange-50'
                              : 'border-transparent bg-transparent'
                          }`}
                        />
                        <span className="text-gray-400 text-xs w-4">g</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {/* Total row */}
              <tr className="bg-gray-50 border-t border-gray-200 font-semibold">
                <td className="px-3 py-2">Total</td>
                <td className="px-3 py-2 text-right text-gray-500">{totalBakerPct}%</td>
                <td className="px-3 py-2 text-right pr-7">
                  {calc.total.toFixed(0)}g
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-3 py-2 text-gray-500">Per Dough Ball</td>
                <td></td>
                <td className="px-3 py-2 text-right pr-7 text-gray-500">
                  {styleData.doughBallGrams}g
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Instructions */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-2">Instructions</h2>
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700 leading-relaxed">
          {styleData.instructions}
        </div>
      </div>
    </div>
  )
}

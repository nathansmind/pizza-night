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

const WARM_RATIO = 0.22
const ICE_RATIO = 0.78

function calcIngredients(
  style: PizzaStyle,
  numPizzas: number,
  overrides: Partial<Record<string, number>>
) {
  const s = PIZZA_STYLES.find((p) => p.name === style)!
  const yeastPct      = overrides.yeast       ?? 0.01
  const waterPct      = overrides.water        ?? s.waterPct
  const saltPct       = overrides.salt         ?? 0.02
  const oliveOilPct   = overrides.oliveOil     ?? s.oliveOilPct
  const maltOrSugarPct = overrides.maltOrSugar ?? s.maltOrSugarPct

  const totalBakerPct = 1.0 + yeastPct + waterPct + saltPct + oliveOilPct + maltOrSugarPct
  const flour = (s.doughBallGrams * numPizzas) / totalBakerPct
  const water = flour * waterPct

  return {
    flourGrams: flour,
    yeastGrams: flour * yeastPct,
    waterGrams: water,
    warmWaterGrams: water * WARM_RATIO,
    iceWaterGrams: water * ICE_RATIO,
    saltGrams: flour * saltPct,
    oliveOilGrams: flour * oliveOilPct,
    maltOrSugarGrams: flour * maltOrSugarPct,
    yeastPct, waterPct, saltPct, oliveOilPct, maltOrSugarPct,
    totalBakerPct: Math.round(totalBakerPct * 100),
  }
}

interface Row {
  key: string
  label: string
  gramsKey: string
  fixedPct?: string   // read-only percentage (flour)
  isSubrow?: boolean
}

const ROWS: Row[] = [
  { key: 'flour',       label: 'High-Gluten Flour', gramsKey: 'flourGrams',       fixedPct: '100%' },
  { key: 'yeast',       label: 'Active Dry Yeast',  gramsKey: 'yeastGrams' },
  { key: 'water',       label: 'Water',             gramsKey: 'waterGrams' },
  { key: 'warmWater',   label: 'Warm Water',        gramsKey: 'warmWaterGrams',   isSubrow: true },
  { key: 'iceWater',    label: 'Ice Water',         gramsKey: 'iceWaterGrams',    isSubrow: true },
  { key: 'salt',        label: 'Salt',              gramsKey: 'saltGrams' },
  { key: 'oliveOil',    label: 'Olive Oil',         gramsKey: 'oliveOilGrams' },
  { key: 'maltOrSugar', label: 'Malt or Sugar',     gramsKey: 'maltOrSugarGrams' },
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
  const styleData = PIZZA_STYLES.find((p) => p.name === selectedStyle)!
  const calc = calcIngredients(selectedStyle, numPizzas, overrides)
  const hasOverrides = Object.keys(overrides).length > 0

  function effectivePct(key: string): number {
    return calc[`${key}Pct` as keyof typeof calc] as number
  }

  function isModified(key: string): boolean {
    return overrides[key] !== undefined
  }

  return (
    <div className="p-4 space-y-6">
      {/* Controls */}
      <div className="flex flex-row items-end gap-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Pizza Style
          </label>
          <select
            value={selectedStyle}
            onChange={(e) => onStyleChange(e.target.value as PizzaStyle)}
            className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          >
            {PIZZA_STYLES.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            # of Pizzas
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNumPizzasChange(Math.max(1, numPizzas - 1))}
              className="w-9 h-9 rounded-lg border border-stone-300 bg-white text-gray-600 text-lg font-medium hover:bg-stone-50 active:bg-stone-100 flex items-center justify-center"
            >
              −
            </button>
            <span className="w-8 text-center font-semibold text-gray-800">{numPizzas}</span>
            <button
              onClick={() => onNumPizzasChange(numPizzas + 1)}
              className="w-9 h-9 rounded-lg border border-stone-300 bg-white text-gray-600 text-lg font-medium hover:bg-stone-50 active:bg-stone-100 flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Ingredient Table */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dough Recipe</h2>
          {hasOverrides && (
            <button
              onClick={onResetAll}
              className="text-xs text-primary hover:text-red-800 font-semibold"
            >
              Reset All
            </button>
          )}
        </div>
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Ingredient
                </th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">
                  Baker's %
                </th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                  Grams
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {ROWS.map((row) => {
                const grams = calc[row.gramsKey as keyof typeof calc] as number

                if (row.isSubrow) {
                  return (
                    <tr key={row.key} className="bg-stone-50/50">
                      <td className="px-4 py-1.5 text-gray-400 pl-8 text-xs">{row.label}</td>
                      <td className="px-4 py-1.5 text-right text-gray-300 text-xs">—</td>
                      <td className="px-4 py-1.5 text-right text-gray-500 font-bold text-xs pr-4">
                        {grams.toFixed(1)}g
                      </td>
                    </tr>
                  )
                }

                const modified = !row.fixedPct && isModified(row.key)
                const pctValue = row.fixedPct
                  ? null
                  : Math.round(effectivePct(row.key) * 1000) / 10

                return (
                  <tr key={row.key} className={modified ? 'bg-red-50' : ''}>
                    <td className="px-4 py-2.5 font-medium text-gray-800">{row.label}</td>
                    <td className="px-4 py-2.5 text-right">
                      {row.fixedPct ? (
                        <span className="text-gray-400 text-xs">{row.fixedPct}</span>
                      ) : (
                        <div className="flex items-center justify-end gap-1">
                          {modified && (
                            <button
                              onClick={() => onResetIngredient(row.key)}
                              title="Reset to default"
                              className="text-primary hover:text-red-800 text-sm"
                            >
                              ↺
                            </button>
                          )}
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            value={pctValue!}
                            onChange={(e) => {
                              const n = parseFloat(e.target.value)
                              if (!isNaN(n)) onOverride(row.key, n / 100)
                            }}
                            className={`w-16 text-right rounded-lg border px-2 py-0.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 ${
                              modified
                                ? 'border-primary/30 bg-red-50 text-primary font-semibold'
                                : 'border-stone-200 bg-white'
                            }`}
                          />
                          <span className="text-gray-400 text-xs">%</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-right text-gray-700 font-bold pr-4">
                      {grams.toFixed(1)}g
                    </td>
                  </tr>
                )
              })}
              <tr className="bg-stone-50 border-t border-stone-200 font-semibold">
                <td className="px-4 py-2.5 text-gray-700">Total</td>
                <td className="px-4 py-2.5 text-right text-gray-400 text-xs">{calc.totalBakerPct}%</td>
                <td className="px-4 py-2.5 text-right pr-4 text-gray-700 font-bold">
                  {(styleData.doughBallGrams * numPizzas).toFixed(0)}g
                </td>
              </tr>
              <tr className="bg-stone-50">
                <td className="px-4 py-2 text-gray-400 text-sm">Per Dough Ball</td>
                <td></td>
                <td className="px-4 py-2 text-right pr-4 text-gray-500 font-bold text-sm">
                  {styleData.doughBallGrams}g
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Instructions */}
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Instructions</h2>
        <div className="rounded-xl border border-stone-200 bg-white shadow-sm p-4 text-sm text-gray-700 leading-relaxed space-y-3">
          {styleData.instructions.split('\n\n').map((para, i) => (
            <p key={i}>
              {para.split(/(\*\*.*?\*\*)/).map((chunk, j) =>
                chunk.startsWith('**') && chunk.endsWith('**')
                  ? <strong key={j}>{chunk.slice(2, -2)}</strong>
                  : chunk
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

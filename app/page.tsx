'use client'

import { useEffect, useState } from 'react'
import TabNav from '@/components/TabNav'
import CrustTab from '@/components/CrustTab'
import ToppingsTab from '@/components/ToppingsTab'
import SauceTab from '@/components/SauceTab'
import { PIZZA_STYLES, type PizzaStyle } from '@/data/pizzaData'

type Tab = 'crust' | 'toppings' | 'sauce'

const TAB_TITLES: Record<Tab, string> = {
  crust: 'Crust',
  toppings: 'Toppings',
  sauce: 'Sauce',
}

const STORAGE_KEY = 'pizza-night:prefs:v1'

type StoredPrefs = {
  selectedStyle: PizzaStyle
  numPizzas: number
  overrides: Partial<Record<string, number>>
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('crust')
  const [selectedStyle, setSelectedStyle] = useState<PizzaStyle>('NYC')
  const [numPizzas, setNumPizzas] = useState(1)
  const [overrides, setOverrides] = useState<Partial<Record<string, number>>>({})
  const [activeSauceId, setActiveSauceId] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<StoredPrefs>
        if (parsed.selectedStyle && PIZZA_STYLES.some((s) => s.name === parsed.selectedStyle)) {
          setSelectedStyle(parsed.selectedStyle)
        }
        if (typeof parsed.numPizzas === 'number' && parsed.numPizzas >= 1) {
          setNumPizzas(parsed.numPizzas)
        }
        if (parsed.overrides && typeof parsed.overrides === 'object') {
          setOverrides(parsed.overrides)
        }
      }
    } catch {
      // Corrupt JSON or storage disabled — fall back to defaults.
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ selectedStyle, numPizzas, overrides })
      )
    } catch {
      // Quota exceeded or storage disabled — non-fatal.
    }
  }, [hydrated, selectedStyle, numPizzas, overrides])

  function handleOverride(key: string, value: number) {
    setOverrides((prev) => ({ ...prev, [key]: value }))
  }

  function handleResetIngredient(key: string) {
    setOverrides((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  function handleResetAll() {
    setOverrides({})
  }

  function handleStyleChange(style: PizzaStyle) {
    setSelectedStyle(style)
    setOverrides({})
  }

  function handleSauceLink(sauceId: string) {
    setActiveSauceId(sauceId)
    setActiveTab('sauce')
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen">
      <header className="sticky top-0 z-30 bg-gray-100/90 backdrop-blur-sm border-b border-stone-300 px-4 py-3">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          {TAB_TITLES[activeTab]}
        </h1>
      </header>

      <main className="pb-[calc(env(safe-area-inset-bottom)+4.5rem)]">
        {activeTab === 'crust' && (
          <CrustTab
            selectedStyle={selectedStyle}
            onStyleChange={handleStyleChange}
            numPizzas={numPizzas}
            onNumPizzasChange={setNumPizzas}
            overrides={overrides}
            onOverride={handleOverride}
            onResetIngredient={handleResetIngredient}
            onResetAll={handleResetAll}
          />
        )}
        {activeTab === 'toppings' && (
          <ToppingsTab onSauceLink={handleSauceLink} />
        )}
        {activeTab === 'sauce' && (
          <SauceTab
            activeSauceId={activeSauceId}
            onClearActiveSauce={() => setActiveSauceId(null)}
          />
        )}
      </main>

      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

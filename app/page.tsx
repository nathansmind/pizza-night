'use client'

import { useEffect, useState } from 'react'
import TabNav from '@/components/TabNav'
import CrustTab from '@/components/CrustTab'
import ToppingsTab from '@/components/ToppingsTab'
import SauceTab from '@/components/SauceTab'
import HomeTab from '@/components/HomeTab'
import { PIZZA_STYLES, TOPPING_COMBOS, type PizzaStyle } from '@/data/pizzaData'

type Tab = 'home' | 'crust' | 'toppings' | 'sauce'

const TAB_TITLES: Record<Tab, string> = {
  home: 'Pizza Night',
  crust: 'Crust',
  toppings: 'Toppings',
  sauce: 'Sauce',
}

const STORAGE_KEY = 'pizza-night:prefs:v1'
const MENU_STORAGE_KEY = 'pizza-night:menu:v1'

type StoredPrefs = {
  selectedStyle: PizzaStyle
  numPizzas: number
  overrides: Partial<Record<string, number>>
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [selectedStyle, setSelectedStyle] = useState<PizzaStyle>('NYC')
  const [numPizzas, setNumPizzas] = useState(1)
  const [overrides, setOverrides] = useState<Partial<Record<string, number>>>({})
  const [activeSauceId, setActiveSauceId] = useState<string | null>(null)
  const [menuComboIds, setMenuComboIds] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [menuHydrated, setMenuHydrated] = useState(false)

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
    try {
      const raw = localStorage.getItem(MENU_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as unknown
        if (Array.isArray(parsed)) {
          const validIds = new Set(TOPPING_COMBOS.map((c) => c.id))
          const cleaned = parsed.filter((id): id is string => typeof id === 'string' && validIds.has(id))
          setMenuComboIds(cleaned)
        }
      }
    } catch {
      // Corrupt JSON or storage disabled — fall back to empty menu.
    }
    setMenuHydrated(true)
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

  useEffect(() => {
    if (!menuHydrated) return
    try {
      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menuComboIds))
    } catch {
      // Quota exceeded or storage disabled — non-fatal.
    }
  }, [menuHydrated, menuComboIds])

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

  function handleAddToMenu(id: string) {
    setMenuComboIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  function handleRemoveFromMenu(id: string) {
    setMenuComboIds((prev) => prev.filter((existing) => existing !== id))
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen">
      <div className="sticky top-0 z-30">
        <header className="bg-primary text-white px-4 py-3 text-center">
          <h1 className="font-display uppercase tracking-wide text-xl">
            {TAB_TITLES[activeTab]}
          </h1>
        </header>
        <div className="checker-strip" aria-hidden />
      </div>

      <main className="pb-[calc(env(safe-area-inset-bottom)+4.5rem)]">
        {activeTab === 'home' && (
          <HomeTab
            menuComboIds={menuComboIds}
            onRemove={handleRemoveFromMenu}
            onAddPizzaClick={() => setActiveTab('toppings')}
            onSauceLink={handleSauceLink}
          />
        )}
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
          <ToppingsTab
            onSauceLink={handleSauceLink}
            menuComboIds={menuComboIds}
            onAddToMenu={handleAddToMenu}
            onRemoveFromMenu={handleRemoveFromMenu}
          />
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

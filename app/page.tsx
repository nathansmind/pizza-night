'use client'

import { useState } from 'react'
import Image from 'next/image'
import TabNav from '@/components/TabNav'
import CrustTab from '@/components/CrustTab'
import ToppingsTab from '@/components/ToppingsTab'
import SauceTab from '@/components/SauceTab'
import type { PizzaStyle } from '@/data/pizzaData'

type Tab = 'crust' | 'toppings' | 'sauce'

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('crust')
  const [selectedStyle, setSelectedStyle] = useState<PizzaStyle>('NYC')
  const [numPizzas, setNumPizzas] = useState(1)
  const [overrides, setOverrides] = useState<Partial<Record<string, number>>>({})
  const [activeSauceId, setActiveSauceId] = useState<string | null>(null)

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
    <div className="max-w-lg mx-auto min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex flex-col items-center py-3 px-4">
        <Image
          src="/logo.png"
          alt="The Pizza Place"
          width={486}
          height={351}
          className="w-24 h-auto"
          priority
        />
      </header>

      {/* Tab Nav */}
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <main className="flex-1 overflow-auto">
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
    </div>
  )
}

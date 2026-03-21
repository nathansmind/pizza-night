'use client'

type Tab = 'crust' | 'toppings' | 'sauce'

interface TabNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const TABS: { id: Tab; label: string }[] = [
  { id: 'crust', label: 'Crust' },
  { id: 'toppings', label: 'Toppings' },
  { id: 'sauce', label: 'Sauce' },
]

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <nav className="flex border-b border-gray-200 bg-white">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'border-b-2 border-orange-500 text-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}

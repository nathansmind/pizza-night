'use client'

type Tab = 'home' | 'crust' | 'toppings' | 'sauce'

interface TabNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
    </svg>
  )
}

function CrustIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="6" />
    </svg>
  )
}

function ToppingsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="9" cy="9" r="1.25" fill="currentColor" />
      <circle cx="15" cy="10" r="1.25" fill="currentColor" />
      <circle cx="10.5" cy="14.5" r="1.25" fill="currentColor" />
      <circle cx="15" cy="15" r="1.25" fill="currentColor" />
    </svg>
  )
}

function SauceIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3c3 4.5 6 8 6 11a6 6 0 1 1-12 0c0-3 3-6.5 6-11z" />
    </svg>
  )
}

const TABS: { id: Tab; label: string; Icon: (props: { className?: string }) => JSX.Element }[] = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'crust', label: 'Crust', Icon: CrustIcon },
  { id: 'toppings', label: 'Toppings', Icon: ToppingsIcon },
  { id: 'sauce', label: 'Sauce', Icon: SauceIcon },
]

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto flex border-t border-stone-300 bg-white/90 backdrop-blur-sm pb-[env(safe-area-inset-bottom)] z-40"
      aria-label="Primary"
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
            className={`flex-1 flex flex-col items-center gap-1 py-2 text-xs font-semibold tracking-wide transition-colors ${
              isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Icon className="w-6 h-6" />
            {label}
          </button>
        )
      })}
    </nav>
  )
}

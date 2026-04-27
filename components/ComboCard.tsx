'use client'

import ComboImage from './ComboImage'
import { isSauceRef } from '@/lib/comboShare'
import type { ToppingCombo } from '@/data/pizzaData'

interface ComboCardProps {
  combo: ToppingCombo
  onMenu?: boolean
  isExpanded: boolean
  copied: boolean
  onToggleExpand: () => void
  onToggleMenu?: () => void
  onShare: () => void
  onIngredientLink: (sauceId: string) => void
}

export default function ComboCard({
  combo,
  onMenu = false,
  isExpanded,
  copied,
  onToggleExpand,
  onToggleMenu,
  onShare,
  onIngredientLink,
}: ComboCardProps) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden hover:border-stone-300 transition-colors">
      <div className="flex items-stretch">
        <ComboImage combo={combo} />
        <button
          onClick={onToggleExpand}
          aria-expanded={isExpanded}
          className="flex-1 min-w-0 text-left px-4 py-4 focus:outline-none focus-visible:bg-stone-50"
        >
          <h2 className="font-bold text-lg text-gray-900 leading-tight">{combo.name}</h2>
          {combo.description && (
            <p className="mt-1.5 text-xs text-stone-600 leading-snug">
              {combo.description}
            </p>
          )}
        </button>
        {onToggleMenu && (
          <div className="flex items-center pr-4 pl-2">
            <button
              onClick={onToggleMenu}
              aria-pressed={onMenu}
              aria-label={onMenu ? `Remove ${combo.name} from menu` : `Add ${combo.name} to menu`}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                onMenu
                  ? 'border-primary text-white bg-primary hover:bg-primary/90'
                  : 'border-stone-300 text-stone-400 bg-white hover:border-primary hover:text-primary'
              }`}
            >
              {onMenu ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="pl-[106px] pr-4 pb-5 pt-2 space-y-5">
          <IngredientList
            heading="Ingredients"
            items={combo.ingredients}
            onLink={onIngredientLink}
          />
          {combo.finishWith && combo.finishWith.length > 0 && (
            <IngredientList
              heading="Finish with"
              items={combo.finishWith}
              onLink={onIngredientLink}
            />
          )}
          <div>
            <button
              onClick={onShare}
              className="inline-flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-2.5 py-1 text-xs font-bold text-stone-600 hover:border-stone-400 hover:text-stone-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              {copied ? 'Copied!' : 'Share ingredients'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

interface IngredientListProps {
  heading: string
  items: ToppingCombo['ingredients']
  onLink: (sauceId: string) => void
}

function IngredientList({ heading, items, onLink }: IngredientListProps) {
  return (
    <div>
      <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">{heading}</p>
      <ul className="space-y-1.5">
        {items.map((ing, i) => {
          if (isSauceRef(ing)) {
            return (
              <li key={i} className="text-sm flex gap-2 items-start">
                <span className="text-stone-300 mt-0.5">•</span>
                <button
                  onClick={() => onLink(ing.sauceId)}
                  className="text-primary hover:underline text-left font-bold"
                >
                  {ing.label}
                </button>
              </li>
            )
          }
          return (
            <li key={i} className="text-sm text-gray-700 flex gap-2">
              <span className="text-stone-300">•</span>
              {ing}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

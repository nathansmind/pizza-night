'use client'

import ComboCard from '@/components/ComboCard'
import { TOPPING_COMBOS } from '@/data/pizzaData'

const sampleCombo = TOPPING_COMBOS.find((c) => c.id === 'margarita')!

export default function StylesPage() {
  return (
    <div className="max-w-lg mx-auto min-h-screen">
      <div className="sticky top-0 z-30">
        <header className="bg-primary text-white px-4 py-3 text-center">
          <h1 className="font-display uppercase tracking-wide text-xl">Style Guide</h1>
        </header>
        <div className="checker-strip" aria-hidden />
      </div>

      <main className="p-4 space-y-10 pb-16">

        {/* ── Colors ───────────────────────────────────────────── */}
        <Section title="Colors">
          <div className="space-y-4">
            <SwatchGroup label="Brand">
              <Swatch bg="bg-primary" name="primary" detail="#C83D3E" />
              <Swatch bg="bg-cream border border-stone-200" name="cream" detail="#FAF6EE" darkText />
              <Swatch bg="bg-white border border-stone-200" name="white" detail="#FFFFFF" darkText />
            </SwatchGroup>
            <SwatchGroup label="Stone scale">
              <Swatch bg="bg-stone-100 border border-stone-200" name="stone-100" darkText />
              <Swatch bg="bg-stone-200" name="stone-200" darkText />
              <Swatch bg="bg-stone-300" name="stone-300" darkText />
              <Swatch bg="bg-stone-400" name="stone-400" />
              <Swatch bg="bg-stone-500" name="stone-500" />
              <Swatch bg="bg-stone-600" name="stone-600" />
            </SwatchGroup>
            <SwatchGroup label="Text">
              <Swatch bg="bg-gray-900" name="gray-900" />
              <Swatch bg="bg-gray-700" name="gray-700" />
              <Swatch bg="bg-stone-600" name="stone-600" />
              <Swatch bg="bg-stone-500" name="stone-500" />
              <Swatch bg="bg-gray-400" name="gray-400" />
            </SwatchGroup>
          </div>
        </Section>

        {/* ── Typography ───────────────────────────────────────── */}
        <Section title="Typography">
          <div className="space-y-6">

            <div>
              <Label>PT Sans Narrow — font-display</Label>
              <p className="font-display text-2xl">Aa Bb Cc — Pizza Night</p>
              <p className="font-display font-bold text-2xl">Bold weight</p>
            </div>

            <div>
              <Label>PT Sans — font-sans (default)</Label>
              <p className="font-sans text-2xl">Aa Bb Cc — Pizza Night</p>
              <p className="font-sans font-bold text-2xl">Bold weight</p>
            </div>

            <div>
              <Label>Size scale</Label>
              <div className="space-y-1">
                {([
                  ['text-2xl',  '1.5rem',   '24px'],
                  ['text-xl',   '1.25rem',  '20px'],
                  ['text-lg',   '1.125rem', '18px'],
                  ['text-base', '1rem',     '16px'],
                  ['text-sm',   '0.875rem', '14px'],
                  ['text-xs',   '0.75rem',  '12px'],
                ] as const).map(([size, rem, px]) => (
                  <div key={size} className="flex items-baseline gap-3">
                    <span className="w-20 text-xs font-mono text-stone-400 shrink-0">{size}</span>
                    <span className="w-16 text-xs font-mono text-stone-300 shrink-0">{rem}</span>
                    <span className="w-10 text-xs font-mono text-stone-300 shrink-0">{px}</span>
                    <span className={size}>The quick brown fox</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Patterns in use</Label>
              <div className="space-y-3 rounded-xl border border-stone-200 bg-white shadow-sm divide-y divide-stone-100">
                <TypographyRow label="Page header">
                  <span className="font-display uppercase tracking-wide text-xl">Pizza Night</span>
                </TypographyRow>
                <TypographyRow label="Section label">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Ingredients</span>
                </TypographyRow>
                <TypographyRow label="Card title">
                  <span className="font-bold text-lg text-gray-900">Margarita</span>
                </TypographyRow>
                <TypographyRow label="Card description">
                  <span className="text-xs text-stone-600 leading-snug">The simplest pizza done right.</span>
                </TypographyRow>
                <TypographyRow label="Body text">
                  <span className="text-sm text-gray-700">Mozzarella (shredded and balled)</span>
                </TypographyRow>
                <TypographyRow label="Muted text">
                  <span className="text-sm text-gray-400">No pizzas on your menu yet.</span>
                </TypographyRow>
                <TypographyRow label="Tab label">
                  <span className="text-xs font-bold tracking-wide text-primary uppercase">Home</span>
                </TypographyRow>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Buttons ──────────────────────────────────────────── */}
        <Section title="Buttons">
          <div className="space-y-4">

            <div>
              <Label>Primary</Label>
              <div className="flex flex-wrap gap-2">
                <button className="bg-primary text-white rounded-lg px-4 py-2 shadow-sm hover:opacity-90 transition-opacity text-sm font-bold">
                  Add to menu
                </button>
                <button disabled className="bg-primary text-white rounded-lg px-4 py-2 shadow-sm text-sm font-bold opacity-50 cursor-not-allowed">
                  Disabled
                </button>
              </div>
            </div>

            <div>
              <Label>Outline / secondary</Label>
              <div className="flex flex-wrap gap-2">
                <button className="border border-stone-300 bg-white rounded-lg px-4 py-2 hover:border-stone-400 text-sm font-bold text-stone-600 transition-colors">
                  Secondary
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-2.5 py-1 text-xs font-bold text-stone-600 hover:border-stone-400 hover:text-stone-800 transition-colors">
                  <ShareIcon />
                  Share ingredients
                </button>
              </div>
            </div>

            <div>
              <Label>Icon button</Label>
              <div className="flex gap-2 items-center">
                <button
                  aria-label="Add to menu"
                  className="w-8 h-8 rounded-full border flex items-center justify-center border-stone-300 text-stone-400 bg-white hover:border-primary hover:text-primary transition-colors"
                >
                  <PlusIcon />
                </button>
                <button
                  aria-label="On menu"
                  className="w-8 h-8 rounded-full border flex items-center justify-center border-primary text-white bg-primary hover:bg-primary/90 transition-colors"
                >
                  <CheckIcon />
                </button>
              </div>
            </div>

            <div>
              <Label>Tab button</Label>
              <div className="flex rounded-xl border border-primary/20 overflow-hidden bg-white">
                <button className="flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-bold tracking-wide bg-primary text-white">
                  Active
                </button>
                <button className="flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-bold tracking-wide text-primary border-l border-primary/20 hover:bg-primary/5">
                  Inactive
                </button>
                <button className="flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-bold tracking-wide text-primary border-l border-primary/20 hover:bg-primary/5">
                  Inactive
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Form Elements ────────────────────────────────────── */}
        <Section title="Form Elements">
          <div className="rounded-xl border border-stone-200 bg-white shadow-sm divide-y divide-stone-100">

            <div className="p-4 space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Text input</label>
              <input
                type="text"
                placeholder="e.g. Margarita"
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50"
              />
            </div>

            <div className="p-4 space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Select</label>
              <select className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 appearance-none">
                <option>NYC</option>
                <option>Detroit</option>
                <option>Focaccia</option>
              </select>
            </div>

            <div className="p-4 space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Number input with unit</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  defaultValue={69}
                  className="w-24 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-right focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50"
                />
                <span className="text-sm text-stone-500">%</span>
              </div>
            </div>

          </div>
        </Section>

        {/* ── Cards ────────────────────────────────────────────── */}
        <Section title="Cards">
          <div className="space-y-3">

            <div>
              <Label>Standard card</Label>
              <div className="rounded-xl border border-stone-200 bg-white shadow-sm hover:border-stone-300 transition-colors p-4">
                <p className="font-bold text-lg text-gray-900">Card title</p>
                <p className="mt-1 text-xs text-stone-600">Supporting description text goes here.</p>
              </div>
            </div>

            <div>
              <Label>Card with section header</Label>
              <div className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-stone-100 bg-stone-50">
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Section heading</p>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-700">Card body content</p>
                </div>
              </div>
            </div>

          </div>
        </Section>

        {/* ── Lists ────────────────────────────────────────────── */}
        <Section title="Lists">
          <div className="space-y-4">

            <div>
              <Label>Bulleted (app style)</Label>
              <ul className="space-y-1.5">
                {['Mozzarella (shredded and balled)', 'Basil', 'Fresh garlic'].map((item) => (
                  <li key={item} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-stone-300 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Label>Bulleted (standard)</Label>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>Mozzarella (shredded and balled)</li>
                <li>Basil</li>
                <li>Fresh garlic</li>
              </ul>
            </div>

            <div>
              <Label>Ordered</Label>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                <li>Preheat pizza steel for 1 hour at 500°F</li>
                <li>Bring dough to room temperature</li>
                <li>Stretch dough into 14-inch rounds</li>
                <li>Add toppings and bake 4 minutes, turn, bake 3 more</li>
              </ol>
            </div>

          </div>
        </Section>

        {/* ── Patterns ─────────────────────────────────────────── */}
        <Section title="Patterns">
          <div className="space-y-4">

            <div>
              <Label>Checker strip</Label>
              <div className="checker-strip rounded" />
            </div>

            <div>
              <Label>App header + checker strip</Label>
              <div className="rounded-xl overflow-hidden shadow-sm border border-stone-200">
                <div className="bg-primary text-white px-4 py-3 text-center">
                  <p className="font-display uppercase tracking-wide text-xl">Pizza Night</p>
                </div>
                <div className="checker-strip" aria-hidden />
              </div>
            </div>

            <div>
              <Label>Tab bar</Label>
              <nav className="flex border border-primary/20 rounded-xl overflow-hidden bg-white shadow-sm">
                {['Home', 'Crust', 'Toppings', 'Sauce'].map((tab, i) => (
                  <button
                    key={tab}
                    className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-bold tracking-wide transition-colors ${
                      i > 0 ? 'border-l border-primary/20' : ''
                    } ${
                      i === 0 ? 'bg-primary text-white' : 'text-primary hover:bg-primary/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

          </div>
        </Section>

        {/* ── ComboCard Component ───────────────────────────────── */}
        <Section title="ComboCard Component">
          <ComboCard
            combo={sampleCombo}
            isExpanded={true}
            copied={false}
            onToggleExpand={() => {}}
            onToggleMenu={() => {}}
            onShare={() => {}}
            onIngredientLink={() => {}}
          />
        </Section>

      </main>
    </div>
  )
}

// ── Section layout helpers ─────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 font-display">{title}</p>
      {children}
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">{children}</p>
  )
}

function SwatchGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-stone-400 mb-2">{label}</p>
      <div className="flex flex-wrap gap-4">{children}</div>
    </div>
  )
}

function Swatch({ bg, name, detail, darkText }: { bg: string; name: string; detail?: string; darkText?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`w-12 h-12 rounded-lg shadow-sm ${bg}`} />
      <span className="text-xs font-mono text-stone-500 text-center leading-tight">{name}</span>
      {detail && <span className="text-xs font-mono text-stone-400">{detail}</span>}
    </div>
  )
}

function TypographyRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="w-32 text-xs font-mono text-stone-400 shrink-0">{label}</span>
      <div>{children}</div>
    </div>
  )
}

// ── Inline icons (same SVG patterns used in the app) ──────────────────────────

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  )
}

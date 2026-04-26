import type { IngredientRef, ToppingCombo } from '@/data/pizzaData'

export function isSauceRef(ing: IngredientRef): ing is { label: string; sauceId: string } {
  return typeof ing === 'object' && ing !== null
}

export function ingLabel(ing: IngredientRef): string {
  return isSauceRef(ing) ? ing.label : ing
}

export function formatComboText(combo: ToppingCombo): string {
  const lines = [combo.name, '']
  lines.push(...combo.ingredients.map((ing) => `• ${ingLabel(ing)}`))
  if (combo.finishWith && combo.finishWith.length > 0) {
    lines.push('', 'Finish with:')
    lines.push(...combo.finishWith.map((ing) => `• ${ingLabel(ing)}`))
  }
  return lines.join('\n')
}

export type ShareResult = { kind: 'shared' } | { kind: 'copied' }

export async function shareCombo(combo: ToppingCombo): Promise<ShareResult> {
  const text = formatComboText(combo)
  if (navigator.share) {
    await navigator.share({ title: combo.name, text })
    return { kind: 'shared' }
  }
  await navigator.clipboard.writeText(text)
  return { kind: 'copied' }
}

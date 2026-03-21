// ─── Types ───────────────────────────────────────────────────────────────────

export type PizzaStyle = 'NYC' | 'Detroit' | 'Focaccia' | 'Calzone' | 'Grilled' | 'Grandma'

export type IngredientRef =
  | string
  | { label: string; sauceId: string }

export interface StyleData {
  name: PizzaStyle
  waterPct: number       // e.g. 0.71
  maltOrSugarPct: number // e.g. 0.02
  doughBallGrams: number
  instructions: string
}

export interface SauceIngredient {
  name: string
  amount: string
  grams?: string
}

export interface Sauce {
  id: string
  name: string
  ingredients: SauceIngredient[]
  instructions: string
  notes?: string
}

export interface ToppingCombo {
  id: string
  name: string
  ingredients: IngredientRef[]
}

export interface SpecialRecipe {
  id: string
  name: string
  sections: { heading?: string; items: string[] }[]
}

// ─── Pizza Styles ─────────────────────────────────────────────────────────────

// Static baker's percentages (same for all styles):
//   Flour: 100%, Yeast: 1%, Salt: 2%, Olive Oil: 1%
export const STATIC_BAKERS: Record<string, number> = {
  flour: 1.0,
  yeast: 0.01,
  salt: 0.02,
  oliveOil: 0.01,
}

export const PIZZA_STYLES: StyleData[] = [
  {
    name: 'NYC',
    waterPct: 0.69,
    maltOrSugarPct: 0.02,
    doughBallGrams: 385,
    instructions:
      '500 degrees. Makes 14 inch pizzas. Bake 4 mins, turn, 3 mins or until crispy.',
  },
  {
    name: 'Detroit',
    waterPct: 0.71,
    maltOrSugarPct: 0.02,
    doughBallGrams: 640,
    instructions:
      '500 degrees. Rise in oiled Detroit Steel pan 1 hour. Push to corners and let rise another 1 hour. Add half the cheese and bake 5 mins. Add the rest of the cheese and toppings. Bake 5 mins, turn, 4 minutes or until cheese is dark and crispy.',
  },
  {
    name: 'Focaccia',
    waterPct: 0.70,
    maltOrSugarPct: 0.02,
    doughBallGrams: 1000,
    instructions:
      '450 degrees. Rise in oiled cookie sheet pan 30 min. Push to corners and let rise 1.5 - 2 hours. Parbake 7 mins, turn, 7 mins until top is brown. Take off pan and rest 30 minutes. Put on toppings. Bake 7 mins, turn, 6 mins or until done.',
  },
  {
    name: 'Calzone',
    waterPct: 0.67,
    maltOrSugarPct: 0.02,
    doughBallGrams: 230,
    instructions:
      '500 degrees. Makes 10 inch rounds. Bake 4 mins, turn, 3 mins or until crispy.',
  },
  {
    name: 'Grilled',
    waterPct: 0.62,
    maltOrSugarPct: 0.01,
    doughBallGrams: 385,
    instructions:
      'Get Grill up to 500 degrees. Use a pizza screen directly on grill top. Cheese on first. Sauce on next. Bake 4 mins, turn, 4 mins or until done.',
  },
  {
    name: 'Grandma',
    waterPct: 0.70,
    maltOrSugarPct: 0.02,
    doughBallGrams: 810,
    instructions:
      '500 degrees. Rise in oiled cookie sheet pan 30 min. Push to corners and let rise 1 hour. Top pizza and bake for 8 mins, turn, 7 mins until done.',
  },
]

// ─── Sauces ───────────────────────────────────────────────────────────────────

export const SAUCES: Sauce[] = [
  {
    id: 'nyc',
    name: 'NYC Sauce',
    ingredients: [
      { name: 'Whole Peeled Tomatoes', amount: '28 oz' },
      { name: 'Salt (Fine Sea)', amount: '½ tsp', grams: '2.85g' },
      { name: 'Sugar', amount: '2 tsp', grams: '6.95g' },
      { name: 'Oregano', amount: '2 tsp', grams: '5.72g' },
    ],
    instructions: 'Add all ingredients to a blender and puree thoroughly.',
    notes: 'Spoon 2/3 cup on 14in pizza.',
  },
  {
    id: 'detroit',
    name: 'Detroit Sauce',
    ingredients: [
      { name: 'Whole Peeled Tomatoes', amount: '28 oz' },
      { name: 'Salt (Fine Sea)', amount: '½ tsp', grams: '2.85g' },
      { name: 'Oregano', amount: '2 tsp', grams: '5.72g' },
    ],
    instructions:
      'Add all ingredients to a blender and puree thoroughly and cook for 20 minutes.',
  },
  {
    id: 'grandma',
    name: 'Grandma Sauce',
    ingredients: [
      { name: 'Hand Crushed Tomatoes', amount: '28 oz' },
      { name: 'Salt (Fine Sea)', amount: '½ tsp', grams: '2.85g' },
      { name: 'Garlic', amount: '1½ tsp', grams: '4.50g' },
      { name: 'Oregano', amount: '2 tsp', grams: '5.72g' },
      { name: 'Black Pepper', amount: 'Pinch' },
    ],
    instructions:
      'Add all ingredients and mix. Keep some larger chunks of tomatoes.',
  },
]

// ─── Topping Combos ───────────────────────────────────────────────────────────

export const TOPPING_COMBOS: ToppingCombo[] = [
  {
    id: 'classic-cheese',
    name: 'Classic Cheese',
    ingredients: [
      'Standard cheese',
      'Mozzarella',
      'Fontina',
      'Basic tomato sauce (add basil if cheese only)',
    ],
  },
  {
    id: 'salami',
    name: 'Salami',
    ingredients: ['Salami', 'Rosemary', 'Standard cheese', 'Hot chilli peppers'],
  },
  {
    id: 'chicken-bacon-ranch',
    name: 'Chicken Bacon Ranch',
    ingredients: ['Chicken', 'Bacon', 'Ranch', 'Tomato', 'Green onion'],
  },
  {
    id: 'hawaiian',
    name: 'Hawaiian',
    ingredients: ['Ham', 'Pineapple', 'Minced jalapeño', 'Standard cheese'],
  },
  {
    id: 'margarita',
    name: 'Margarita',
    ingredients: [
      'Basic tomato sauce',
      'Mozzarella (shredded and balled)',
      'Basil',
      'Balsamic drizzle',
    ],
  },
  {
    id: 'dubliner',
    name: 'Dubliner',
    ingredients: [
      'Corned beef',
      { label: 'Coleslaw', sauceId: 'coleslaw' },
      'Thousand island dressing',
      'Mozzarella',
      'Fontina or Dubliner cheese',
    ],
  },
  {
    id: 'taco-pizza',
    name: 'Taco Pizza',
    ingredients: [
      'Taco seasoned ground beef',
      'Chipotle ranch sauce',
      'Tomato',
      'Green onion',
      'Olive',
      'Cheddar and mozzarella',
      'Lettuce',
      'Sour cream dip',
    ],
  },
  {
    id: 'brick-corner-margarita',
    name: 'Brick Corner Margarita',
    ingredients: [
      { label: 'Detroit sauce', sauceId: 'detroit' },
      'Balsamic drizzle',
      'Sharp cheese and mozzarella blend',
      { label: 'Whipped basil ricotta', sauceId: 'whipped-ricotta' },
      { label: 'Tossed arugula', sauceId: 'arugula-salad' },
      'Whole tomatoes',
    ],
  },
]

// ─── Special Topping Recipes ──────────────────────────────────────────────────

export const SPECIAL_RECIPES: SpecialRecipe[] = [
  {
    id: 'whipped-ricotta',
    name: 'Whipped Basil Ricotta',
    sections: [
      {
        items: [
          '1 cup whole-milk ricotta cheese',
          '1 tbsp fresh basil leaves, chiffonade',
          '½ tsp sea salt',
          '¼ tsp garlic powder',
          '⅛ tsp ground black pepper',
          '⅛ tsp crushed red pepper flakes',
        ],
      },
    ],
  },
  {
    id: 'coleslaw',
    name: 'Coleslaw',
    sections: [
      {
        heading: 'Dressing',
        items: [
          '3 tbsp mayo',
          '2 tbsp sugar',
          '2 tbsp white vinegar',
          '2 tbsp buttermilk',
          '1 tsp lemon juice',
          'Salt and pepper to taste',
        ],
      },
      {
        heading: 'Slaw',
        items: [
          '1 cup shredded green cabbage',
          '2 tbsp peeled shredded carrots',
          '1 tbsp thinly sliced red onion',
          '2 tsp chopped peppadew pepper',
        ],
      },
    ],
  },
  {
    id: 'arugula-salad',
    name: 'Arugula Salad',
    sections: [
      {
        items: ['Arugula', 'Olive oil', 'Red wine vinegar', 'Salt and pepper to taste'],
      },
    ],
  },
]

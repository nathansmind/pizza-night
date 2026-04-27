// ─── Types ───────────────────────────────────────────────────────────────────

export type PizzaStyle = 'NYC' | 'Detroit' | 'Focaccia' | 'Calzone' | 'Grilled' | 'Grandma'

export type IngredientRef =
  | string
  | { label: string; sauceId: string }

export interface StyleData {
  name: PizzaStyle
  waterPct: number       // e.g. 0.71
  maltOrSugarPct: number // e.g. 0.02
  oliveOilPct: number    // e.g. 0.01
  doughBallGrams: number
  instructions: string
}

export interface SauceIngredient {
  name: string
  tspPer28oz?: number   // scalable: tsp amount at 28oz base
  gramsPerTsp?: number  // scalable: grams per tsp
  fixedAmount?: string  // non-scalable display text (e.g. "oz" for tomatoes, "Pinch")
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
  styles: ('NYC' | 'Grilled' | 'Detroit' | 'Calzone')[]
  ingredients: IngredientRef[]
  finishWith?: IngredientRef[]
  description?: string
  image?: string
}

export interface SpecialRecipe {
  id: string
  name: string
  sections: { heading?: string; items: string[] }[]
}

// ─── Pizza Styles ─────────────────────────────────────────────────────────────

// Static baker's percentages (same for all styles):
//   Flour: 100%, Yeast: 1%, Salt: 2%
export const STATIC_BAKERS: Record<string, number> = {
  flour: 1.0,
  yeast: 0.01,
  salt: 0.02,
}

export const PIZZA_STYLES: StyleData[] = [
  {
    name: 'NYC',
    waterPct: 0.69,
    maltOrSugarPct: 0.02,
    oliveOilPct: 0,
    doughBallGrams: 385,
    instructions:
      'Preheat pizza steel for 1 hour at 500 degrees. Bring dough to room temperature (about 1 hour). Stretch dough into 14-inch pizzas. Add toppings. **Bake 4 minutes, turn, bake another 3 minutes or until crispy.**',
  },
  {
    name: 'Detroit',
    waterPct: 0.71,
    maltOrSugarPct: 0.02,
    oliveOilPct: 0,
    doughBallGrams: 640,
    instructions:
      'Remove dough from refrigerator and bring to room temperature (about 1 hour). Transfer to oiled Detroit Steel pan and spread dough (don\'t over-stretch — you will come back later). Let rise for 30 minutes. Push to corners and let rise another 1 hour. **Add half the cheese and bake 5 minutes. Add the rest of the cheese and toppings. Bake 5 minutes, turn, bake another 4 minutes or until cheese is dark and crispy.** Remove from pan immediately and transfer to a cooling rack.\n\nNote: Every pan and oven is a little different. You will need to test yours to get it to cook just right.',
  },
  {
    name: 'Focaccia',
    waterPct: 0.71,
    maltOrSugarPct: 0.02,
    oliveOilPct: 0,
    doughBallGrams: 1000,
    instructions:
      'Remove dough from refrigerator and bring to room temperature (about 1 hour). Transfer to oiled sheet pan and spread dough (don\'t over-stretch — you will come back later). Let rise for 30 minutes. Preheat pizza steel for 1 hour at 450 degrees. Push to corners and let rise another 1.5–2 hours. **Parbake 7 minutes, turn, bake for another 7 minutes until top is brown.** Remove from pan and rest 30 minutes. Add toppings. **Bake 7 minutes, turn, bake another 6 minutes or until done.**\n\nNote: Every pan and oven is a little different. You will need to test yours to get it to cook just right.',
  },
  {
    name: 'Calzone',
    waterPct: 0.67,
    maltOrSugarPct: 0.02,
    oliveOilPct: 0,
    doughBallGrams: 190,
    instructions:
      'Preheat pizza steel for 1 hour at 500 degrees. Bring dough to room temperature (about 1 hour). Stretch dough into 8–10 inch rounds. Add filling to one half, fold over the other half, and pinch them together. **Bake 4 minutes, turn, bake another 3 minutes or until crispy.**',
  },
  {
    name: 'Grilled',
    waterPct: 0.62,
    maltOrSugarPct: 0.01,
    oliveOilPct: 0,
    doughBallGrams: 385,
    instructions:
      'Bring dough to room temperature (about 1 hour). Preheat grill to 500 degrees. Stretch dough and place directly onto a pizza screen. Add cheese first, sauce next. **Bake directly on grill 4 minutes, turn, bake another 4 minutes or until done.**',
  },
  {
    name: 'Grandma',
    waterPct: 0.70,
    maltOrSugarPct: 0.02,
    oliveOilPct: 0,
    doughBallGrams: 810,
    instructions:
      'Remove dough from refrigerator and bring to room temperature (about 1 hour). Transfer to oiled sheet pan and spread dough (don\'t over-stretch — you will come back later). Let rise for 30 minutes. Preheat pizza steel for 1 hour at 500 degrees. Push dough to corners and let rise another 1 hour. **Top pizza and bake for 8 minutes, turn, bake another 7 minutes until done.**',
  },
]

// ─── Sauces ───────────────────────────────────────────────────────────────────

export const SAUCES: Sauce[] = [
  {
    id: 'nyc',
    name: 'NYC Sauce',
    ingredients: [
      { name: 'Cento Whole Peeled Tomatoes', fixedAmount: 'oz' },
      { name: 'Salt (Fine Sea)', tspPer28oz: 0.5, gramsPerTsp: 5.69 },
      { name: 'Sugar', tspPer28oz: 2.0, gramsPerTsp: 3.474889723783 },
      { name: 'Oregano', tspPer28oz: 2.0, gramsPerTsp: 2.858774524531 },
    ],
    instructions: 'Add all ingredients to a blender and puree thoroughly.',
    notes: 'Spoon 2/3 cup on 14in pizza.',
  },
  {
    id: 'detroit',
    name: 'Detroit Sauce',
    ingredients: [
      { name: 'Cento Whole Peeled Tomatoes', fixedAmount: 'oz' },
      { name: 'Salt (Fine Sea)', tspPer28oz: 0.5, gramsPerTsp: 5.69 },
      { name: 'Oregano', tspPer28oz: 2.0, gramsPerTsp: 2.858774524531 },
    ],
    instructions:
      'Add all ingredients to a blender and puree thoroughly and cook for 20 minutes.',
  },
  {
    id: 'grandma',
    name: 'Grandma Sauce',
    ingredients: [
      { name: 'Cento Crushed Tomatoes', fixedAmount: 'oz' },
      { name: 'Salt (Fine Sea)', tspPer28oz: 0.5, gramsPerTsp: 5.69 },
      { name: 'Garlic', tspPer28oz: 1.5, gramsPerTsp: 3.0 },
      { name: 'Oregano', tspPer28oz: 2.0, gramsPerTsp: 2.858774524531 },
      { name: 'Black Pepper', fixedAmount: 'Pinch' },
    ],
    instructions:
      'Add all ingredients and mix. Keep some larger chunks of tomatoes.',
  },
]

// ─── Topping Combos ───────────────────────────────────────────────────────────

export const TOPPING_COMBOS: ToppingCombo[] = [
  {
    id: 'classic-cheese',
    name: 'Three Cheese',
    styles: ['NYC', 'Grilled'],
    image: '/toppings/classic-cheese.png',
    description:
      'A clean trio of mozzarella, fontina, and a finishing snow of parmesan over bright NYC sauce. Basil keeps it summery.',
    ingredients: [
      { label: 'NYC Sauce', sauceId: 'nyc' },
      'Half Mozzarella Half Fontina',
    ],
    finishWith: ['Parmesan', 'Basil'],
  },
  {
    id: 'salami',
    name: 'Rosemary Salami',
    styles: ['NYC', 'Grilled'],
    description:
      'Salami curls up into little cups, rosemary perfumes the crust, and hot chilis bring the heat.',
    ingredients: [
      { label: 'NYC Sauce', sauceId: 'nyc' },
      'Half Mozzarella Half Fontina',
      'Salami',
      'Rosemary',
      'Hot chilli peppers',
    ],
  },
  {
    id: 'chicken-bacon-ranch',
    name: 'Chicken Bacon Ranch',
    styles: ['NYC', 'Grilled'],
    image: '/toppings/chicken-bacon-ranch.png',
    description:
      'Cool ranch instead of red sauce, with chicken, bacon, fresh tomato, and green onion piled on melty mozzarella-fontina.',
    ingredients: [
      'Ranch Dressing',
      'Half Mozzarella Half Fontina',
      'Chicken',
      'Bacon',
      'Diced Tomato',
      'Green onion',
    ],
  },
  {
    id: 'hawaiian',
    name: 'Hawaiian NYC Sauce',
    styles: ['NYC', 'Grilled'],
    description:
      'Sweet pineapple and salty ham over NYC sauce, with a flick of jalapeño to keep it interesting.',
    ingredients: [
      { label: 'NYC Sauce', sauceId: 'nyc' },
      'Half Mozzarella Half Fontina',
      'Ham cubes',
      'Diced Pineapple',
      'Minced jalapeño',
    ],
  },
  {
    id: 'margarita',
    name: 'Margarita',
    styles: ['NYC', 'Grilled'],
    description:
      'The simplest pizza done right — fresh mozzarella, basil, NYC sauce, finished with a balsamic drizzle.',
    ingredients: [
      { label: 'NYC Sauce', sauceId: 'nyc' },
      'Mozzarella (shredded and balled)',
      'Basil',
    ],
    finishWith: ['Balsamic drizzle'],
  },
  {
    id: 'dubliner',
    name: 'Dubliner',
    styles: ['NYC', 'Grilled'],
    description:
      'A reuben in pizza form: thousand island, dubliner cheese, corned beef, and a tangle of coleslaw on top after baking.',
    ingredients: [
      'Thousand island dressing',
      'Half Mozzarella Half Fontina or Dubliner cheese',
      'Corned beef',
    ],
    finishWith: [{ label: 'Coleslaw', sauceId: 'coleslaw' }],
  },
  {
    id: 'taco-pizza',
    name: 'Taco Pizza',
    styles: ['NYC', 'Grilled'],
    description:
      'Chipotle ranch, taco-seasoned beef, and a melty cheddar-mozz blend, with crisp lettuce and sour-cream dip on the side.',
    ingredients: [
      'Chipotle Ranch Dressing',
      'Half Cheddar Half Mozzarella',
      'Taco seasoned ground beef',
      'Tomato',
      'Green onion',
      'Olive',
    ],
    finishWith: ['Lettuce', 'Sour cream dip'],
  },
  {
    id: 'brick-corner-margarita',
    name: 'Brick Corner Margarita',
    styles: ['Detroit'],
    description:
      'A brick-corner Detroit with cheddar-mozz, sliced tomatoes, balsamic, and a cool spoonful of whipped basil ricotta on top.',
    ingredients: [
      { label: 'Detroit sauce', sauceId: 'detroit' },
      'Half Medium Cheddar Half Mozzarella',
      'Sliced tomatoes',
    ],
    finishWith: [
      'Balsamic drizzle',
      { label: 'Tossed arugula', sauceId: 'arugula-salad' },
      { label: 'Whipped basil ricotta', sauceId: 'whipped-ricotta' },
    ],
  },
  {
    id: 'detroit-classic-pep',
    name: 'Detroit Classic Pep',
    styles: ['Detroit'],
    description:
      'Crisp-edged Detroit-style square with cup-and-char pepperoni and a thick bed of cheddar and mozzarella.',
    ingredients: [
      { label: 'Detroit sauce', sauceId: 'detroit' },
      'Half Medium Cheddar Half Mozzarella',
      'Pepperonis',
    ],
  },
  {
    id: 'classic-pepperoni',
    name: 'Classic Pepperoni',
    styles: ['NYC', 'Grilled'],
    description:
      'The undefeated classic — NYC sauce, mozzarella-fontina, and curling cup-and-char pepperoni, finished with parmesan.',
    ingredients: [
      { label: 'NYC Sauce', sauceId: 'nyc' },
      'Half Mozzarella Half Fontina',
      'Pepperonis',
    ],
    finishWith: ['Parmesan'],
  },
  {
    id: 'meatball-calzone',
    name: 'Meatball Calzone',
    styles: ['Calzone'],
    description:
      'Tender meatballs and melted mozzarella inside a golden folded crust, with a side of marinara for dipping.',
    ingredients: [
      'Mozzarella',
      'Meatballs',
    ],
    finishWith: ['Salt', 'Oregano', 'Marinara dip'],
  },
  {
    id: 'spinach-pepperoni-calzone',
    name: 'Spinach Pepperoni Calzone',
    styles: ['Calzone'],
    description:
      'Spinach, diced tomatoes, and pepperoni inside the calzone — a lighter take, finished with salt and oregano.',
    ingredients: [
      'Mozzarella',
      'Spinach',
      'Diced tomatoes',
      'Pepperonis',
    ],
    finishWith: ['Salt', 'Oregano'],
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

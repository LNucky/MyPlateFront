export interface Dish {
  id: string
  name: string
  price: number
  emoji: string
  cookTime: string
  ingredients: string[]
  recipe: string
}

export interface DayMeals {
  breakfast: Dish | null
  lunch: Dish | null
  dinner: Dish | null
}

export interface MealPlan {
  monday: DayMeals
  tuesday: DayMeals
  wednesday: DayMeals
  thursday: DayMeals
  friday: DayMeals
  saturday: DayMeals
  sunday: DayMeals
}

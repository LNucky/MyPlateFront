"use client"

import { useState } from "react"
import { BudgetInput } from "@/components/budget-input"
import { WeeklyPlanner } from "@/components/weekly-planner"
import { DishModal } from "@/components/dish-modal"
import { dishes } from "@/lib/dishes-data"
import type { Dish, MealPlan } from "@/lib/types"

export default function Home() {
  const [budget, setBudget] = useState<number>(5000)
  const [mealPlan, setMealPlan] = useState<MealPlan>({
    monday: { breakfast: null, lunch: null, dinner: null },
    tuesday: { breakfast: null, lunch: null, dinner: null },
    wednesday: { breakfast: null, lunch: null, dinner: null },
    thursday: { breakfast: null, lunch: null, dinner: null },
    friday: { breakfast: null, lunch: null, dinner: null },
    saturday: { breakfast: null, lunch: null, dinner: null },
    sunday: { breakfast: null, lunch: null, dinner: null },
  })
  const [selectedMeal, setSelectedMeal] = useState<{
    day: string
    mealType: "breakfast" | "lunch" | "dinner"
  } | null>(null)

  const calculateTotalCost = () => {
    let total = 0
    Object.values(mealPlan).forEach((day) => {
      if (day.breakfast) total += day.breakfast.price
      if (day.lunch) total += day.lunch.price
      if (day.dinner) total += day.dinner.price
    })
    return total
  }

  const handleMealSelect = (dish: Dish) => {
    if (selectedMeal) {
      setMealPlan((prev) => ({
        ...prev,
        [selectedMeal.day]: {
          ...prev[selectedMeal.day as keyof MealPlan],
          [selectedMeal.mealType]: dish,
        },
      }))
      setSelectedMeal(null)
    }
  }

  const totalCost = calculateTotalCost()
  const isOverBudget = totalCost > budget

  return (
    <main className="min-h-screen bg-background pb-8">
      <div className="mx-auto max-w-md px-4 pt-6">
        <h1 className="mb-6 text-center text-2xl font-bold text-foreground">Планировщик меню</h1>

        <BudgetInput budget={budget} totalCost={totalCost} isOverBudget={isOverBudget} onBudgetChange={setBudget} />

        <WeeklyPlanner mealPlan={mealPlan} onMealClick={(day, mealType) => setSelectedMeal({ day, mealType })} />
      </div>

      <DishModal
        isOpen={selectedMeal !== null}
        onClose={() => setSelectedMeal(null)}
        dishes={dishes}
        onSelectDish={handleMealSelect}
      />
    </main>
  )
}

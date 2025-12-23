"use client"

import { Card } from "@/components/ui/card"
import { MealSlot } from "@/components/meal-slot"
import type { DayMeals } from "@/lib/types"

interface DayCardProps {
  day: string
  label: string
  meals: DayMeals
  onMealClick: (day: string, mealType: "breakfast" | "lunch" | "dinner") => void
}

export function DayCard({ day, label, meals, onMealClick }: DayCardProps) {
  return (
    <Card className="w-[calc(100vw-3rem)] min-w-[280px] max-w-[320px] flex-shrink-0 snap-center p-4">
      <h2 className="mb-4 text-center text-lg font-semibold text-foreground">{label}</h2>

      <div className="space-y-3">
        <MealSlot label="Завтрак" dish={meals.breakfast} onClick={() => onMealClick(day, "breakfast")} />
        <MealSlot label="Обед" dish={meals.lunch} onClick={() => onMealClick(day, "lunch")} />
        <MealSlot label="Ужин" dish={meals.dinner} onClick={() => onMealClick(day, "dinner")} />
      </div>
    </Card>
  )
}

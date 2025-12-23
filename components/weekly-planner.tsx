"use client"

import { useRef } from "react"
import { DayCard } from "@/components/day-card"
import type { MealPlan } from "@/lib/types"

interface WeeklyPlannerProps {
  mealPlan: MealPlan
  onMealClick: (day: string, mealType: "breakfast" | "lunch" | "dinner") => void
}

const DAYS = [
  { key: "monday", label: "Понедельник" },
  { key: "tuesday", label: "Вторник" },
  { key: "wednesday", label: "Среда" },
  { key: "thursday", label: "Четверг" },
  { key: "friday", label: "Пятница" },
  { key: "saturday", label: "Суббота" },
  { key: "sunday", label: "Воскресенье" },
]

export function WeeklyPlanner({ mealPlan, onMealClick }: WeeklyPlannerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {DAYS.map((day) => (
          <DayCard
            key={day.key}
            day={day.key}
            label={day.label}
            meals={mealPlan[day.key as keyof MealPlan]}
            onMealClick={onMealClick}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-1.5">
        {DAYS.map((day, index) => (
          <button
            key={day.key}
            onClick={() => {
              const scrollContainer = scrollRef.current
              if (scrollContainer) {
                const cardWidth = scrollContainer.scrollWidth / DAYS.length
                scrollContainer.scrollTo({
                  left: cardWidth * index,
                  behavior: "smooth",
                })
              }
            }}
            className="h-1.5 w-1.5 rounded-full bg-muted transition-colors hover:bg-primary"
            aria-label={`Перейти к ${day.label}`}
          />
        ))}
      </div>
    </div>
  )
}

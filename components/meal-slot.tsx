"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { Dish } from "@/lib/types"

interface MealSlotProps {
  label: string
  dish: Dish | null
  onClick: () => void
}

export function MealSlot({ label, dish, onClick }: MealSlotProps) {
  return (
    <Button variant="outline" className="h-auto w-full justify-start p-3 text-left bg-transparent" onClick={onClick}>
      <div className="flex w-full items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
          {dish ? <span className="text-xl">{dish.emoji}</span> : <Plus className="h-5 w-5 text-muted-foreground" />}
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          {dish ? (
            <>
              <p className="truncate font-medium text-foreground">{dish.name}</p>
              <p className="text-sm text-primary">{dish.price} ₽</p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Выбрать блюдо</p>
          )}
        </div>
      </div>
    </Button>
  )
}

"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface BudgetInputProps {
  budget: number
  totalCost: number
  isOverBudget: boolean
  onBudgetChange: (value: number) => void
}

export function BudgetInput({ budget, totalCost, isOverBudget, onBudgetChange }: BudgetInputProps) {
  return (
    <Card className={cn("mb-6 p-4 transition-colors", isOverBudget && "border-destructive bg-destructive/5")}>
      <div className="space-y-3">
        <div>
          <Label htmlFor="budget" className="text-sm font-medium">
            Бюджет на неделю
          </Label>
          <div className="relative mt-1.5">
            <Input
              id="budget"
              type="number"
              value={budget}
              onChange={(e) => onBudgetChange(Number(e.target.value))}
              className={cn(
                "pr-12 text-lg font-semibold",
                isOverBudget && "border-destructive focus-visible:ring-destructive",
              )}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₽</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-sm text-muted-foreground">Потрачено:</span>
          <span className={cn("text-lg font-bold", isOverBudget ? "text-destructive" : "text-primary")}>
            {totalCost.toFixed(2)} ₽
          </span>
        </div>

        {isOverBudget && (
          <p className="text-sm text-destructive">Превышение бюджета на {(totalCost - budget).toFixed(2)} ₽</p>
        )}
      </div>
    </Card>
  )
}

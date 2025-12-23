"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft } from "lucide-react"
import type { Dish } from "@/lib/types"

interface DishModalProps {
  isOpen: boolean
  onClose: () => void
  dishes: Dish[]
  onSelectDish: (dish: Dish) => void
}

export function DishModal({ isOpen, onClose, dishes, onSelectDish }: DishModalProps) {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)

  const handleBack = () => {
    setSelectedDish(null)
  }

  const handleSelectDish = (dish: Dish) => {
    setSelectedDish(dish)
  }

  const handleConfirm = () => {
    if (selectedDish) {
      onSelectDish(selectedDish)
      setSelectedDish(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {selectedDish && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBack}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            {selectedDish ? selectedDish.name : "Выберите блюдо"}
          </DialogTitle>
        </DialogHeader>

        {selectedDish ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-secondary text-4xl">
                {selectedDish.emoji}
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{selectedDish.price} ₽</p>
                <p className="text-sm text-muted-foreground">{selectedDish.cookTime}</p>
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-foreground">Ингредиенты:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {selectedDish.ingredients.map((ingredient, index) => (
                  <li key={index}>• {ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-foreground">Как готовить:</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{selectedDish.recipe}</p>
            </div>

            <Button onClick={handleConfirm} className="w-full" size="lg">
              Выбрать это блюдо
            </Button>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-2">
              {dishes.map((dish) => (
                <Card
                  key={dish.id}
                  className="cursor-pointer p-3 transition-colors hover:bg-accent"
                  onClick={() => handleSelectDish(dish)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-secondary text-2xl">
                      {dish.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{dish.name}</p>
                      <p className="text-sm text-muted-foreground">{dish.cookTime}</p>
                    </div>
                    <p className="font-semibold text-primary">{dish.price} ₽</p>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  )
}

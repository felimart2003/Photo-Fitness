'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"

interface FoodItem {
  name: string
  calories: number
  carbs: number
  protein: number
  fat: number
}

interface AddFoodItemFormProps {
  onAddItem: (item: FoodItem) => void
}

export function AddFoodItemForm({ onAddItem }: AddFoodItemFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newItem, setNewItem] = useState<FoodItem>({
    name: '',
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewItem(prev => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddItem(newItem)
    setNewItem({ name: '', calories: 0, carbs: 0, protein: 0, fat: 0 })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Food Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Food Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="calories">Calories</Label>
            <Input
              id="calories"
              name="calories"
              type="number"
              value={newItem.calories}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="carbs">Carbs (g)</Label>
            <Input
              id="carbs"
              name="carbs"
              type="number"
              value={newItem.carbs}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="protein">Protein (g)</Label>
            <Input
              id="protein"
              name="protein"
              type="number"
              value={newItem.protein}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="fat">Fat (g)</Label>
            <Input
              id="fat"
              name="fat"
              type="number"
              value={newItem.fat}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit">Add Item</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
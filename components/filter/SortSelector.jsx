"use client"

import { useState } from "react"
import { ArrowDownAZ, ChevronDown, ChevronUp } from "lucide-react"

export default function SortSelector({ onSortChange, sortOrder }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSortSelect = (order) => {
    onSortChange(order)
    setIsOpen(false)
  }

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
  ]

  const currentOption = sortOptions.find((option) => option.value === sortOrder) || sortOptions[0]

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 border rounded-md bg-background"
      >
        <ArrowDownAZ className="h-4 w-4" />
        <span>{currentOption.label}</span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-48 rounded-md border bg-background shadow-lg">
          {sortOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSortSelect(option.value)}
              className={`px-3 py-2 cursor-pointer hover:bg-accent ${option.value === sortOrder ? "bg-accent/50" : ""}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

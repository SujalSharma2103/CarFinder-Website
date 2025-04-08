"use client"

import { Users } from "lucide-react"

export default function SeatingFilter({ selectedSeating, onSeatingChange }) {
  const seatingOptions = ["2", "4", "5", "6", "7+"]

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <Users className="h-5 w-5 mr-2 text-primary" />
        <h3 className="font-medium">Seating Capacity</h3>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => onSeatingChange("")}
          className={`px-3 py-2 text-sm rounded-md border transition-colors ${
            !selectedSeating ? "bg-primary text-white border-primary" : "bg-background hover:bg-accent"
          }`}
        >
          Any
        </button>

        {seatingOptions.map((option) => (
          <button
            key={option}
            onClick={() => onSeatingChange(option)}
            className={`px-3 py-2 text-sm rounded-md border transition-colors ${
              selectedSeating === option ? "bg-primary text-white border-primary" : "bg-background hover:bg-accent"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

"use client"

import { Fuel } from "lucide-react"

export default function FuelTypeFilter({ selectedFuelType, onFuelTypeChange }) {
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"]

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <Fuel className="h-5 w-5 mr-2 text-primary" />
        <h3 className="font-medium">Fuel Type</h3>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onFuelTypeChange("")}
          className={`px-3 py-2 text-sm rounded-md border transition-colors ${
            !selectedFuelType ? "bg-primary text-white border-primary" : "bg-background hover:bg-accent"
          }`}
        >
          All Types
        </button>

        {fuelTypes.map((type) => (
          <button
            key={type}
            onClick={() => onFuelTypeChange(type)}
            className={`px-3 py-2 text-sm rounded-md border transition-colors ${
              selectedFuelType === type ? "bg-primary text-white border-primary" : "bg-background hover:bg-accent"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  )
}

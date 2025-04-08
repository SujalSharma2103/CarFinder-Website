"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, ChevronUp, Car } from "lucide-react"

export default function BrandFilter({ selectedBrand, onBrandChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [brands, setBrands] = useState([])

  useEffect(() => {
    // In a real app, you would fetch brands from an API
    // For now, we'll use a static list
    setBrands([
      "All Brands",
      "Audi",
      "BMW",
      "Chevrolet",
      "Ferrari",
      "Ford",
      "Honda",
      "Hyundai",
      "Jeep",
      "Kia",
      "Land Rover",
      "Lexus",
      "Mazda",
      "Mercedes-Benz",
      "Nissan",
      "Porsche",
      "Subaru",
      "Tesla",
      "Toyota",
      "Volkswagen",
      "Volvo",
    ])
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleBrandSelect = (brand) => {
    onBrandChange(brand === "All Brands" ? "" : brand)
    setIsOpen(false)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <Car className="h-5 w-5 mr-2 text-primary" />
        <h3 className="font-medium">Brand</h3>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="w-full flex items-center justify-between px-3 py-2 border rounded-md bg-background"
        >
          <span>{selectedBrand || "All Brands"}</span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md border bg-background shadow-lg">
            {brands.map((brand) => (
              <div
                key={brand}
                onClick={() => handleBrandSelect(brand)}
                className={`px-3 py-2 cursor-pointer hover:bg-accent flex items-center justify-between ${
                  (brand === "All Brands" && !selectedBrand) || brand === selectedBrand ? "bg-accent/50" : ""
                }`}
              >
                <span>{brand}</span>
                {((brand === "All Brands" && !selectedBrand) || brand === selectedBrand) && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

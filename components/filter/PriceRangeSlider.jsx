"use client"

import { useState, useEffect } from "react"
import { DollarSign } from "lucide-react"

export default function PriceRangeSlider({ minPrice, maxPrice, onPriceChange }) {
  const [localMinPrice, setLocalMinPrice] = useState(minPrice)
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice)
  const maxPossiblePrice = 1000000

  useEffect(() => {
    setLocalMinPrice(minPrice)
    setLocalMaxPrice(maxPrice)
  }, [minPrice, maxPrice])

  const handleMinPriceChange = (e) => {
    const value = Number.parseInt(e.target.value)
    setLocalMinPrice(value)
    if (value <= localMaxPrice) {
      onPriceChange(value, localMaxPrice)
    }
  }

  const handleMaxPriceChange = (e) => {
    const value = Number.parseInt(e.target.value)
    setLocalMaxPrice(value)
    if (value >= localMinPrice) {
      onPriceChange(localMinPrice, value)
    }
  }

  const getBackgroundSize = (value, min, max) => {
    return { backgroundSize: `${((value - min) * 100) / (max - min)}% 100%` }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <DollarSign className="h-5 w-5 mr-2 text-primary" />
        <h3 className="font-medium">Price Range</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Min Price</span>
            <span>${localMinPrice.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max={maxPossiblePrice}
            value={localMinPrice}
            onChange={handleMinPriceChange}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            style={getBackgroundSize(localMinPrice, 0, maxPossiblePrice)}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Max Price</span>
            <span>${localMaxPrice.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max={maxPossiblePrice}
            value={localMaxPrice}
            onChange={handleMaxPriceChange}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            style={getBackgroundSize(localMaxPrice, 0, maxPossiblePrice)}
          />
        </div>

        <div className="flex justify-between">
          <div className="w-[48%]">
            <input
              type="number"
              min="0"
              max={localMaxPrice}
              value={localMinPrice}
              onChange={handleMinPriceChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Min"
            />
          </div>
          <div className="w-[48%]">
            <input
              type="number"
              min={localMinPrice}
              max={maxPossiblePrice}
              value={localMaxPrice}
              onChange={handleMaxPriceChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

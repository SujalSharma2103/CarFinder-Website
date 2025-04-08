"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import PriceRangeSlider from "./PriceRangeSlider"
import BrandFilter from "./BrandFilter"
import FuelTypeFilter from "./FuelTypeFilter"
import SeatingFilter from "./SeatingFilter"

export default function FilterPanel({ filters, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const togglePanel = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
      <div className="p-4 flex justify-between items-center cursor-pointer lg:cursor-default" onClick={togglePanel}>
        <div className="flex items-center">
          <Filter className="h-5 w-5 mr-2 text-primary" />
          <h2 className="font-semibold">Filters</h2>
        </div>
        <button className="lg:hidden">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4 space-y-6"
          >
            <BrandFilter selectedBrand={filters.brand} onBrandChange={(brand) => onFilterChange({ brand })} />

            <PriceRangeSlider
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              onPriceChange={(minPrice, maxPrice) => onFilterChange({ minPrice, maxPrice })}
            />

            <FuelTypeFilter
              selectedFuelType={filters.fuelType}
              onFuelTypeChange={(fuelType) => onFilterChange({ fuelType })}
            />

            <SeatingFilter
              selectedSeating={filters.seatingCapacity}
              onSeatingChange={(seatingCapacity) => onFilterChange({ seatingCapacity })}
            />

            <button
              onClick={() =>
                onFilterChange({
                  brand: "",
                  minPrice: 0,
                  maxPrice: 1000000,
                  fuelType: "",
                  seatingCapacity: "",
                  search: filters.search,
                })
              }
              className="w-full py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-accent transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout/Layout"
import CarGrid from "@/components/car/CarGrid"
import FilterPanel from "@/components/filter/FilterPanel"
import SearchBar from "@/components/filter/SearchBar"
import Pagination from "@/components/ui/Pagination"
import Loading from "@/components/ui/Loading"
import SortSelector from "@/components/filter/SortSelector"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function Home() {
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    brand: "",
    minPrice: 0,
    maxPrice: 1000000,
    fuelType: "",
    seatingCapacity: "",
    search: "",
  })
  const [sortOrder, setSortOrder] = useState("default")
  const { theme } = useTheme()

  const carsPerPage = 10

  // Fetch cars data
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true)
        // In a real app, you would fetch from an actual API
        const response = await fetch("/api/cars", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error("API Error Response:", errorText)
          throw new Error(`Failed to fetch cars: ${response.status}`)
        }

        const data = await response.json()
        setCars(data)
        setFilteredCars(data)
      } catch (err) {
        console.error("Fetch error:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  // Apply filters
  useEffect(() => {
    let result = [...cars]

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      result = result.filter(
        (car) => car.name.toLowerCase().includes(searchTerm) || car.brand.toLowerCase().includes(searchTerm),
      )
    }

    // Apply brand filter
    if (filters.brand) {
      result = result.filter((car) => car.brand === filters.brand)
    }

    // Apply price range filter
    result = result.filter((car) => car.price >= filters.minPrice && car.price <= filters.maxPrice)

    // Apply fuel type filter
    if (filters.fuelType) {
      result = result.filter((car) => car.fuelType === filters.fuelType)
    }

    // Apply seating capacity filter
    if (filters.seatingCapacity) {
      result = result.filter((car) => car.seatingCapacity === Number.parseInt(filters.seatingCapacity))
    }

    // Apply sorting
    if (sortOrder === "price-low-high") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOrder === "price-high-low") {
      result.sort((a, b) => b.price - a.price)
    }

    setFilteredCars(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [filters, cars, sortOrder])

  // Get current cars for pagination
  const indexOfLastCar = currentPage * carsPerPage
  const indexOfFirstCar = indexOfLastCar - carsPerPage
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  // Handle search
  const handleSearch = (searchTerm) => {
    setFilters({ ...filters, search: searchTerm })
  }

  // Handle sort change
  const handleSortChange = (order) => {
    setSortOrder(order)
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">
            <h2 className="text-2xl font-bold">Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-center mb-2">Find Your Dream Car</h1>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Browse through our extensive collection of cars and find the perfect match for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          </motion.div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4"
            >
              <SearchBar onSearch={handleSearch} />
              <SortSelector onSortChange={handleSortChange} sortOrder={sortOrder} />
            </motion.div>

            {loading ? (
              <Loading />
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <CarGrid cars={currentCars} />
                </motion.div>

                {filteredCars.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-10"
                  >
                    <h3 className="text-xl font-semibold">No cars found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      Try adjusting your filters to find more cars
                    </p>
                  </motion.div>
                )}

                {filteredCars.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-8"
                  >
                    <Pagination
                      carsPerPage={carsPerPage}
                      totalCars={filteredCars.length}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

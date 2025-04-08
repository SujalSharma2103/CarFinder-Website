"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Layout from "@/components/layout/Layout"
import Loading from "@/components/ui/Loading"
import WishlistButton from "@/components/car/WishlistButton"
import { motion } from "framer-motion"
import { ArrowLeft, Fuel, Users, Calendar, Gauge, Zap } from "lucide-react"
import Image from "next/image"

export default function CarDetails() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true)
        // In a real app, you would fetch from an actual API with the car ID
        const response = await fetch(`/api/cars/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error("API Error Response:", errorText)
          throw new Error(`Failed to fetch car details: ${response.status}`)
        }

        const data = await response.json()
        setCar(data)
      } catch (err) {
        console.error("Fetch error:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCarDetails()
    }
  }, [id])

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Loading />
        </div>
      </Layout>
    )
  }

  if (error || !car) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">
            <h2 className="text-2xl font-bold">Error</h2>
            <p>{error || "Car not found"}</p>
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-primary mb-6 hover:underline transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to search results
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src={car.image || "/placeholder.svg"}
              alt={car.name}
              width={800}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="absolute top-4 right-4">
              <WishlistButton car={car} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold">{car.name}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">{car.brand}</p>
            </div>

            <div className="flex items-center">
              <span className="text-3xl font-bold text-primary">${car.price.toLocaleString()}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Fuel className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fuel Type</p>
                  <p className="font-medium">{car.fuelType}</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Users className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Seating</p>
                  <p className="font-medium">{car.seatingCapacity} People</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Year</p>
                  <p className="font-medium">{car.year}</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Gauge className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Mileage</p>
                  <p className="font-medium">{car.mileage} km/l</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Zap className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Power</p>
                  <p className="font-medium">{car.power} HP</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-gray-700 dark:text-gray-300">{car.description}</p>
            </div>

            <div className="pt-4">
              <button className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Contact Seller
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Car Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(car.specifications || {}).map(([key, value]) => (
              <div key={key} className="p-4 border dark:border-gray-700 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400 capitalize">{key.replace(/_/g, " ")}</p>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}

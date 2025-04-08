"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout/Layout"
import CarGrid from "@/components/car/CarGrid"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function Wishlist() {
  const [wishlistCars, setWishlistCars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get wishlist from localStorage
    const getWishlist = () => {
      if (typeof window !== "undefined") {
        const wishlistIds = JSON.parse(localStorage.getItem("wishlist") || "[]")

        // In a real app, you would fetch details for each car in the wishlist
        // For now, we'll simulate this by fetching all cars and filtering
        fetch("/api/cars", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((res) => {
            if (!res.ok) {
              return res.text().then((text) => {
                console.error("API Error Response:", text)
                throw new Error(`Failed to fetch cars: ${res.status}`)
              })
            }
            return res.json()
          })
          .then((allCars) => {
            const wishlistItems = allCars.filter((car) => wishlistIds.includes(car.id))
            setWishlistCars(wishlistItems)
            setLoading(false)
          })
          .catch((err) => {
            console.error("Error fetching wishlist cars:", err)
            setLoading(false)
          })
      }
    }

    getWishlist()

    // Listen for wishlist changes
    window.addEventListener("wishlistUpdated", getWishlist)

    return () => {
      window.removeEventListener("wishlistUpdated", getWishlist)
    }
  }, [])

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-2">Your Wishlist</h1>
          <p className="text-gray-600 dark:text-gray-300">Cars you've saved for later</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {wishlistCars.length > 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <CarGrid cars={wishlistCars} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Start browsing and add cars to your wishlist</p>
                <Link
                  href="/"
                  className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
                >
                  Browse Cars
                </Link>
              </motion.div>
            )}
          </>
        )}
      </div>
    </Layout>
  )
}

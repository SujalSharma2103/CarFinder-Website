"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"

export default function WishlistButton({ car }) {
  const [isInWishlist, setIsInWishlist] = useState(false)

  useEffect(() => {
    // Check if car is in wishlist
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setIsInWishlist(wishlist.includes(car.id))
  }, [car.id])

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    let newWishlist

    if (isInWishlist) {
      // Remove from wishlist
      newWishlist = wishlist.filter((id) => id !== car.id)
    } else {
      // Add to wishlist
      newWishlist = [...wishlist, car.id]
    }

    localStorage.setItem("wishlist", JSON.stringify(newWishlist))
    setIsInWishlist(!isInWishlist)

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("wishlistUpdated"))
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleWishlist}
      className={`flex items-center justify-center rounded-full p-2 transition-colors ${
        isInWishlist
          ? "bg-primary text-white"
          : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-100 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-700"
      }`}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
    </motion.button>
  )
}

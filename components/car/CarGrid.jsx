"use client"

import { motion } from "framer-motion"
import CarCard from "./CarCard"

export default function CarGrid({ cars }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </motion.div>
  )
}

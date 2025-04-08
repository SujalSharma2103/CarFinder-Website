"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Fuel, Users } from "lucide-react"
import WishlistButton from "./WishlistButton"

export default function CarCard({ car }) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={item} className="card-hover bg-card rounded-xl overflow-hidden border shadow-sm">
      <div className="relative">
        <Link href={`/car/${car.id}`}>
          <div className="aspect-[16/9] relative overflow-hidden">
            <Image
              src={car.image || "/placeholder.svg"}
              alt={car.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
        <div className="absolute top-3 right-3">
          <WishlistButton car={car} />
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/car/${car.id}`}>
            <h3 className="text-lg font-semibold hover:text-primary transition-colors line-clamp-1">{car.name}</h3>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{car.brand}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-primary">${car.price.toLocaleString()}</span>
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Fuel className="h-4 w-4 mr-1" />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{car.seatingCapacity}</span>
            </div>
          </div>
        </div>
        <Link
          href={`/car/${car.id}`}
          className="block w-full py-2 text-center bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}

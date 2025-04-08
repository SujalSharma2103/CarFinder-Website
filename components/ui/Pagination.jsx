"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Pagination({ carsPerPage, totalCars, paginate, currentPage }) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalCars / carsPerPage); i++) {
    pageNumbers.push(i)
  }

  // Logic to show limited page numbers with ellipsis
  const getPageNumbers = () => {
    const maxPagesToShow = 5

    if (pageNumbers.length <= maxPagesToShow) {
      return pageNumbers
    }

    const halfWay = Math.floor(maxPagesToShow / 2)

    if (currentPage <= halfWay + 1) {
      return [...pageNumbers.slice(0, maxPagesToShow - 1), "...", pageNumbers.length]
    }

    if (currentPage >= pageNumbers.length - halfWay) {
      return [1, "...", ...pageNumbers.slice(pageNumbers.length - (maxPagesToShow - 1))]
    }

    return [1, "...", ...pageNumbers.slice(currentPage - 2, currentPage + 1), "...", pageNumbers.length]
  }

  return (
    <nav className="flex justify-center">
      <ul className="flex space-x-1">
        <li>
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-9 h-9 rounded-md ${
              currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-accent transition-colors"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </li>

        {getPageNumbers().map((number, index) => (
          <li key={index}>
            {number === "..." ? (
              <span className="flex items-center justify-center w-9 h-9">...</span>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(number)}
                className={`flex items-center justify-center w-9 h-9 rounded-md ${
                  currentPage === number ? "bg-primary text-white" : "hover:bg-accent transition-colors"
                }`}
              >
                {number}
              </motion.button>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={() => currentPage < pageNumbers.length && paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            className={`flex items-center justify-center w-9 h-9 rounded-md ${
              currentPage === pageNumbers.length
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-accent transition-colors"
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

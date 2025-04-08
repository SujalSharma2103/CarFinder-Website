"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { motion } from "framer-motion"

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative w-full max-w-md"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by car name or brand..."
        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
      <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Search className="h-5 w-5" />
      </button>
    </motion.form>
  )
}

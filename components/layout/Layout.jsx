"use client"

import { useState, useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"
import { motion, AnimatePresence } from "framer-motion"

export default function Layout({ children }) {
  const [mounted, setMounted] = useState(false)

  // Ensure the component is mounted before rendering to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

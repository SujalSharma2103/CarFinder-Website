"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-muted-foreground"
      >
        Loading cars...
      </motion.p>
    </div>
  )
}

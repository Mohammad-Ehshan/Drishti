"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Shield, Eye, Brain } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 pt-16">
      {/* TODO: Add background image here for visual enhancement */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* TODO: Add hero background image or video here */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Safety</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-foreground mb-6"
          >
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
              AI-Powered Event Safety
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="block text-primary"
            >
              and Response
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Project Drishti orchestrates multiple AI agents to monitor crowds, predict incidents, and coordinate
            emergency responses in real-time using Google ADK and Vertex AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/dashboard">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="text-lg px-8 py-3 cursor-pointer">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-12 flex justify-center items-center space-x-8 text-muted-foreground"
          >
            <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Real-time Monitoring</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>AI Predictions</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Instant Response</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

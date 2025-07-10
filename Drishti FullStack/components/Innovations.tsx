"use client"

import { motion } from "framer-motion"
import LostAndFound from "@/components/LostAndFound"
import SentimentChart from "@/components/SentimentChart"
import DroneDispatch from "@/components/DroneDispatch"

export default function Innovations() {
  const sections = [
    { component: LostAndFound, title: "AI Lost & Found" },
    { component: SentimentChart, title: "Crowd Sentiment Analysis" },
    { component: DroneDispatch, title: "Autonomous Drone Dispatch" },
  ]

  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <section.component />
        </motion.div>
      ))}
    </div>
  )
}

"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, TrendingUp, Send, MessageSquare, Video, Bot } from "lucide-react"

const features = [
  {
    icon: Eye,
    title: "Real-time Crowd Monitoring",
    description:
      "Advanced computer vision and IoT sensors track crowd density, movement patterns, and potential safety risks in real-time.",
    color: "text-blue-500",
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description:
      "Machine learning models forecast crowd behavior, identify bottlenecks, and predict potential incidents before they occur.",
    color: "text-green-500",
  },
  {
    icon: Send,
    title: "AI Dispatch & Routing",
    description:
      "Intelligent routing algorithms optimize emergency response by dispatching the nearest available units with optimal routes.",
    color: "text-purple-500",
  },
  {
    icon: MessageSquare,
    title: "Intelligent Summarizer",
    description:
      "Gemini AI processes vast amounts of data to generate actionable insights and comprehensive event summaries.",
    color: "text-orange-500",
  },
  {
    icon: Video,
    title: "Live Video Processing",
    description: "Real-time video stream analysis with object detection, crowd counting, and anomaly identification.",
    color: "text-red-500",
  },
  {
    icon: Bot,
    title: "Autonomous Response",
    description: "AI-powered autonomous systems including drone dispatch and intelligent resource allocation.",
    color: "text-cyan-500",
  },
]

export default function FeaturesGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="py-20 bg-secondary/20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Comprehensive Safety Platform</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI agents work together to create a complete safety ecosystem for your events
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="text-center">
                  <motion.div
                    className="mx-auto mb-4 p-3 bg-secondary rounded-full w-fit group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </motion.div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                  {/* TODO: Add feature illustration images here */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

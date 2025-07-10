"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

const zones = [
  { name: "Main Stage", occupancy: 85, capacity: 5000, risk: "high" },
  { name: "Food Court", occupancy: 62, capacity: 2000, risk: "medium" },
  { name: "Entrance Gate", occupancy: 45, capacity: 1500, risk: "low" },
  { name: "Parking Area", occupancy: 78, capacity: 3000, risk: "medium" },
]

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "high":
      return "bg-red-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

const getRiskVariant = (risk: string) => {
  switch (risk) {
    case "high":
      return "destructive"
    case "medium":
      return "secondary"
    case "low":
      return "default"
    default:
      return "outline"
  }
}

export default function ActiveZonesPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>Active Zones</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {zones.map((zone, index) => (
          <motion.div
            key={zone.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-3 border rounded-lg space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{zone.name}</span>
              <Badge variant={getRiskVariant(zone.risk)}>{zone.risk.toUpperCase()}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{zone.occupancy}% occupied</span>
              <span>
                {Math.floor((zone.capacity * zone.occupancy) / 100)}/{zone.capacity}
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${zone.occupancy}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`h-2 rounded-full ${getRiskColor(zone.risk)}`}
              />
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}

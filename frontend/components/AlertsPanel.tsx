"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "Crowd Density",
    message: "High density detected at Main Stage",
    time: "2 min ago",
    severity: "high",
  },
  {
    id: 2,
    type: "Anomaly Detection",
    message: "Unusual movement pattern near Exit 3",
    time: "5 min ago",
    severity: "medium",
  },
  {
    id: 3,
    type: "Weather Alert",
    message: "Rain forecast in 30 minutes",
    time: "8 min ago",
    severity: "low",
  },
  {
    id: 4,
    type: "Equipment",
    message: "Camera offline in Zone B",
    time: "12 min ago",
    severity: "medium",
  },
]

const getSeverityVariant = (severity: string) => {
  switch (severity) {
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

export default function AlertsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5" />
          <span>Active Alerts</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-3 border rounded-lg space-y-2"
            >
              <div className="flex items-center justify-between">
                <Badge variant={getSeverityVariant(alert.severity)}>{alert.type}</Badge>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{alert.time}</span>
                </div>
              </div>
              <p className="text-sm">{alert.message}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

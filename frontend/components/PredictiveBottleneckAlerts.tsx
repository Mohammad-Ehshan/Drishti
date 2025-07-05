"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, MapPin, TrendingUp, Users } from "lucide-react"

const bottleneckPredictions = [
  {
    id: "1",
    zone: "Zone B - Food Court",
    predictedTime: "14:35",
    currentDensity: 65,
    predictedDensity: 95,
    severity: "high",
    timeToBottleneck: "18 minutes",
    suggestedActions: ["Deploy additional security", "Open alternate routes", "Announce crowd dispersal"],
  },
  {
    id: "2",
    zone: "Zone A - Main Stage",
    predictedTime: "15:20",
    currentDensity: 78,
    predictedDensity: 88,
    severity: "medium",
    timeToBottleneck: "35 minutes",
    suggestedActions: ["Monitor closely", "Prepare crowd control barriers"],
  },
  {
    id: "3",
    zone: "Zone C - Exit Gate 2",
    predictedTime: "16:45",
    currentDensity: 45,
    predictedDensity: 82,
    severity: "low",
    timeToBottleneck: "1 hour 20 minutes",
    suggestedActions: ["Schedule additional staff", "Prepare signage"],
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "text-red-500 bg-red-500/10"
    case "medium":
      return "text-yellow-500 bg-yellow-500/10"
    case "low":
      return "text-green-500 bg-green-500/10"
    default:
      return "text-gray-500 bg-gray-500/10"
  }
}

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

export default function PredictiveBottleneckAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Predictive Bottleneck Alerts</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          AI predictions 15-20 minutes in advance to prevent crowd bottlenecks
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bottleneckPredictions.map((prediction, index) => (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${getSeverityColor(prediction.severity)}`}>
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">{prediction.zone}</h3>
                    <p className="text-sm text-muted-foreground flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Predicted bottleneck in {prediction.timeToBottleneck}</span>
                    </p>
                  </div>
                </div>
                <Badge variant={getSeverityVariant(prediction.severity)}>{prediction.severity.toUpperCase()}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Density:</span>
                    <span>{prediction.currentDensity}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${prediction.currentDensity}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-blue-500 h-2 rounded-full"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Predicted Density:</span>
                    <span>{prediction.predictedDensity}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${prediction.predictedDensity}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                      className={`h-2 rounded-full ${
                        prediction.predictedDensity > 90
                          ? "bg-red-500"
                          : prediction.predictedDensity > 75
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Suggested Actions:</h4>
                <div className="flex flex-wrap gap-2">
                  {prediction.suggestedActions.map((action, actionIndex) => (
                    <motion.div
                      key={actionIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.1 + actionIndex * 0.05 }}
                    >
                      <Badge variant="outline" className="text-xs">
                        {action}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>Predicted at {prediction.predictedTime}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>Capacity threshold: 85%</span>
                  </span>
                </div>
                <Button size="sm" variant="outline">
                  Take Action
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Heatmap Visualization Placeholder */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="text-sm font-medium mb-2">Crowd Density Heatmap</h4>
          <div className="h-32 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded flex items-center justify-center">
            {/* TODO: Replace with actual heatmap visualization */}
            <p className="text-sm text-muted-foreground">Interactive heatmap showing predicted bottlenecks</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react"
import { ErrorBoundary } from "react-error-boundary"

const forecastData = [
  { time: "12:00", predicted: 2500, actual: 2400, trend: "up" },
  { time: "13:00", predicted: 3200, actual: 3100, trend: "up" },
  { time: "14:00", predicted: 4100, actual: null, trend: "up" },
  { time: "15:00", predicted: 4800, actual: null, trend: "up" },
  { time: "16:00", predicted: 4200, actual: null, trend: "down" },
  { time: "17:00", predicted: 3500, actual: null, trend: "down" },
]

function ForecastErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-destructive mb-2">Forecast Data Error</h3>
          <p className="text-muted-foreground mb-4">Unable to load crowd flow predictions</p>
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-green-500" />
    case "down":
      return <TrendingDown className="h-4 w-4 text-red-500" />
    default:
      return <Minus className="h-4 w-4 text-gray-500" />
  }
}

function ForecastContent() {
  // TODO: Replace with actual API call to fetch forecast data
  const safeData = forecastData.filter((data) => data && typeof data.predicted === "number")

  if (safeData.length === 0) {
    throw new Error("No valid forecast data available")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Crowd Flow Forecast</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {safeData.map((data, index) => (
            <motion.div
              key={data.time}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-2 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center space-x-3">
                <span className="font-medium text-sm">{data.time}</span>
                {getTrendIcon(data.trend)}
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <p className="text-muted-foreground">Predicted</p>
                  <p className="font-medium">{data.predicted?.toLocaleString() || "N/A"}</p>
                </div>
                {data.actual && (
                  <div className="text-center">
                    <p className="text-muted-foreground">Actual</p>
                    <p className="font-medium">{data.actual.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        {/* TODO: Add actual chart visualization here */}
        <div className="mt-4 h-32 bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Line Chart Visualization</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ForecastWidget() {
  return (
    <ErrorBoundary FallbackComponent={ForecastErrorFallback}>
      <ForecastContent />
    </ErrorBoundary>
  )
}

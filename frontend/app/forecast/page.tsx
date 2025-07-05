"use client"

import { useState } from "react"
import TopBar from "@/components/TopBar"
import Sidebar from "@/components/Sidebar"
import ForecastWidget from "@/components/ForecastWidget"
import PredictiveBottleneckAlerts from "@/components/PredictiveBottleneckAlerts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download } from "lucide-react"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { ErrorBoundary } from "react-error-boundary"

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <Card className="lg:col-span-3">
      <CardContent className="p-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-destructive mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">Unable to load forecast data</p>
          <Button onClick={resetErrorBoundary} variant="outline">
            Try again
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ForecastPage() {
  const [date, setDate] = useState<Date>()
  const [selectedZone, setSelectedZone] = useState<string>()

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold text-foreground">Forecast</h1>
            <p className="text-muted-foreground">Predictive analytics for crowd density and safety</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Zone</label>
                    <Select value={selectedZone} onValueChange={setSelectedZone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main-stage">Main Stage</SelectItem>
                        <SelectItem value="food-court">Food Court</SelectItem>
                        <SelectItem value="entrance">Entrance</SelectItem>
                        <SelectItem value="parking">Parking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Date Range</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <div className="lg:col-span-3 space-y-6">
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <ForecastWidget />
              </ErrorBoundary>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <PredictiveBottleneckAlerts />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

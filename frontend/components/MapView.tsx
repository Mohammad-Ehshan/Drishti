"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Layers, MapPin, Users } from "lucide-react"

export default function MapView() {
  return (
    <Card className="h-96">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span>Live Event Map</span>
        </CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Layers className="h-4 w-4 mr-2" />
            Layers
          </Button>
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Density
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-80">
        <div className="w-full h-full bg-muted rounded-lg relative overflow-hidden">
          {/* TODO: Replace with actual map component (Google Maps, Mapbox, etc.) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive Map View</p>
              <p className="text-sm text-muted-foreground">Crowd density heatmap & incident markers</p>
            </div>
          </div>

          {/* Simulated incident markers */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute top-2/3 right-1/4 w-4 h-4 bg-yellow-500 rounded-full animate-pulse"
          />
        </div>
      </CardContent>
    </Card>
  )
}

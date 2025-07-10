"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plane, MapPin, Battery, Camera, CheckCircle } from "lucide-react"

interface Drone {
  id: string
  name: string
  status: "available" | "deployed" | "charging" | "maintenance"
  battery: number
  location: string
  capabilities: string[]
}

const mockDrones: Drone[] = [
  {
    id: "1",
    name: "Drone Alpha",
    status: "available",
    battery: 95,
    location: "Base Station A",
    capabilities: ["4K Camera", "Thermal Imaging", "Crowd Analysis"],
  },
  {
    id: "2",
    name: "Drone Beta",
    status: "deployed",
    battery: 67,
    location: "Zone B - Patrol",
    capabilities: ["4K Camera", "Night Vision", "Audio Recording"],
  },
  {
    id: "3",
    name: "Drone Gamma",
    status: "available",
    battery: 88,
    location: "Base Station B",
    capabilities: ["4K Camera", "Zoom Lens", "Emergency Broadcast"],
  },
]

export default function DroneDispatch() {
  const [selectedDrone, setSelectedDrone] = useState<string | null>(null)
  const [dispatchedDrones, setDispatchedDrones] = useState<string[]>([])
  const [liveFeed, setLiveFeed] = useState<string | null>(null)

  const availableDrones = mockDrones.filter((drone) => drone.status === "available")

  const handleDispatch = (droneId: string) => {
    setDispatchedDrones([...dispatchedDrones, droneId])
    setSelectedDrone(null)
    // TODO: Replace with actual drone dispatch API call
    console.log(`Dispatching drone ${droneId}`)
  }

  const startLiveFeed = (droneId: string) => {
    setLiveFeed(droneId)
    // TODO: Replace with actual live feed connection
    console.log(`Starting live feed from drone ${droneId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-green-500"
      case "deployed":
        return "text-blue-500"
      case "charging":
        return "text-yellow-500"
      case "maintenance":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "available":
        return "default"
      case "deployed":
        return "secondary"
      case "charging":
        return "outline"
      case "maintenance":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plane className="h-5 w-5" />
          <span>Autonomous Drone Dispatch</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Deploy AI-powered drones for aerial surveillance, crowd monitoring, and emergency response
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Drone Fleet Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockDrones.map((drone, index) => (
            <motion.div
              key={drone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedDrone === drone.id ? "border-primary bg-primary/5" : "hover:bg-secondary/50"
              }`}
              onClick={() => setSelectedDrone(drone.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Plane className={`h-5 w-5 ${getStatusColor(drone.status)}`} />
                  <span className="font-medium">{drone.name}</span>
                </div>
                <Badge variant={getStatusVariant(drone.status)}>{drone.status.toUpperCase()}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Battery:</span>
                  <div className="flex items-center space-x-2">
                    <Battery className="h-4 w-4" />
                    <span>{drone.battery}%</span>
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${drone.battery}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-2 rounded-full ${
                      drone.battery > 50 ? "bg-green-500" : drone.battery > 20 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                  />
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{drone.location}</span>
                </div>
              </div>

              {dispatchedDrones.includes(drone.id) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center space-x-2 text-green-600"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Dispatched</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Dispatch Interface */}
        <AnimatePresence>
          {selectedDrone && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 border rounded-lg bg-secondary/20"
            >
              {(() => {
                const drone = mockDrones.find((d) => d.id === selectedDrone)
                if (!drone) return null

                return (
                  <div className="space-y-4">
                    <h4 className="font-medium">Dispatch {drone.name}</h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Capabilities</label>
                        <div className="mt-1 space-y-1">
                          {drone.capabilities.map((capability, index) => (
                            <Badge key={index} variant="outline" className="text-xs mr-1">
                              {capability}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Mission Type</label>
                        <div className="mt-1 space-y-1">
                          <Badge variant="outline" className="text-xs mr-1">
                            Crowd Monitoring
                          </Badge>
                          <Badge variant="outline" className="text-xs mr-1">
                            Perimeter Patrol
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <h5 className="font-medium mb-2">Autonomous Flight Plan</h5>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div>• Takeoff from {drone.location}</div>
                        <div>• Navigate to incident area using GPS</div>
                        <div>• Begin aerial surveillance pattern</div>
                        <div>• Stream live video to command center</div>
                        <div>• Return to base when battery reaches 20%</div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {drone.status === "available" && !dispatchedDrones.includes(drone.id) && (
                        <Button onClick={() => handleDispatch(drone.id)} className="flex-1">
                          <Plane className="h-4 w-4 mr-2" />
                          Dispatch Drone
                        </Button>
                      )}
                      {drone.status === "deployed" && (
                        <Button onClick={() => startLiveFeed(drone.id)} variant="outline" className="flex-1">
                          <Camera className="h-4 w-4 mr-2" />
                          View Live Feed
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Feed */}
        <AnimatePresence>
          {liveFeed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Live Drone Feed</h4>
                <Button variant="outline" size="sm" onClick={() => setLiveFeed(null)}>
                  Close Feed
                </Button>
              </div>
              <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
                {/* TODO: Replace with actual drone video feed */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm opacity-75">Live Drone Feed</p>
                    <p className="text-xs opacity-50">Simulated aerial view</p>
                  </div>
                </div>

                {/* Simulated HUD overlay */}
                <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded text-xs">
                  <div>ALT: 150ft</div>
                  <div>SPD: 15mph</div>
                  <div>BAT: 67%</div>
                </div>

                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span>LIVE</span>
                </div>

                <div className="absolute bottom-4 left-4 bg-black/50 text-white p-2 rounded text-xs">
                  <div>GPS: 40.7128, -74.0060</div>
                  <div>ZOOM: 2.5x</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fleet Statistics */}
        <div className="grid grid-cols-4 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {mockDrones.filter((d) => d.status === "available").length}
            </div>
            <div className="text-sm text-muted-foreground">Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {mockDrones.filter((d) => d.status === "deployed").length}
            </div>
            <div className="text-sm text-muted-foreground">Deployed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(mockDrones.reduce((acc, d) => acc + d.battery, 0) / mockDrones.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Battery</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Coverage</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

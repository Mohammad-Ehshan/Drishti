"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { mockIncidents, mockUnits } from "@/lib/mockData"

export default function DispatchPanel() {
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null)
  const [dispatchedUnits, setDispatchedUnits] = useState<string[]>([])

  const activeIncidents = mockIncidents.filter((incident) => incident.status === "active")
  const selectedIncidentData = activeIncidents.find((incident) => incident.id === selectedIncident)

  // TODO: Replace with actual GPS coordinates and real-time unit locations
  const getNearbyUnits = (incidentLocation: string) => {
    return mockUnits
      .filter((unit) => unit.status === "available")
      .map((unit) => ({
        ...unit,
        distance: Math.random() * 5 + 0.5, // Mock distance in km
        eta: Math.floor(Math.random() * 15 + 3), // Mock ETA in minutes
        gpsCoords: {
          lat: 40.7128 + (Math.random() - 0.5) * 0.01,
          lng: -74.006 + (Math.random() - 0.5) * 0.01,
        },
      }))
      .sort((a, b) => a.distance - b.distance)
  }

  const handleDispatch = (unitId: string) => {
    setDispatchedUnits([...dispatchedUnits, unitId])
    // TODO: Replace with actual dispatch API call
    console.log(`Dispatching unit ${unitId} to incident ${selectedIncident}`)
  }

  const nearbyUnits = selectedIncidentData ? getNearbyUnits(selectedIncidentData.location) : []

  return (
    <div className="space-y-6">
      {/* Incident Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Active Incidents</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activeIncidents.map((incident) => (
            <motion.div
              key={incident.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedIncident === incident.id ? "border-primary bg-primary/5" : "hover:bg-secondary/50"
              }`}
              onClick={() => setSelectedIncident(incident.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{incident.type}</h3>
                <Badge variant="destructive">{incident.severity.toUpperCase()}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{incident.location}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{incident.timestamp}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Dispatch Interface */}
      <AnimatePresence>
        {selectedIncidentData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Intelligent Dispatch</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Incident: {selectedIncidentData.type} at {selectedIncidentData.location}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Map Placeholder */}
                <div className="h-48 bg-muted rounded-lg relative overflow-hidden">
                  {/* TODO: Replace with actual Google Maps integration */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Interactive Map</p>
                      <p className="text-xs text-muted-foreground">
                        Incident location, nearby units, and optimal routes
                      </p>
                    </div>
                  </div>

                  {/* Simulated incident marker */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full animate-pulse"
                  />

                  {/* Simulated unit markers */}
                  {nearbyUnits.slice(0, 3).map((unit, index) => (
                    <motion.div
                      key={unit.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="absolute w-3 h-3 bg-blue-500 rounded-full"
                      style={{
                        top: `${30 + index * 20}%`,
                        left: `${20 + index * 25}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Nearby Units */}
                <div className="space-y-3">
                  <h4 className="font-medium">Nearby Response Units</h4>
                  {nearbyUnits.slice(0, 3).map((unit, index) => (
                    <motion.div
                      key={unit.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-3 border rounded-lg space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">{unit.name}</h5>
                          <p className="text-sm text-muted-foreground">{unit.type}</p>
                        </div>
                        <Badge variant="default">Available</Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <div className="font-medium">{unit.distance.toFixed(1)} km</div>
                          <div className="text-muted-foreground">Distance</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{unit.eta} min</div>
                          <div className="text-muted-foreground">ETA</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{unit.personnel}</div>
                          <div className="text-muted-foreground">Personnel</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Navigation className="h-3 w-3" />
                          <span>Optimal route calculated</span>
                        </div>
                        {dispatchedUnits.includes(unit.id) ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center space-x-1 text-green-600"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">Dispatched</span>
                          </motion.div>
                        ) : (
                          <Button size="sm" onClick={() => handleDispatch(unit.id)}>
                            Dispatch Now
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Route Information */}
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <h4 className="font-medium mb-2">Recommended Route</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Fastest Route</div>
                      <div className="text-muted-foreground">Via Main St</div>
                    </div>
                    <div>
                      <div className="font-medium">Traffic</div>
                      <div className="text-green-600">Light</div>
                    </div>
                    <div>
                      <div className="font-medium">Conditions</div>
                      <div className="text-muted-foreground">Clear</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

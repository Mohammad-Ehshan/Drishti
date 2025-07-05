"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Truck, Users, MapPin, Clock, CheckCircle } from "lucide-react"
import { mockUnits, mockIncidents } from "@/lib/mockData"

export default function DispatchUnitList() {
  const [selectedIncident, setSelectedIncident] = useState<string>("")
  const [selectedUnit, setSelectedUnit] = useState<string>("")

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "available":
        return "default"
      case "dispatched":
        return "secondary"
      case "busy":
        return "destructive"
      default:
        return "outline"
    }
  }

  const handleDispatch = () => {
    // TODO: Replace with actual dispatch API call
    console.log("Dispatching unit:", selectedUnit, "to incident:", selectedIncident)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5" />
            <span>Response Units</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockUnits.map((unit, index) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 border rounded-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h3 className="font-medium">{unit.name}</h3>
                  <Badge variant={getStatusVariant(unit.status)}>{unit.status.toUpperCase()}</Badge>
                </div>
                <span className="text-sm text-muted-foreground">{unit.type}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{unit.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{unit.personnel} personnel</span>
                </div>
              </div>
              {unit.status === "available" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Assign to Incident
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dispatch Unit: {unit.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Select Incident</label>
                        <Select value={selectedIncident} onValueChange={setSelectedIncident}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose incident" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockIncidents
                              .filter((i) => i.status === "active")
                              .map((incident) => (
                                <SelectItem key={incident.id} value={incident.id}>
                                  {incident.type} - {incident.location}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">Suggested Route</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>• Estimated arrival: 8 minutes</p>
                          <p>• Distance: 2.3 km</p>
                          <p>• Traffic conditions: Light</p>
                        </div>
                      </div>
                      <Button onClick={handleDispatch} disabled={!selectedIncident} className="w-full">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Confirm Dispatch
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dispatch Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: "14:32", unit: "Fire Unit Alpha", incident: "Crowd Control", status: "En Route" },
              { time: "14:28", unit: "Medical Team 1", incident: "Medical Emergency", status: "On Scene" },
              { time: "14:15", unit: "Security Team B", incident: "Disturbance", status: "Resolved" },
              { time: "14:02", unit: "Fire Unit Beta", incident: "Equipment Check", status: "Completed" },
            ].map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-3 border rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{log.unit}</span>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{log.time}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{log.incident}</span>
                  <Badge variant="outline" className="text-xs">
                    {log.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

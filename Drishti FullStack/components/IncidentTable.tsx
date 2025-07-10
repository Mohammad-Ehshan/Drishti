"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Eye, MapPin, Clock, User } from "lucide-react"
import { mockIncidents } from "@/lib/mockData"

export default function IncidentTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIncident, setSelectedIncident] = useState<any>(null)

  const filteredIncidents = mockIncidents.filter(
    (incident) =>
      incident.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "resolved":
        return "default"
      case "active":
        return "destructive"
      case "investigating":
        return "secondary"
      default:
        return "outline"
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incident Management</CardTitle>
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredIncidents.map((incident, index) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="p-4 border rounded-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Badge variant={getSeverityVariant(incident.severity)}>{incident.severity.toUpperCase()}</Badge>
                  <Badge variant={getStatusVariant(incident.status)}>{incident.status.toUpperCase()}</Badge>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedIncident(incident)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Incident Details</DialogTitle>
                    </DialogHeader>
                    {selectedIncident && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Type</label>
                            <p>{selectedIncident.type}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Status</label>
                            <Badge variant={getStatusVariant(selectedIncident.status)}>{selectedIncident.status}</Badge>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Location</label>
                            <p className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {selectedIncident.location}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Time</label>
                            <p className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {selectedIncident.timestamp}
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Description</label>
                          <p className="text-muted-foreground">{selectedIncident.description}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Assigned Responders</label>
                          <div className="flex items-center space-x-2 mt-1">
                            <User className="h-4 w-4" />
                            <span>{selectedIncident.assignedTo}</span>
                          </div>
                        </div>
                        {selectedIncident.status !== "resolved" && <Button className="w-full">Mark as Resolved</Button>}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
              <div>
                <h3 className="font-medium">{incident.type}</h3>
                <p className="text-sm text-muted-foreground">{incident.description}</p>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {incident.location}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {incident.timestamp}
                  </span>
                </div>
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {incident.assignedTo}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Square, Users, Eye, AlertTriangle, MapPin } from "lucide-react"

interface DetectedObject {
  id: string
  type: string
  confidence: number
  x: number
  y: number
  width: number
  height: number
}

export default function VideoProcessing() {
  const [isConnected, setIsConnected] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([])
  const [occupancyCount, setOccupancyCount] = useState(0)
  const [currentZone, setCurrentZone] = useState("Main Stage Area")
  const videoRef = useRef<HTMLVideoElement>(null)

  // TODO: Replace with actual video stream connection
  const connectToFeed = async () => {
    setIsConnected(true)
    setIsProcessing(true)

    // Simulate video loading
    setTimeout(() => {
      // Mock detected objects
      const mockObjects: DetectedObject[] = [
        { id: "1", type: "person", confidence: 0.95, x: 100, y: 150, width: 80, height: 120 },
        { id: "2", type: "person", confidence: 0.87, x: 250, y: 180, width: 75, height: 115 },
        { id: "3", type: "person", confidence: 0.92, x: 400, y: 200, width: 85, height: 125 },
        { id: "4", type: "bag", confidence: 0.78, x: 320, y: 280, width: 40, height: 30 },
      ]
      setDetectedObjects(mockObjects)
      setOccupancyCount(mockObjects.filter((obj) => obj.type === "person").length)
    }, 2000)
  }

  const disconnectFeed = () => {
    setIsConnected(false)
    setIsProcessing(false)
    setDetectedObjects([])
    setOccupancyCount(0)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Video Player */}
      <div className="lg:col-span-2">
        <Card className="h-96">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Live Video Feed</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant={isConnected ? "default" : "secondary"}>
                {isConnected ? "Connected" : "Disconnected"}
              </Badge>
              {!isConnected ? (
                <Button onClick={connectToFeed} size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Connect to Live Feed
                </Button>
              ) : (
                <Button onClick={disconnectFeed} variant="destructive" size="sm">
                  <Square className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="h-80 relative">
            <AnimatePresence>
              {!isConnected ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full bg-muted rounded-lg flex items-center justify-center"
                >
                  <div className="text-center">
                    <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Click "Connect to Live Feed" to start</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full bg-black rounded-lg relative overflow-hidden"
                >
                  {/* TODO: Replace with actual video element */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-white text-center"
                    >
                      <div className="text-sm mb-2">Simulated Video Feed</div>
                      <div className="text-xs text-gray-400">
                        {/* TODO: Integrate actual video stream here */}
                        Live stream would appear here
                      </div>
                    </motion.div>
                  </div>

                  {/* Detection Overlays */}
                  <AnimatePresence>
                    {detectedObjects.map((obj) => (
                      <motion.div
                        key={obj.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute border-2 border-green-400 bg-green-400/20"
                        style={{
                          left: `${(obj.x / 640) * 100}%`,
                          top: `${(obj.y / 480) * 100}%`,
                          width: `${(obj.width / 640) * 100}%`,
                          height: `${(obj.height / 480) * 100}%`,
                        }}
                      >
                        <div className="absolute -top-6 left-0 bg-green-400 text-black text-xs px-1 rounded">
                          {obj.type} ({Math.round(obj.confidence * 100)}%)
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Processing Indicator */}
                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs flex items-center space-x-1"
                    >
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span>PROCESSING</span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      {/* Processing Summary */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Occupancy</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              key={occupancyCount}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary">{occupancyCount}</div>
              <div className="text-sm text-muted-foreground">People detected</div>
            </motion.div>
            <div className="mt-4 flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{currentZone}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detected Objects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              <AnimatePresence>
                {detectedObjects.map((obj, index) => (
                  <motion.div
                    key={obj.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-2 bg-secondary rounded"
                  >
                    <div className="flex items-center space-x-2">
                      {obj.type === "person" ? (
                        <Users className="h-4 w-4 text-blue-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-sm capitalize">{obj.type}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(obj.confidence * 100)}%
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
              {detectedObjects.length === 0 && (
                <div className="text-center text-muted-foreground text-sm py-4">No objects detected</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Status:</span>
              <Badge variant={isProcessing ? "default" : "secondary"}>{isProcessing ? "Active" : "Inactive"}</Badge>
            </div>
            <div className="flex justify-between">
              <span>FPS:</span>
              <span>{isProcessing ? "30" : "0"}</span>
            </div>
            <div className="flex justify-between">
              <span>Resolution:</span>
              <span>1920x1080</span>
            </div>
            <div className="flex justify-between">
              <span>Last Update:</span>
              <span>{isProcessing ? new Date().toLocaleTimeString() : "N/A"}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

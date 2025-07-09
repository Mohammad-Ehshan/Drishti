"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Upload, Search, User, MapPin, Clock, CheckCircle } from "lucide-react"

interface MatchResult {
  id: string
  confidence: number
  location: string
  timestamp: string
  cameraId: string
  status: "found" | "searching"
}

export default function LostAndFound() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<MatchResult[]>([])
  const [personName, setPersonName] = useState("")

  // TODO: Replace with actual image upload and AI matching
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const startSearch = () => {
    if (!uploadedImage) return

    setIsSearching(true)
    setSearchResults([])

    // Simulate AI search process
    setTimeout(() => {
      const mockResults: MatchResult[] = [
        {
          id: "1",
          confidence: 94,
          location: "Food Court - Camera 3",
          timestamp: "14:23:15",
          cameraId: "CAM_003",
          status: "found",
        },
        {
          id: "2",
          confidence: 87,
          location: "Main Entrance - Camera 1",
          timestamp: "13:45:32",
          cameraId: "CAM_001",
          status: "found",
        },
        {
          id: "3",
          confidence: 76,
          location: "Parking Area - Camera 8",
          timestamp: "13:12:08",
          cameraId: "CAM_008",
          status: "found",
        },
      ]
      setSearchResults(mockResults)
      setIsSearching(false)
    }, 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>AI Lost & Found</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Upload a photo to search for missing persons across all camera feeds using AI facial recognition
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Person's Name (Optional)</label>
              <Input
                placeholder="Enter person's name"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Upload Photo</label>
              <div className="mt-2">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Click to upload image</span>
                </label>
              </div>
            </div>

            {uploadedImage && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="space-y-2">
                <div className="relative">
                  {/* TODO: Add actual uploaded image preview */}
                  <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Uploaded Image Preview</span>
                  </div>
                </div>
                <Button onClick={startSearch} disabled={isSearching} className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  {isSearching ? "Searching..." : "Start AI Search"}
                </Button>
              </motion.div>
            )}
          </div>

          {/* Search Progress */}
          <div className="space-y-4">
            <AnimatePresence>
              {isSearching && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 bg-primary/5 border border-primary/20 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                    <div>
                      <div className="font-medium">AI Search in Progress</div>
                      <div className="text-sm text-muted-foreground">Analyzing feeds from 24 cameras...</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="text-xs text-muted-foreground">Processing cameras:</div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3 }}
                        className="bg-primary h-2 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search Results */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Search Complete - {searchResults.length} matches found</span>
                  </div>

                  {searchResults.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-3 border rounded-lg space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            {/* TODO: Add actual camera feed thumbnail */}
                            <User className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="font-medium">Match #{index + 1}</div>
                            <div className="text-sm text-muted-foreground flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{result.location}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant={result.confidence > 90 ? "default" : "secondary"}>
                          {result.confidence}% match
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>Detected at {result.timestamp}</span>
                        </span>
                        <span>Camera: {result.cameraId}</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        View Camera Feed
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">24</div>
            <div className="text-sm text-muted-foreground">Active Cameras</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">98.5%</div>
            <div className="text-sm text-muted-foreground">Recognition Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">2.3s</div>
            <div className="text-sm text-muted-foreground">Avg Search Time</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

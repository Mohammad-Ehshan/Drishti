export interface Alert {
  id: string
  name: string
  timestamp: Date
  location: {
    lat: number
    lng: number
  }
  confidence: number
  anomaly_type: string
  description: string
  severity: "low" | "medium" | "high"
  zone: string
  camera: string
  resolved: boolean
  resolvedAt?: Date

  latitude: number
  longitude: number

  aiDescription?: string
  lastSeenWearing?: string

  // Optional image fields (retain both for compatibility)
  snapshot_url?: string
  snapshotUrl?: string
}

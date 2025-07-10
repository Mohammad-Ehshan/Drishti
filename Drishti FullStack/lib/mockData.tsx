// TODO: Replace all mock data with actual API calls to your backend

export interface Incident {
  id: string
  type: string
  description: string
  location: string
  timestamp: string
  status: "active" | "investigating" | "resolved"
  severity: "low" | "medium" | "high"
  assignedTo: string
}

export interface Unit {
  id: string
  name: string
  type: string
  status: "available" | "dispatched" | "busy"
  location: string
  personnel: number
}

export const mockIncidents: Incident[] = [
  {
    id: "1",
    type: "Crowd Control",
    description: "High density crowd formation near main stage requiring immediate attention",
    location: "Main Stage Area",
    timestamp: "2024-01-15 14:30:00",
    status: "active",
    severity: "high",
    assignedTo: "Security Team Alpha",
  },
  {
    id: "2",
    type: "Medical Emergency",
    description: "Individual requiring medical assistance in food court area",
    location: "Food Court",
    timestamp: "2024-01-15 14:15:00",
    status: "investigating",
    severity: "medium",
    assignedTo: "Medical Team 1",
  },
  {
    id: "3",
    type: "Equipment Malfunction",
    description: "Sound system experiencing technical difficulties",
    location: "Stage 2",
    timestamp: "2024-01-15 13:45:00",
    status: "resolved",
    severity: "low",
    assignedTo: "Technical Team B",
  },
  {
    id: "4",
    type: "Weather Alert",
    description: "Incoming storm system detected, crowd evacuation may be necessary",
    location: "Outdoor Areas",
    timestamp: "2024-01-15 13:30:00",
    status: "active",
    severity: "high",
    assignedTo: "Emergency Coordinator",
  },
  {
    id: "5",
    type: "Lost Person",
    description: "Child separated from guardian, search in progress",
    location: "Entrance Gate",
    timestamp: "2024-01-15 13:00:00",
    status: "resolved",
    severity: "medium",
    assignedTo: "Security Team Beta",
  },
]

export const mockUnits: Unit[] = [
  {
    id: "1",
    name: "Fire Unit Alpha",
    type: "Fire & Rescue",
    status: "available",
    location: "Station 1",
    personnel: 4,
  },
  {
    id: "2",
    name: "Medical Team 1",
    type: "Emergency Medical",
    status: "dispatched",
    location: "Food Court",
    personnel: 2,
  },
  {
    id: "3",
    name: "Security Team Alpha",
    type: "Security",
    status: "busy",
    location: "Main Stage",
    personnel: 6,
  },
  {
    id: "4",
    name: "Security Team Beta",
    type: "Security",
    status: "available",
    location: "Entrance Gate",
    personnel: 4,
  },
  {
    id: "5",
    name: "Fire Unit Beta",
    type: "Fire & Rescue",
    status: "available",
    location: "Station 2",
    personnel: 4,
  },
  {
    id: "6",
    name: "Medical Team 2",
    type: "Emergency Medical",
    status: "available",
    location: "Medical Tent",
    personnel: 3,
  },
]

// TODO: Replace with actual Firebase configuration
export const mockFirebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "project-drishti.firebaseapp.com",
  databaseURL: "https://project-drishti-default-rtdb.firebaseio.com",
  projectId: "project-drishti",
  storageBucket: "project-drishti.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
}

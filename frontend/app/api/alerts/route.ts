import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, query, orderBy, limit, Timestamp } from "firebase/firestore"
import type { Alert } from "@/types/alert"

export async function GET() {
  try {
    const alertsRef = collection(db, "alerts")
    const q = query(alertsRef, orderBy("timestamp", "desc"), limit(50))
    const querySnapshot = await getDocs(q)

    const alerts: Alert[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      alerts.push({
        id: doc.id,
        ...data,
        timestamp: data.timestamp.toDate(),
      } as Alert)
    })

    return NextResponse.json(alerts)
  } catch (error) {
    console.error("Error fetching alerts:", error)
    return NextResponse.json({ error: "Failed to fetch alerts" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Add timestamp if not present
    if (!data.timestamp) {
      data.timestamp = Timestamp.now()
    } else if (typeof data.timestamp === "string") {
      data.timestamp = Timestamp.fromDate(new Date(data.timestamp))
    }

    // Add unique ID if not present
    if (!data.id) {
      data.id = Date.now().toString()
    }

    // Save to Firebase
    const alertsRef = collection(db, "alerts")
    const docRef = await addDoc(alertsRef, data)

    const alertWithId = {
      ...data,
      id: docRef.id,
      timestamp: data.timestamp.toDate(),
    }

    console.log("New alert saved to Firebase:", {
      id: docRef.id,
      name: data.name,
      location: data.location,
    })

    return NextResponse.json(alertWithId, { status: 201 })
  } catch (error) {
    console.error("Alert processing error:", error)
    return NextResponse.json({ error: "Failed to process alert" }, { status: 500 })
  }
}

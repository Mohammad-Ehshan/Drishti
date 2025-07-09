import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// TODO: Replace with actual API endpoints
export const API_ENDPOINTS = {
  incidents: "/api/incidents",
  units: "/api/units",
  forecast: "/api/forecast",
  summarizer: "/api/summarizer",
  dispatch: "/api/dispatch",
}

// TODO: Implement actual API functions
export const fetchIncidents = async () => {
  console.log("Fetching incidents from API...")
  // return fetch(API_ENDPOINTS.incidents).then(res => res.json())
}

export const fetchUnits = async () => {
  console.log("Fetching units from API...")
  // return fetch(API_ENDPOINTS.units).then(res => res.json())
}

export const fetchForecastData = async () => {
  console.log("Fetching forecast data from API...")
  // return fetch(API_ENDPOINTS.forecast).then(res => res.json())
}

export const sendSummarizerQuery = async (query: string) => {
  console.log("Sending query to AI summarizer:", query)
  // return fetch(API_ENDPOINTS.summarizer, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ query })
  // }).then(res => res.json())
}

export const dispatchUnit = async (unitId: string, incidentId: string) => {
  console.log("Dispatching unit:", unitId, "to incident:", incidentId)
  // return fetch(API_ENDPOINTS.dispatch, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ unitId, incidentId })
  // }).then(res => res.json())
}

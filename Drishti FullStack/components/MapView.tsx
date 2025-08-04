// "use client"

// import { motion } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Layers, MapPin, Users } from "lucide-react"

// export default function MapView() {
//   return (
//     <Card className="h-96">
//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle className="flex items-center space-x-2">
//           <MapPin className="h-5 w-5" />
//           <span>Live Event Map</span>
//         </CardTitle>
//         <div className="flex space-x-2">
//           <Button variant="outline" size="sm">
//             <Layers className="h-4 w-4 mr-2" />
//             Layers
//           </Button>
//           <Button variant="outline" size="sm">
//             <Users className="h-4 w-4 mr-2" />
//             Density
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent className="h-80">
//         <div className="w-full h-full bg-muted rounded-lg relative overflow-hidden">
//           {/* TODO: Replace with actual map component (Google Maps, Mapbox, etc.) */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center">
//               <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
//               <p className="text-muted-foreground">Interactive Map View</p>
//               <p className="text-sm text-muted-foreground">Crowd density heatmap & incident markers</p>
//             </div>
//           </div>

//           {/* Simulated incident markers */}
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//             className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse"
//           />
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.7 }}
//             className="absolute top-2/3 right-1/4 w-4 h-4 bg-yellow-500 rounded-full animate-pulse"
//           />
//         </div>
//       </CardContent>
//     </Card>
//   )
// }






'use client'

import 'leaflet/dist/leaflet.css'
import {
  MapContainer,
  TileLayer,
  Circle,
  CircleMarker,
  Popup,
} from 'react-leaflet'
import {
  Droplets,
  ShowerHead,
  DoorOpen,
  AlertTriangle,
} from 'lucide-react'

export default function LiveMap() {
  return (
    <div className="h-[30rem] rounded-xl overflow-hidden">
      <MapContainer center={[28.5826, 77.2335]} zoom={17} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 🧠 Crowd Density Circles */}
        <Circle center={[28.5826, 77.2335]} radius={100} pathOptions={{ color: 'red', fillOpacity: 0.3 }} />
        <Circle center={[28.5832, 77.2345]} radius={80} pathOptions={{ color: 'orange', fillOpacity: 0.3 }} />
        <Circle center={[28.5815, 77.2320]} radius={60} pathOptions={{ color: 'green', fillOpacity: 0.3 }} />

        {/* 🚨 Emergency */}
        <Circle center={[28.5820, 77.2342]} radius={10} pathOptions={{ color: 'red', fillColor: 'red' }}>
          <Popup>
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-4 h-4" />
              Emergency
            </div>
          </Popup>
        </Circle>

        {/* 🚿 Washrooms */}
        {[
          [28.5835, 77.2328],
          [28.5829, 77.2339],
        ].map((pos, i) => (
          <CircleMarker
            key={`washroom-${i}`}
            center={pos as [number, number]}
            radius={8}
            pathOptions={{ color: 'gray', fillColor: 'gray' }}
          >
            <Popup>
              <div className="flex items-center gap-2 text-gray-700">
                <ShowerHead className="w-4 h-4" />
                Washroom
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* 💧 Water Stations */}
        {[
          [28.5828, 77.2315],
          [28.5833, 77.2348],
        ].map((pos, i) => (
          <CircleMarker
            key={`water-${i}`}
            center={pos as [number, number]}
            radius={8}
            pathOptions={{ color: 'skyblue', fillColor: 'skyblue' }}
          >
            <Popup>
              <div className="flex items-center gap-2 text-sky-600">
                <Droplets className="w-4 h-4" />
                Water Station
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* 🚪 Exit Points */}
        {[
          [28.5810, 77.2345],
          [28.5840, 77.2320],
        ].map((pos, i) => (
          <CircleMarker
            key={`exit-${i}`}
            center={pos as [number, number]}
            radius={8}
            pathOptions={{ color: 'green', fillColor: 'green' }}
          >
            <Popup>
              <div className="flex items-center gap-2 text-green-700">
                <DoorOpen className="w-4 h-4" />
                Exit
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}

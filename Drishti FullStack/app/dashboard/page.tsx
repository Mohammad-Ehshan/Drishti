import TopBar from "@/components/TopBar"
import Sidebar from "@/components/Sidebar"
import MapView from "@/components/MapView"
import ActiveZonesPanel from "@/components/ActiveZonesPanel"
import AlertsPanel from "@/components/AlertsPanel"
import ForecastWidget from "@/components/ForecastWidget"
import PredictiveBottleneckAlerts from "@/components/PredictiveBottleneckAlerts"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MapView />
            <ForecastWidget />
            <PredictiveBottleneckAlerts />
          </div>
          <div className="space-y-6">
            <ActiveZonesPanel />
            <AlertsPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

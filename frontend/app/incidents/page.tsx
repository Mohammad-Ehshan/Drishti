import TopBar from "@/components/TopBar"
import Sidebar from "@/components/Sidebar"
import IncidentTable from "@/components/IncidentTable"

export default function IncidentsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Incidents</h1>
            <p className="text-muted-foreground">Monitor and manage all safety incidents</p>
          </div>
          <IncidentTable />
        </div>
      </div>
    </div>
  )
}

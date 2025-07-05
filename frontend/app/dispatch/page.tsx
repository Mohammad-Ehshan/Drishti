import TopBar from "@/components/TopBar"
import Sidebar from "@/components/Sidebar"
import DispatchUnitList from "@/components/DispatchUnitList"
import DispatchPanel from "@/components/DispatchPanel"

export default function DispatchPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Dispatch</h1>
            <p className="text-muted-foreground">Manage responder units and assignments</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DispatchUnitList />
            <DispatchPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

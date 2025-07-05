import TopBar from "@/components/TopBar"
import Sidebar from "@/components/Sidebar"
import Innovations from "@/components/Innovations"

export default function InnovationsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Innovations</h1>
            <p className="text-muted-foreground">Advanced AI capabilities and cutting-edge features</p>
          </div>
          <Innovations />
        </div>
      </div>
    </div>
  )
}

import TopBar from "@/components/TopBar"
import Sidebar from "@/components/Sidebar"
import SettingsForm from "@/components/SettingsForm"

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Configure your preferences and system settings</p>
          </div>
          <SettingsForm />
        </div>
      </div>
    </div>
  )
}

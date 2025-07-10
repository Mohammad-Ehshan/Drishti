import TopBar from "@/components/TopBar"
import Sidebar from "@/components/Sidebar"
import SummarizerChat from "@/components/SummarizerChat"

export default function SummarizerPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">AI Summarizer</h1>
            <p className="text-muted-foreground">Chat with Gemini AI for intelligent event summaries</p>
          </div>
          <SummarizerChat />
        </div>
      </div>
    </div>
  )
}

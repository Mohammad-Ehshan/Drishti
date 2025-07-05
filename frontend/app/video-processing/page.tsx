import TopBar from "@/components/TopBar"
import Sidebar from "@/components/Sidebar"
import VideoProcessing from "@/components/VideoProcessing"

export default function VideoProcessingPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Video Processing</h1>
            <p className="text-muted-foreground">Real-time video stream analysis and object detection</p>
          </div>
          <VideoProcessing />
        </div>
      </div>
    </div>
  )
}

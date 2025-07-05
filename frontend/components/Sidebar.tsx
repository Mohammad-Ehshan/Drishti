"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Map,
  AlertTriangle,
  TrendingUp,
  MessageSquare,
  Send,
  Settings,
  ChevronLeft,
  ChevronRight,
  Video,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Live Map", href: "/dashboard", icon: Map },
  { name: "Incidents", href: "/incidents", icon: AlertTriangle },
  { name: "Forecast", href: "/forecast", icon: TrendingUp },
  { name: "Video Processing", href: "/video-processing", icon: Video },
  { name: "Summarizer", href: "/summarizer", icon: MessageSquare },
  { name: "Dispatch", href: "/dispatch", icon: Send },
  { name: "Innovations", href: "/innovations", icon: Lightbulb },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn("bg-card border-r border-border transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!collapsed && <Link href={"/"}><h1 className="text-lg font-semibold text-foreground">Drishti</h1> </Link>}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
                collapsed && "justify-center",
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.name}</span>}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

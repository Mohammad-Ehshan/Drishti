import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Project Drishti</h3>
            <p className="text-muted-foreground">AI-powered event safety platform for the modern world.</p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Product</h4>
            <div className="space-y-2">
              <Link href="/dashboard" className="block text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Link href="/features" className="block text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="/pricing" className="block text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Link href="/careers" className="block text-muted-foreground hover:text-foreground">
                Careers
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground">© 2024 Project Drishti. All rights reserved.</p>
          <Link href="/dashboard">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}

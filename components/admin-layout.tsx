"use client"

import { type ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { CalendarPlus, ListTodo, Menu, School, Bell, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      href: "/admin/publish",
      label: "发布",
      icon: CalendarPlus,
      active: pathname === "/admin/publish",
    },
    {
      href: "/admin/activities",
      label: "活动管理",
      icon: ListTodo,
      active: pathname === "/admin/activities",
    },
  ]

  return (
    <div className="flex min-h-screen w-full bg-white">
      {!isMobile && (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-white lg:flex">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/admin/publish" className="flex items-center gap-2 font-semibold">
              <School className="h-6 w-6" />
              <span>狮山约享 · 管理</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <div className="px-4 py-2">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">管理面板</h2>
              <div className="space-y-1">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      route.active ? "bg-accent text-accent-foreground" : "transparent",
                    )}
                  >
                    <route.icon className="h-4 w-4" />
                    {route.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          <div className="mt-auto border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 overflow-hidden">
                  <img src="/placeholder.svg?height=32&width=32" alt="管理员头像" />
                </div>
                <div>
                  <p className="text-sm font-medium">管理员</p>
                  <p className="text-xs text-muted-foreground">系统管理</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </aside>
      )}
      <div className={cn("flex flex-col w-full", !isMobile && "lg:pl-64")}>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:px-6">
          {isMobile && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 sm:max-w-xs bg-white">
                <div className="flex h-14 items-center px-2">
                  <Link href="/admin/publish" className="flex items-center gap-2 font-semibold">
                    <School className="h-6 w-6" />
                    <span>狮山约享 · 管理</span>
                  </Link>
                </div>
                <nav className="mt-4 flex flex-col gap-2 px-2">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        route.active ? "bg-accent text-accent-foreground" : "transparent",
                      )}
                    >
                      <route.icon className="h-4 w-4" />
                      {route.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto border-t p-4 fixed bottom-0 left-0 right-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 overflow-hidden">
                        <img src="/placeholder.svg?height=32&width=32" alt="管理员头像" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">管理员</p>
                        <p className="text-xs text-muted-foreground">系统管理</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{routes.find((route) => route.active)?.label || "管理面板"}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}


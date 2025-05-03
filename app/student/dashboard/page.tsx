import type { Metadata } from "next"
import StudentDashboard from "@/components/student-dashboard"
import StudentLayout from "@/components/student-layout"

export const metadata: Metadata = {
  title: "首页 - 狮山约享",
  description: "浏览校园活动",
}

export default function DashboardPage() {
  return (
    <StudentLayout>
      <StudentDashboard />
    </StudentLayout>
  )
}


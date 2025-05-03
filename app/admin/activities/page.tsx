import type { Metadata } from "next"
import AdminActivities from "@/components/admin-activities"
import AdminLayout from "@/components/admin-layout"

export const metadata: Metadata = {
  title: "活动管理 - 狮山约享管理",
  description: "管理已发布的活动",
}

export default function ActivitiesPage() {
  return (
    <AdminLayout>
      <AdminActivities />
    </AdminLayout>
  )
}


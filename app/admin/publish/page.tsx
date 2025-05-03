import type { Metadata } from "next"
import AdminPublish from "@/components/admin-publish"
import AdminLayout from "@/components/admin-layout"

export const metadata: Metadata = {
  title: "发布 - 狮山约享管理",
  description: "发布活动和通知",
}

export default function PublishPage() {
  return (
    <AdminLayout>
      <AdminPublish />
    </AdminLayout>
  )
}


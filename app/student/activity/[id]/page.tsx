import type { Metadata } from "next"
import ActivityDetail from "@/components/activity-detail"
import StudentLayout from "@/components/student-layout"

export const metadata: Metadata = {
  title: "活动详情 - 狮山约享",
  description: "查看活动详细信息",
}

export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  return (
    <StudentLayout>
      <ActivityDetail id={params.id} />
    </StudentLayout>
  )
}


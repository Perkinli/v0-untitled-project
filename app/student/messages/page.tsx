import type { Metadata } from "next"
import StudentMessages from "@/components/student-messages"
import StudentLayout from "@/components/student-layout"

export const metadata: Metadata = {
  title: "消息 - 狮山约享",
  description: "查看您的通知和消息",
}

export default function MessagesPage() {
  return (
    <StudentLayout>
      <StudentMessages />
    </StudentLayout>
  )
}


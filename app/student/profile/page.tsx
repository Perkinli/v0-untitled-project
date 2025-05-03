import type { Metadata } from "next"
import StudentProfile from "@/components/student-profile"
import StudentLayout from "@/components/student-layout"

export const metadata: Metadata = {
  title: "我的 - 狮山约享",
  description: "查看和管理您的个人信息",
}

export default function ProfilePage() {
  return (
    <StudentLayout>
      <StudentProfile />
    </StudentLayout>
  )
}


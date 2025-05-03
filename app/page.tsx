import type { Metadata } from "next"
import LoginPage from "@/components/login-page"

export const metadata: Metadata = {
  title: "登录 - 狮山约享",
  description: "登录到狮山约享校园活动发布与预约系统",
}

export default function Home() {
  return <LoginPage />
}


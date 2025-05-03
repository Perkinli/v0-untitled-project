"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  School,
  Lock,
  LogIn,
  User,
  UserCircle,
  ShieldCheck,
  Eye,
  EyeOff,
  BookOpen,
  Award,
  Calendar,
  Users,
  Heart,
  Star,
  Sparkles,
} from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("student")
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 添加渐入动画效果
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const button = e.currentTarget.querySelector('button[type="submit"]')
    if (button) {
      button.classList.add("animate-click")
      setTimeout(() => {
        button.classList.remove("animate-click")
      }, 300)
    }

    // 简单的身份验证逻辑 - 实际应用中应该使用更安全的方法
    if (username && password) {
      if (password === "admin123") {
        router.push("/admin/dashboard")
      } else {
        router.push("/student/dashboard")
      }
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start pt-[15vh] p-4 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, #ed8ec5, #dd94d2, #ca9bdc, #b7a1e2, #a4a6e4, #92aae5, #81aee2, #73b1dd, #62b3d6, #58b5cb, #57b5be, #5db5b0)",
      }}
    >
      {/* 动态波浪背景 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-white/5 backdrop-blur-sm"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/5"></div>

      {/* 动态背景元素 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute top-1/4 -right-20 w-60 h-60 bg-white/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 -left-20 w-60 h-60 bg-white/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* 额外的几何装饰 */}
        <div
          className="absolute top-1/3 left-1/3 w-4 h-4 bg-white/20 rounded-full animate-ping"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/3 w-3 h-3 bg-white/20 rounded-full animate-ping"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-2/3 w-2 h-2 bg-white/20 rounded-full animate-ping"
          style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* 装饰性图标 */}
      <div className="absolute left-10 top-1/4 text-white/20 animate-float">
        <School size={40} />
      </div>
      <div className="absolute right-10 top-1/3 text-white/20 animate-float" style={{ animationDelay: "1.5s" }}>
        <BookOpen size={40} />
      </div>
      <div className="absolute left-1/4 bottom-1/4 text-white/20 animate-float" style={{ animationDelay: "1s" }}>
        <Award size={40} />
      </div>
      <div className="absolute right-1/4 bottom-1/3 text-white/20 animate-float" style={{ animationDelay: "2s" }}>
        <Calendar size={40} />
      </div>
      <div className="absolute left-1/2 top-1/5 text-white/20 animate-float" style={{ animationDelay: "0.5s" }}>
        <Users size={40} />
      </div>
      <div className="absolute right-1/5 top-2/3 text-white/20 animate-float" style={{ animationDelay: "1.2s" }}>
        <Star size={30} />
      </div>
      <div className="absolute left-1/6 top-2/5 text-white/20 animate-float" style={{ animationDelay: "1.8s" }}>
        <Heart size={25} />
      </div>

      <div className="flex flex-col items-center justify-center z-10 mt-[-40px]">
        {/* 页面LOGO和标题 - 调整位置到中央偏上 */}
        <div
          className="flex flex-col items-center justify-center opacity-0 animate-fadeIn mb-4 mt-[-30px]"
          style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
        >
          <div className="flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-3 shadow-lg">
            <School className="h-10 w-10 text-white" />
          </div>
          <h1
            className="text-4xl font-bold drop-shadow-md"
            style={{
              backgroundImage: "linear-gradient(to right, #b04c87, #5a5eb0, #376e6a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
            }}
          >
            狮山约享
          </h1>
          <p className="text-white/80 text-lg mt-2">校园活动发布与预约系统</p>
        </div>

        {/* 登录卡片 */}
        <Card
          className={`w-full max-w-md shadow-2xl border border-white/30 bg-white/10 backdrop-blur-md relative z-10 transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="absolute -top-4 -right-4 w-8 h-8 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full">
            <Sparkles className="h-4 w-4 text-white" />
          </div>

          <CardContent className="pt-6">
            <Tabs
              defaultValue="student"
              className="w-full transition-all duration-300 ease-linear"
              onValueChange={setUserType}
            >
              <TabsList className="grid w-full grid-cols-2 mb-6 transition-all duration-300 ease-linear relative p-1 bg-white/20 rounded-md border border-white/30">
                <div
                  className="absolute bottom-0 h-1 w-[calc(50%-4px)] rounded-md transition-transform duration-300 ease-linear transform z-20"
                  style={{
                    transform: userType === "admin" ? "translateX(calc(100% + 4px))" : "translateX(2px)",
                    backgroundColor: "#6ed2cd",
                    boxShadow: "0 0 8px rgba(110, 210, 205, 0.5)",
                  }}
                />
                <TabsTrigger
                  value="student"
                  className="relative z-10 transition-all duration-300 ease-linear font-medium text-gray-700 data-[state=active]:text-[#4A68B7] data-[state=active]:font-bold py-2 data-[state=active]:bg-transparent hover:bg-white/30"
                >
                  <UserCircle className="mr-2 h-4 w-4" />
                  学生登录
                </TabsTrigger>
                <TabsTrigger
                  value="admin"
                  className="relative z-10 transition-all duration-300 ease-linear font-medium text-gray-700 data-[state=active]:text-[#4A68B7] data-[state=active]:font-bold py-2 data-[state=active]:bg-transparent hover:bg-white/30"
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  管理员登录
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative group">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-500 transition-all group-focus-within:text-[#4A68B7]" />
                    <Input
                      id="username"
                      placeholder={userType === "student" ? "请输入学号" : "请输入管理员账号"}
                      className="pl-10 bg-white/40 border-white/40 focus:bg-white/50 transition-all focus:border-[#4A68B7]/50 focus:ring-1 focus:ring-[#4A68B7]/30"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#ed8ec5] to-[#a4a6e4] transition-all duration-300 group-focus-within:w-full"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500 transition-all group-focus-within:text-[#4A68B7]" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="请输入密码"
                      className="pl-10 pr-10 bg-white/40 border-white/40 focus:bg-white/50 transition-all focus:border-[#4A68B7]/50 focus:ring-1 focus:ring-[#4A68B7]/30"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-3 text-gray-500 hover:text-[#4A68B7] focus:outline-none transition-all"
                      aria-label={showPassword ? "隐藏密码" : "显示密码"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#ed8ec5] to-[#a4a6e4] transition-all duration-300 group-focus-within:w-full"></div>
                  </div>
                  <div className="flex items-center justify-end mt-2">
                    <a
                      href="#"
                      className="text-sm text-[#7b7fd1] hover:text-[#d06ba6] font-semibold transition-all hover:underline"
                    >
                      忘记密码?
                    </a>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0 overflow-hidden group"
                  style={{
                    backgroundImage: "linear-gradient(to right, #ed8ec5, #a4a6e4, #5db5b0)",
                  }}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#5db5b0] via-[#a4a6e4] to-[#ed8ec5] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center justify-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    登录
                  </span>
                </Button>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-white">
              登录即表示您同意我们的
              <a
                href="#"
                className="text-[#4A68B7] hover:text-[#ed8ec5] mx-1 font-semibold hover:underline transition-all"
              >
                服务条款
              </a>
              和
              <a
                href="#"
                className="text-[#4A68B7] hover:text-[#ed8ec5] mx-1 font-semibold hover:underline transition-all"
              >
                隐私政策
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* 页脚 */}
      <div
        className="absolute bottom-4 text-center text-white/60 text-xs z-10 opacity-0 animate-fadeIn"
        style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
      >
        <p className="mb-1">© 2023 狮山约享 All Rights Reserved.</p>
        <div className="flex items-center justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-white transition-colors">
            关于我们
          </a>
          <span>|</span>
          <a href="#" className="hover:text-white transition-colors">
            联系我们
          </a>
          <span>|</span>
          <a href="#" className="hover:text-white transition-colors">
            帮助中心
          </a>
        </div>
      </div>
    </div>
  )
}


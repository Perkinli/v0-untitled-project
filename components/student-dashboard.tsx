"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  Search,
  Flame,
  Clock,
  SchoolIcon,
  Filter,
  BookOpen,
  Music,
  Trophy,
  Heart,
  Users,
  Gift,
  Folder,
  X,
  MapPin,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// 模拟活动数据
const activities = [
  {
    id: 1,
    title: "狮山讲坛系列学术讲座：作物抗病育种前沿",
    category: "学术",
    date: "2025年3月25日 14:00-16:00",
    location: "植科楼学术报告厅",
    organizer: "植物科学技术学院",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6.jpg-fxTsWJJHSF64RDrDyRQPRQiGfZuun1.jpeg", // 替换为第一张图片
    hot: true,
    seats: "剩余 23 个名额",
    college: "植物科学技术学院",
  },
  {
    id: 2,
    title: "华农第十届大学生艺术节开幕式",
    category: "文艺",
    date: "2025年4月10日 18:30-21:00",
    location: "大学生活动中心",
    organizer: "校团委",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7.jpg-0ghd8l9FFCehVvwYbHa8dNtHxHj68Q.jpeg", // 替换为第二张图片
    hot: true,
    seats: "剩余 45 个名额",
    college: "文法学院",
  },
  {
    id: 3,
    title: '"狮山杯"校园篮球联赛',
    category: "体育",
    date: "2025年3月28日 15:00-17:00",
    location: "狮子山体育馆",
    organizer: "校体育部",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OIP-C.jpg-104GDe9tpZncTl4XWi0VTRMxSvOliQ.jpeg", // 替换为第三张图片
    hot: true,
    seats: "剩余 12 个名额",
    college: "校体育部",
  },
  {
    id: 4,
    title: '"三下乡"社会实践活动招募',
    category: "志愿公益",
    date: "2025年4月5日 9:00-11:00",
    location: "大学生活动中心201",
    organizer: "校团委",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.jpg-jj374DhGnjZbxfCLWK4hmfxAYqbqCV.jpeg", // 替换为第四张图片
    hot: true,
    seats: "无限制",
    college: "校团委",
  },
  {
    id: 5,
    title: '华农"百团大战"社团招新',
    category: "招新活动",
    date: "2025年3月22日-3月29日",
    location: "狮子山广场",
    organizer: "校学生会",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.jpg-2L8x0goTAtNM0jxmPcPwsSr0MGK9Av.jpeg", // 替换为第五张图片
    hot: true,
    seats: "招募 20 人",
    college: "校学生会",
  },
  {
    id: 6,
    title: '"绿色食品与健康"学术研讨会',
    category: "学术",
    date: "2025年4月4日 19:00-21:00",
    location: "食科楼学术报告厅",
    organizer: "食品科学技术学院",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.jpg-3cI04n0L4ZWcg6rbw0F1RWynO8Ka2s.jpeg", // 替换为第六张图片
    seats: "剩余 78 个名额",
    college: "食品科学技术学院",
  },
  {
    id: 7,
    title: '"华农杯"创新创业大赛',
    category: "其它",
    date: "2025年4月12日 14:30-16:30",
    location: "经管楼报告厅",
    organizer: "经济管理学院",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.jpg-cH8n7pLOUKQ1q1qpIs2vzYHbVt8ydJ.jpeg", // 替换为第七张图片
    hot: true,
    seats: "剩余 35 个名额",
    college: "经济管理学院",
  },
  {
    id: 8,
    title: '"互联网+"大学生创新创业大赛校内选拔赛',
    category: "其它",
    date: "2025年5月15日-5月20日",
    location: "信息学院报告厅",
    organizer: "信息学院",
    image: "https://source.unsplash.com/featured/800x600?technology",
    hot: true,
    seats: "剩余 50 个名额",
    college: "信息学院",
  },
  {
    id: 9,
    title: '"鱼类生态与健康养殖"学术论坛',
    category: "学术",
    date: "2025年4月18日 15:00-17:00",
    location: "水产楼学术厅",
    organizer: "水产学院",
    image: "https://source.unsplash.com/featured/800x600?fish",
    seats: "剩余 40 个名额",
    college: "水产学院",
  },
  {
    id: 10,
    title: '"青春华农"五四文艺晚会',
    category: "文艺",
    date: "2025年5月4日 19:00-21:00",
    location: "大学生活动中心音乐厅",
    organizer: "校团委",
    image: "https://source.unsplash.com/featured/800x600?performance",
    seats: "剩余 60 个名额",
    college: "校团委",
  },
  {
    id: 11,
    title: '"绿色化学与可持续发展"学术讲座',
    category: "学术",
    date: "2025年5月8日 14:00-16:30",
    location: "化学楼报告厅",
    organizer: "化学学院",
    image: "https://source.unsplash.com/featured/800x600?chemistry",
    seats: "剩余 45 个名额",
    college: "化学学院",
  },
  {
    id: 12,
    title: '"爱绿护绿"植树节活动',
    category: "志愿公益",
    date: "2025年3月12日 9:00-15:00",
    location: "狮子山校区北区",
    organizer: "园艺林学学院",
    image: "https://source.unsplash.com/featured/800x600?planting",
    hot: true,
    seats: "剩余 30 个名额",
    college: "园艺林学学院",
  },
  {
    id: 13,
    title: '"土壤与环境"学术研讨会',
    category: "学术",
    date: "2025年4月22日 14:00-16:00",
    location: "资环楼报告厅",
    organizer: "资源与环境学院",
    image: "https://source.unsplash.com/featured/800x600?environment",
    seats: "剩余 55 个名额",
    college: "资源与环境学院",
  },
  {
    id: 14,
    title: '"生物技术与现代农业"前沿讲座',
    category: "学术",
    date: "2025年3月30日 15:00-17:00",
    location: "生科楼报告厅",
    organizer: "生命科学技术学院",
    image: "https://source.unsplash.com/featured/800x600?biology",
    seats: "剩余 48 个名额",
    college: "生命科学技术学院",
  },
  {
    id: 15,
    title: '"智能农业装备"创新设计大赛',
    category: "其它",
    date: "2025年5月10日 9:00-17:00",
    location: "工学院实验楼",
    organizer: "工学院",
    image: "https://source.unsplash.com/featured/800x600?agriculture",
    hot: true,
    seats: "剩余 25 个名额",
    college: "工学院",
  },
  {
    id: 16,
    title: '"法律与农村发展"主题论坛',
    category: "学术",
    date: "2025年4月15日 14:30-16:30",
    location: "文法楼报告厅",
    organizer: "文法学院",
    image: "https://source.unsplash.com/featured/800x600?law",
    seats: "剩余 65 个名额",
    college: "文法学院",
  },
]

// 活动分类与对应图标和颜色
const categories = [
  {
    id: "学术",
    label: "学术",
    icon: BookOpen,
    color: "bg-blue-500",
    lightColor: "bg-blue-100",
    textColor: "text-blue-500",
    gradientFrom: "from-blue-500",
    gradientTo: "to-blue-600",
  },
  {
    id: "文艺",
    label: "文艺",
    icon: Music,
    color: "bg-purple-500",
    lightColor: "bg-purple-100",
    textColor: "text-purple-500",
    gradientFrom: "from-purple-500",
    gradientTo: "to-purple-600",
  },
  {
    id: "体育",
    label: "体育",
    icon: Trophy,
    color: "bg-green-500",
    lightColor: "bg-green-100",
    textColor: "text-green-500",
    gradientFrom: "from-green-500",
    gradientTo: "to-green-600",
  },
  {
    id: "志愿公益",
    label: "志愿公益",
    icon: Heart,
    color: "bg-rose-500",
    lightColor: "bg-rose-100",
    textColor: "text-rose-500",
    gradientFrom: "from-rose-500",
    gradientTo: "to-rose-600",
  },
  {
    id: "招新活动",
    label: "招新活动",
    icon: Users,
    color: "bg-amber-500",
    lightColor: "bg-amber-100",
    textColor: "text-amber-500",
    gradientFrom: "from-amber-500",
    gradientTo: "to-amber-600",
  },
  {
    id: "节日庆典",
    label: "节日庆典",
    icon: Gift,
    color: "bg-pink-500",
    lightColor: "bg-pink-100",
    textColor: "text-pink-500",
    gradientFrom: "from-pink-500",
    gradientTo: "to-pink-600",
  },
  {
    id: "其它",
    label: "其它",
    icon: Folder,
    color: "bg-slate-500",
    lightColor: "bg-slate-100",
    textColor: "text-slate-500",
    gradientFrom: "from-slate-500",
    gradientTo: "to-slate-600",
  },
]

export default function StudentDashboard() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [collegeFilter, setCollegeFilter] = useState("")
  const [organizationFilter, setOrganizationFilter] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<(typeof activities)[0] | null>(null)
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false)
  const [reservedActivities, setReservedActivities] = useState<number[]>([])
  const [hoverPosition, setHoverPosition] = useState<number | null>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  // 在现有状态声明下方添加
  const [activeTabPosition, setActiveTabPosition] = useState({ left: 0, width: 0 })
  const [hoverTabPosition, setHoverTabPosition] = useState({ left: 0, width: 0, opacity: 0 })
  const tabsListRef = useRef<HTMLDivElement>(null)
  const allTabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // 轮播相关状态
  const [currentSlide, setCurrentSlide] = useState(0)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // 获取热门活动
  const hotActivities = activities.filter((activity) => activity.hot)

  // 确保有足够的活动用于轮播
  const totalSlides = hotActivities.length

  // 处理轮播切换
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }, [totalSlides])

  // 自动轮播
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      nextSlide()
    }, 5000) // 5秒切换一次

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [nextSlide])

  // 鼠标悬停时暂停自动轮播
  const pauseAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
  }

  // 鼠标离开时恢复自动轮播
  const resumeAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    autoPlayRef.current = setInterval(() => {
      nextSlide()
    }, 5000)
  }, [nextSlide])

  // 处理活动预约
  const handleReservation = () => {
    // 实际应用中这里会发送到后端
    alert("预约成功！")
    if (selectedActivity) {
      setReservedActivities((prev) => [...prev, selectedActivity.id])
    }
    setIsReservationDialogOpen(false)
  }

  // 添加渐入动画效果
  useEffect(() => {
    setMounted(true)
  }, [])

  // 根据当前筛选条件过滤活动
  const filteredActivities = activities.filter((activity) => {
    // 搜索筛选
    if (searchQuery && !activity.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // 分类筛选
    if (activeCategory !== "all" && activity.category !== activeCategory) {
      return false
    }

    // 热门筛选
    if (filter === "hot" && !activity.hot) {
      return false
    }

    // 学院筛选
    if (collegeFilter && activity.college !== collegeFilter) {
      return false
    }

    // 组织筛选
    if (organizationFilter && activity.organizer !== organizationFilter) {
      return false
    }

    return true
  })

  // 获取要显示的轮播项目（当前项目和前后各2个项目）
  const getVisibleSlides = () => {
    const visibleSlides = []
    const totalItems = hotActivities.length

    // 如果不足5个项目，则返回所有项目
    if (totalItems <= 5) {
      return hotActivities
    }

    // 添加当前项目前面的2个项目
    for (let i = -2; i <= 2; i++) {
      let index = currentSlide + i

      // 处理循环
      if (index < 0) index = totalItems + index
      if (index >= totalItems) index = index - totalItems

      visibleSlides.push({
        activity: hotActivities[index],
        position: i,
      })
    }

    return visibleSlides
  }

  // 初始化标签位置
  useEffect(() => {
    // 添加一个小延迟确保DOM完全渲染
    const timer = setTimeout(() => {
      if (tabsListRef.current && allTabRefs.current.length > 0) {
        // 获取初始活动标签的位置和宽度
        const activeTabIndex = filter === "all" ? 0 : 1
        const activeTab = allTabRefs.current[activeTabIndex]

        if (activeTab) {
          const rect = activeTab.getBoundingClientRect()
          const parentRect = tabsListRef.current.getBoundingClientRect()

          setActiveTabPosition({
            left: rect.left - parentRect.left,
            width: rect.width,
          })
        }
      }
    }, 100) // 100ms延迟确保DOM已渲染

    return () => clearTimeout(timer)
  }, [filter, mounted])

  // 处理标签点击
  const handleTabClick = (index: number) => {
    if (tabsListRef.current && allTabRefs.current[index]) {
      const tab = allTabRefs.current[index]
      const rect = tab.getBoundingClientRect()
      const parentRect = tabsListRef.current.getBoundingClientRect()

      // 使用 spring 效果的缓动函数
      setActiveTabPosition({
        left: rect.left - parentRect.left,
        width: rect.width,
      })
    }
  }

  // 处理标签悬停
  const handleTabHover = (index: number) => {
    if (tabsListRef.current && allTabRefs.current[index]) {
      const tab = allTabRefs.current[index]
      const rect = tab.getBoundingClientRect()
      const parentRect = tabsListRef.current.getBoundingClientRect()

      setHoverTabPosition({
        left: rect.left - parentRect.left,
        width: rect.width,
        opacity: 1,
      })
    }
  }

  // 处理标签离开
  const handleTabLeave = () => {
    setHoverTabPosition((prev) => ({ ...prev, opacity: 0 }))
  }

  // 在现有的useEffect钩子之后添加
  useEffect(() => {
    // 确保组件完全挂载后初始化滑块位置
    if (mounted) {
      const initializeSliderPosition = () => {
        if (tabsListRef.current && allTabRefs.current.length > 0) {
          const activeTabIndex = filter === "all" ? 0 : 1
          const activeTab = allTabRefs.current[activeTabIndex]

          if (activeTab) {
            const rect = activeTab.getBoundingClientRect()
            const parentRect = tabsListRef.current.getBoundingClientRect()

            // 强制更新滑块位置
            setActiveTabPosition({
              left: rect.left - parentRect.left,
              width: rect.width,
            })
          }
        }
      }

      // 立即执行一次
      initializeSliderPosition()

      // 添加窗口大小变化监听，确保响应式布局下滑块位置正确
      window.addEventListener("resize", initializeSliderPosition)

      return () => {
        window.removeEventListener("resize", initializeSliderPosition)
      }
    }
  }, [mounted, filter])

  // 获取活动对应的分类信息
  const getCategoryInfo = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId) || categories[categories.length - 1]
  }

  return (
    <div className="space-y-8 min-h-screen bg-gradient-to-br from-indigo-50/80 via-sky-50/80 to-emerald-50/80 p-4 sm:p-6 relative overflow-hidden">
      {/* 动态背景元素 */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-emerald-500/10 -z-10 rounded-b-[50px]"></div>
      <div className="absolute top-0 left-1/4 w-1/2 h-48 bg-gradient-to-r from-indigo-500/5 via-sky-500/5 to-emerald-500/5 blur-3xl -z-10"></div>

      {/* 装饰性气泡元素 */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div
        className="absolute bottom-40 left-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse"
        style={{ animationDuration: "8s" }}
      ></div>
      <div
        className="absolute top-1/3 left-1/4 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse"
        style={{ animationDuration: "10s" }}
      ></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-violet-500/10 rounded-full blur-3xl -z-10 animate-pulse"
        style={{ animationDuration: "12s" }}
      ></div>

      {/* 装饰性小元素 */}
      <div
        className="absolute top-40 right-1/3 w-3 h-3 bg-sky-400/30 rounded-full animate-ping"
        style={{ animationDuration: "3s" }}
      ></div>
      <div
        className="absolute bottom-60 left-1/3 w-2 h-2 bg-emerald-400/30 rounded-full animate-ping"
        style={{ animationDuration: "4s" }}
      ></div>
      <div
        className="absolute top-1/2 right-1/5 w-2 h-2 bg-indigo-400/30 rounded-full animate-ping"
        style={{ animationDuration: "5s" }}
      ></div>

      <section className="space-y-6 relative">
        {/* 搜索和筛选栏 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-white/80 hover:shadow-xl transition-all duration-300">
          <div className="relative h-11 rounded-full bg-white/90 backdrop-blur-md border border-gray-200/80 group hover:bg-indigo-50/80 hover:border-indigo-300/50 hover:shadow-md transition-all duration-400 flex items-center">
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full bg-white/90 group-hover:bg-indigo-100/80 transition-all duration-400">
              <Search className="h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
            </div>
            <Input
              type="search"
              placeholder="搜索活动..."
              className="border-none bg-transparent w-0 group-hover:w-[250px] sm:group-hover:w-[300px] pl-3 pr-10 h-10 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent focus-visible:outline-none focus-visible:shadow-none transition-all duration-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Tabs
              defaultValue={filter}
              onValueChange={(value) => {
                setFilter(value)
                // 使用 requestAnimationFrame 确保在下一帧更新，提高动画流畅度
                requestAnimationFrame(() => {
                  const index = value === "all" ? 0 : 1
                  handleTabClick(index)
                })
              }}
              className="p-1 rounded-full relative border-0 shadow-none"
            >
              <TabsList
                className="bg-transparent h-auto p-0 relative overflow-visible border-0 shadow-none"
                ref={tabsListRef}
              >
                {/* 活跃状态滑块 */}
                <div
                  className="absolute h-full rounded-full shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0"
                  style={{
                    left: `${activeTabPosition.left}px`,
                    width: `${activeTabPosition.width}px`,
                    background: "linear-gradient(to right, rgba(99, 102, 241, 0.8), rgba(56, 189, 248, 0.8))",
                    boxShadow: "0 2px 10px rgba(99, 102, 241, 0.3)",
                    transform: "translateZ(0)", // 启用硬件加速
                  }}
                />

                {/* 悬停状态滑块 */}
                <div
                  className="absolute h-full rounded-full shadow-sm transition-all duration-300 ease-out z-0"
                  style={{
                    left: `${hoverTabPosition.left}px`,
                    width: `${hoverTabPosition.width}px`,
                    opacity: hoverTabPosition.opacity,
                    background: "linear-gradient(to right, rgba(99, 102, 241, 0.4), rgba(56, 189, 248, 0.4))",
                    transform: "translateZ(0)", // 启用硬件加速
                  }}
                />

                <TabsTrigger
                  value="all"
                  className="rounded-full px-5 py-2 text-sm font-medium z-10 relative data-[state=active]:text-indigo-600 data-[state=active]:font-semibold transition-all duration-300 hover:bg-transparent bg-transparent"
                  onMouseEnter={() => handleTabHover(0)}
                  onMouseLeave={handleTabLeave}
                  ref={(el) => (allTabRefs.current[0] = el)}
                >
                  全部
                </TabsTrigger>
                <TabsTrigger
                  value="hot"
                  className="rounded-full px-5 py-2 text-sm font-medium z-10 relative data-[state=active]:text-indigo-600 data-[state=active]:font-semibold transition-all duration-300 hover:bg-transparent flex items-center gap-1 bg-transparent"
                  onMouseEnter={() => handleTabHover(1)}
                  onMouseLeave={handleTabLeave}
                  ref={(el) => (allTabRefs.current[1] = el)}
                >
                  <Flame className="h-3.5 w-3.5 text-rose-500" />
                  热门
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-full border-gray-200/80 bg-white/90 backdrop-blur-md hover:bg-indigo-50/80 hover:border-indigo-300/50 hover:text-indigo-600 transition-all shadow-sm hover:shadow-md"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-xl p-2 bg-white/95 backdrop-blur-md border border-white/80 shadow-xl">
                <DropdownMenuLabel className="text-center font-bold text-indigo-600">筛选选项</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="rounded-lg hover:bg-indigo-50/80">
                    <SchoolIcon className="mr-2 h-4 w-4 text-indigo-600" />
                    <span>按学院筛选</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="rounded-xl p-2 bg-white/95 backdrop-blur-md border border-white/80 shadow-xl">
                      <DropdownMenuItem
                        onClick={() => setCollegeFilter("")}
                        className="rounded-lg hover:bg-indigo-50/80 font-medium"
                      >
                        全部学院
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setCollegeFilter("植物科学技术学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        植物科学技术学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setCollegeFilter("资源与环境学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        资源与环境学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setCollegeFilter("生命科学技术学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        生命科学技术学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setCollegeFilter("园艺林学学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        园艺林学学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setCollegeFilter("水产学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        水产学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setCollegeFilter("工学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        工学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setCollegeFilter("经济管理学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        经济管理学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setCollegeFilter("食品科学技术学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        食品科学技术学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setCollegeFilter("化学学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        化学学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setCollegeFilter("文法学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        文法学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setCollegeFilter("信息学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        信息学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setCollegeFilter("校团委")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        校团委
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setCollegeFilter("校学生会")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        校学生会
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="rounded-lg hover:bg-indigo-50/80">
                    <Users className="mr-2 h-4 w-4 text-indigo-600" />
                    <span>按组织筛选</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="rounded-xl p-2 bg-white/95 backdrop-blur-md border border-white/80 shadow-xl">
                      <DropdownMenuItem
                        onClick={() => setOrganizationFilter("")}
                        className="rounded-lg hover:bg-indigo-50/80 font-medium"
                      >
                        全部组织
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setOrganizationFilter("校团委")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        校团委
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOrganizationFilter("校学生会")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        校学生会
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOrganizationFilter("校体育部")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        校体育部
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOrganizationFilter("植物科学技术学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        植物科学技术学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOrganizationFilter("资源与环境学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        资源与环境学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOrganizationFilter("生命科学技术学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        生命科学技术学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOrganizationFilter("园艺林学学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        园艺林学学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOrganizationFilter("水产学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        水产学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOrganizationFilter("工学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        工学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOrganizationFilter("经济管理学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        经济管理学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOrganizationFilter("食品科学技术学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        食品科学技术学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOrganizationFilter("化学学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        化学学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOrganizationFilter("文法学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        文法学院
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOrganizationFilter("信息学院")}
                        className="rounded-lg hover:bg-indigo-50/80"
                      >
                        信息学院
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                {(collegeFilter || organizationFilter) && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setCollegeFilter("")
                        setOrganizationFilter("")
                      }}
                      className="rounded-lg text-rose-500 hover:bg-rose-50 focus:text-rose-500 focus:bg-rose-50"
                    >
                      <X className="mr-2 h-4 w-4" />
                      <span>清除筛选</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* 推荐活动轮播 */}
        <div className="bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/80 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
          {/* 装饰性背景元素 */}
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div
            className="absolute right-1/4 bottom-1/3 w-40 h-40 bg-sky-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 animate-pulse"
            style={{ animationDuration: "15s" }}
          ></div>

          {/* 标题部分 */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight flex items-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-500">
              <div className="p-2.5 bg-gradient-to-br from-indigo-500/20 to-sky-500/10 rounded-xl mr-4 backdrop-blur-sm shadow-inner">
                <TrendingUp className="h-7 w-7 text-indigo-600" />
              </div>
              推荐活动
            </h2>
          </div>

          {/* 轮播容器 */}
          <div
            className="relative h-[320px] w-full mx-auto"
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
            ref={carouselRef}
          >
            {/* 轮播背景 */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/5 via-gray-900/0 to-gray-900/5 rounded-2xl"></div>

            {/* 轮播内容容器 */}
            <div className="relative h-full">
              {/* 主图区域 */}
              <div className="w-full h-full relative">
                {hotActivities.map((activity, index) => {
                  const categoryInfo = getCategoryInfo(activity.category)
                  return (
                    <div
                      key={activity.id}
                      className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                        index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
                      }`}
                    >
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                        {/* 主图 */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${categoryInfo.gradientFrom}/20 ${categoryInfo.gradientTo}/20 mix-blend-overlay`}
                        ></div>
                        <img
                          src={activity.image || "/placeholder.svg"}
                          alt={activity.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          crossOrigin="anonymous"
                        />

                        {/* 渐变遮罩 */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-700 ease-in-out transform hover:opacity-90"></div>

                        {/* 活动信息 */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                          <div className="flex gap-2 mb-3">
                            <Badge className={`${categoryInfo.color} backdrop-blur-sm shadow-lg`}>
                              {activity.category}
                            </Badge>
                            <Badge variant="destructive" className="flex items-center gap-1 shadow-lg backdrop-blur-sm">
                              <Flame className="h-3 w-3" /> 热门
                            </Badge>
                          </div>

                          <h3 className="text-2xl font-bold mb-3 line-clamp-2">{activity.title}</h3>

                          <div className="flex flex-col gap-2 text-sm text-white/90 mb-5">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-sky-300" />
                              <span>{activity.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-sky-300" />
                              <span>{activity.location}</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm bg-white/15 backdrop-blur-sm text-white px-4 py-1.5 rounded-full">
                              {activity.seats}
                            </span>
                            <div className="flex gap-3">
                              <Button
                                size="sm"
                                className={`rounded-full px-4 py-2 ${
                                  reservedActivities.includes(activity.id)
                                    ? "bg-emerald-500 hover:bg-emerald-600"
                                    : `bg-gradient-to-r ${categoryInfo.gradientFrom} ${categoryInfo.gradientTo}`
                                }`}
                                onClick={() => {
                                  if (!reservedActivities.includes(activity.id)) {
                                    setSelectedActivity(activity)
                                    setIsReservationDialogOpen(true)
                                  }
                                }}
                                disabled={reservedActivities.includes(activity.id)}
                              >
                                {reservedActivities.includes(activity.id) ? "已预约" : "立即预约"}
                              </Button>
                              <Link href={`/student/activity/${activity.id}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-full border-white/30 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white"
                                >
                                  查看详情
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 缩略图区域 */}
              <div className="absolute bottom-6 right-6 w-1/3 h-20 z-30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-row items-center justify-center gap-2 max-w-full px-2">
                    {Array.from({ length: Math.min(5, hotActivities.length) }).map((_, i) => {
                      // 计算要显示的项目索引，确保循环显示
                      const itemsToShow = 5 // 显示5个缩略图
                      // 修改起始索引，从当前轮播的下一张开始
                      const startIndex = (currentSlide + 1) % totalSlides
                      let index = (startIndex + i) % totalSlides
                      if (index < 0) index = totalSlides + index // 处理负数索引

                      const activity = hotActivities[index]
                      // 修改活跃状态判断，使其与大窗口的下一张匹配
                      const isActive = index === (currentSlide + 1) % totalSlides

                      // 计算水平轮播效果的样式
                      const translateX = Math.min(Math.max((i - Math.floor(itemsToShow / 2)) * 60, -120), 120) // 限制水平偏移范围
                      let translateY = 0
                      let scale = 1
                      let opacity = 1
                      const zIndex = 30 - Math.abs(i - Math.floor(itemsToShow / 2))

                      // 调整非当前项的样式
                      if (!isActive) {
                        scale = 0.85
                        opacity = 0.7
                        translateY = i > Math.floor(itemsToShow / 2) ? 5 : i < Math.floor(itemsToShow / 2) ? -5 : 0 // 垂直偏移
                      }

                      return (
                        <div
                          key={`thumbnail-${index}`}
                          className={`cursor-pointer transition-all duration-300 ease-in-out rounded-lg overflow-hidden shadow-lg border-2 flex-shrink-0 ${
                            isActive ? "border-indigo-500" : "border-transparent"
                          }`}
                          style={{
                            transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
                            opacity,
                            zIndex,
                            maxWidth: "120px",
                            width: "120px",
                            height: "80px",
                          }}
                          onClick={() => setCurrentSlide(index)}
                        >
                          <div className="relative w-full h-full group overflow-hidden">
                            <img
                              src={activity.image || "/placeholder.svg"}
                              alt={activity.title}
                              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                              crossOrigin="anonymous"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-all duration-500 ease-in-out transform group-hover:scale-105 group-hover:from-black/50 group-hover:via-black/30 group-hover:to-transparent"></div>
                            <div className="absolute bottom-1 left-1 right-1">
                              <p className="text-[10px] text-white font-medium line-clamp-1">{activity.title}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 轮播控制按钮 */}
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-3 shadow-lg transition-all duration-300 z-40 hover:scale-110 border border-white/30 group"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5 text-white group-hover:text-white/100" />
            </button>
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-3 shadow-lg transition-all duration-300 z-40 hover:scale-110 border border-white/30 group"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5 text-white group-hover:text-white/100" />
            </button>
          </div>
        </div>

        {/* 分类筛选 */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3 transition-all duration-500 ${mounted ? "opacity-100" : "opacity-0"} relative z-10`}
        >
          <div
            className={cn(
              "col-span-1 sm:col-span-2 lg:col-span-4 xl:col-span-1 transition-all duration-300 transform",
              activeCategory === "all" ? "scale-[1.02]" : "scale-100",
            )}
          >
            <button
              className={cn(
                "w-full h-full flex flex-col items-center justify-center rounded-xl p-4 transition-all duration-300",
                activeCategory === "all"
                  ? "bg-gradient-to-br from-indigo-500/90 to-sky-500/90 text-white shadow-lg shadow-indigo-500/30"
                  : "bg-white/90 backdrop-blur-md border border-white/80 hover:border-indigo-300/50 hover:shadow-md hover:bg-white/95 text-gray-700 hover:text-indigo-600",
              )}
              onClick={() => setActiveCategory("all")}
            >
              <Calendar
                className={cn(
                  "h-6 w-6 mb-2 transition-all duration-300",
                  activeCategory === "all" ? "text-white" : "text-indigo-500",
                )}
              />
              <span className="font-medium">全部活动</span>
              {activeCategory === "all" && (
                <span className="text-xs mt-1 text-white/90">{filteredActivities.length} 个活动</span>
              )}
            </button>
          </div>

          {categories.map((category) => {
            const CategoryIcon = category.icon
            const isActive = activeCategory === category.id
            const categoryActivities = activities.filter(
              (a) => a.category === category.id && (filter !== "hot" || a.hot),
            )

            return (
              <div
                key={category.id}
                className={cn("transition-all duration-300 transform", isActive ? "scale-[1.02]" : "scale-100")}
              >
                <button
                  className={cn(
                    "w-full h-full flex flex-col items-center justify-center rounded-xl p-4 transition-all duration-300",
                    isActive
                      ? `bg-gradient-to-br ${category.gradientFrom} ${category.gradientTo} text-white shadow-lg shadow-${category.color.split("-")[1]}-500/30`
                      : `bg-white/90 backdrop-blur-md border border-white/80 hover:border-${category.color.split("-")[1]}-300/50 hover:shadow-md hover:bg-white/95 text-gray-700 hover:${category.textColor}`,
                  )}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <CategoryIcon
                    className={cn(
                      "h-6 w-6 mb-2 transition-all duration-300",
                      isActive ? "text-white" : category.textColor,
                    )}
                  />
                  <span className="font-medium">{category.label}</span>
                  {isActive && <span className="text-xs mt-1 text-white/90">{categoryActivities.length} 个活动</span>}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* 活动列表 */}
      <section className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/80 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
        <div className="absolute -right-20 -top-20 w-60 h-60 bg-indigo-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-sky-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <h2 className="text-2xl font-bold tracking-tight mb-8 flex items-center">
          <div className="p-2.5 bg-gradient-to-br from-indigo-500/20 to-sky-500/10 rounded-xl mr-3 shadow-inner">
            <Calendar className="h-6 w-6 text-indigo-600" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-500">
            {filter === "hot" ? "热门活动" : "所有活动"}
          </span>
        </h2>

        {filteredActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-indigo-50 p-5 rounded-full mb-4">
              <Search className="h-12 w-12 text-indigo-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">未找到符合条件的活动</h3>
            <p className="text-gray-500 max-w-md">尝试调整筛选条件或搜索关键词，以查看更多活动</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity, index) => {
              const categoryInfo = getCategoryInfo(activity.category)
              return (
                <Card
                  key={activity.id}
                  className={`overflow-hidden shadow-lg border-0 hover:shadow-xl transition-all duration-500 rounded-2xl bg-white/95 hover:bg-white/100 hover:-translate-y-2 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-video overflow-hidden group">
                    <img
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Badge className={`absolute top-3 right-3 ${categoryInfo.color} shadow-md`}>
                      {activity.category}
                    </Badge>
                    {activity.hot && (
                      <Badge variant="destructive" className="absolute top-3 left-3 flex items-center gap-1 shadow-md">
                        <Flame className="h-3 w-3" /> 热门
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <Link href={`/student/activity/${activity.id}`}>
                      <h3 className="font-semibold text-lg mb-4 hover:text-indigo-600 transition-colors line-clamp-1">
                        {activity.title}
                      </h3>
                    </Link>
                    <div className="space-y-3 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock className={`h-4 w-4 ${categoryInfo.textColor}`} />
                        <span>{activity.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <SchoolIcon className={`h-4 w-4 ${categoryInfo.textColor}`} />
                        <span>{activity.organizer}</span>
                      </div>
                      <div className="flex justify-between items-center mt-5">
                        <span
                          className={`text-xs ${categoryInfo.lightColor} ${categoryInfo.textColor} px-3 py-1.5 rounded-full font-medium`}
                        >
                          {activity.seats}
                        </span>
                        <Button
                          size="sm"
                          className={`rounded-full px-4 shadow-md hover:shadow-lg transition-all ${
                            reservedActivities.includes(activity.id)
                              ? "bg-emerald-500 hover:bg-emerald-600"
                              : `bg-gradient-to-r ${categoryInfo.gradientFrom} ${categoryInfo.gradientTo}`
                          }`}
                          onClick={() => {
                            if (!reservedActivities.includes(activity.id)) {
                              setSelectedActivity(activity)
                              setIsReservationDialogOpen(true)
                            }
                          }}
                          disabled={reservedActivities.includes(activity.id)}
                        >
                          {reservedActivities.includes(activity.id) ? "已预约" : "立即预约"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </section>

      {/* 预约确认对话框 */}
      <Dialog open={isReservationDialogOpen} onOpenChange={setIsReservationDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-indigo-600">预约确认</DialogTitle>
            <DialogDescription>您正在预约参加"{selectedActivity?.title}"活动</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">活动信息：</p>
              <div className="grid grid-cols-1 gap-2 text-sm bg-indigo-50/50 p-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-500" />
                  <span>{selectedActivity?.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-indigo-500" />
                  <span>{selectedActivity?.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <SchoolIcon className="h-4 w-4 text-indigo-500" />
                  <span>{selectedActivity?.organizer}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-rose-500">注意事项：</p>
              <p className="text-sm bg-rose-50/50 p-4 rounded-xl">
                1. 请确保您能够准时参加，若无法参加请提前取消预约。
                <br />
                2. 无故缺席将记录违约，影响后续活动预约。
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReservationDialogOpen(false)} className="rounded-full">
              取消
            </Button>
            <Button onClick={handleReservation} className="rounded-full bg-gradient-to-r from-indigo-500 to-sky-500">
              确认预约
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


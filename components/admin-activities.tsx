"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Filter,
  Clock,
  Users,
  FileDown,
  FileText,
  Edit,
  AlertTriangle,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"

// 模拟活动数据
const activities = [
  {
    id: 1,
    title: "文学讲座：当代文学的发展与趋势",
    category: "学术",
    date: "2025-03-25",
    time: "14:00-16:00",
    location: "中心校区图书馆报告厅",
    organizer: "中文系学生会",
    status: "upcoming", // upcoming, ongoing, completed
    registered: 77,
    maxParticipants: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "校园歌手大赛",
    category: "文艺",
    date: "2025-04-10",
    time: "18:30-21:00",
    location: "大学生活动中心",
    organizer: "校学生会文艺部",
    status: "upcoming",
    registered: 55,
    maxParticipants: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "篮球友谊赛：材料vs生物",
    category: "体育",
    date: "2025-03-28",
    time: "15:00-17:00",
    location: "北区篮球场",
    organizer: "体育学院",
    status: "upcoming",
    registered: 38,
    maxParticipants: 50,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "社区志愿者招募",
    category: "志愿公益",
    date: "2025-04-05",
    time: "9:00-11:00",
    location: "线上会议",
    organizer: "校青年志愿者协会",
    status: "upcoming",
    registered: 22,
    maxParticipants: 100,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "摄影协会招新",
    category: "招新活动",
    date: "2025-03-15",
    time: "全天",
    location: "各校区展台",
    organizer: "校摄影协会",
    status: "completed",
    registered: 45,
    maxParticipants: 50,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "校园环保宣传活动",
    category: "志愿公益",
    date: "2025-03-15",
    time: "9:00-11:00",
    location: "中心校区广场",
    organizer: "校青年志愿者协会",
    status: "completed",
    registered: 30,
    maxParticipants: 50,
    image: "/placeholder.svg?height=200&width=300",
  },
]

// 模拟违约记录
const violations = [
  {
    id: 1,
    studentId: "2021XXXXX",
    studentName: "张三",
    department: "材料科学与工程学院",
    activityId: 6,
    activityName: "校园环保宣传活动",
    date: "2025-03-15",
    status: "pending", // pending, processed
  },
  {
    id: 2,
    studentId: "2022XXXXX",
    studentName: "李四",
    department: "计算机学院",
    activityId: 6,
    activityName: "校园环保宣传活动",
    date: "2025-03-15",
    status: "pending",
  },
  {
    id: 3,
    studentId: "2023XXXXX",
    studentName: "王五",
    department: "经济管理学院",
    activityId: 6,
    activityName: "校园环保宣传活动",
    date: "2025-03-15",
    status: "processed",
  },
]

export default function AdminActivities() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [isViolationDialogOpen, setIsViolationDialogOpen] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<(typeof activities)[0] | null>(null)

  // 根据当前筛选条件过滤活动
  const filteredActivities = activities.filter((activity) => {
    if (searchQuery && !activity.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    if (filter !== "all" && activity.status !== filter) {
      return false
    }

    return true
  })

  // 处理活动操作
  const handleActivityAction = (action: string, activity: (typeof activities)[0]) => {
    setSelectedActivity(activity)

    switch (action) {
      case "export":
        setIsExportDialogOpen(true)
        break
      case "report":
        setIsReportDialogOpen(true)
        break
      case "edit":
        // 实际应用中跳转到编辑页面
        alert(`编辑活动：${activity.title}`)
        break
      case "violations":
        setIsViolationDialogOpen(true)
        break
      case "view":
        // 实际应用中跳转到查看页面
        alert(`查看活动：${activity.title}`)
        break
      default:
        break
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索活动..."
            className="w-full sm:w-[300px] pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Tabs defaultValue={filter} onValueChange={setFilter}>
            <TabsList>
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="upcoming">即将开始</TabsTrigger>
              <TabsTrigger value="ongoing">进行中</TabsTrigger>
              <TabsTrigger value="completed">已结束</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <Card
            key={activity.id}
            className="overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-video">
              <img
                src={activity.image || "/placeholder.svg"}
                alt={activity.title}
                className="object-cover w-full h-full"
              />
              <Badge
                className={`absolute top-2 right-2 ${
                  activity.status === "completed"
                    ? "bg-gray-500"
                    : activity.status === "ongoing"
                      ? "bg-green-500"
                      : "bg-blue-500"
                }`}
              >
                {activity.status === "completed" ? "已结束" : activity.status === "ongoing" ? "进行中" : "即将开始"}
              </Badge>
              <Badge className="absolute top-2 left-2 bg-primary">{activity.category}</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{activity.title}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{activity.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{activity.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>
                    已报名: {activity.registered}/{activity.maxParticipants}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8">
                        操作 <MoreHorizontal className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleActivityAction("view", activity)}>
                        <Eye className="mr-2 h-4 w-4" />
                        查看详情
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleActivityAction("export", activity)}>
                        <FileDown className="mr-2 h-4 w-4" />
                        导出名单
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleActivityAction("report", activity)}>
                        <FileText className="mr-2 h-4 w-4" />
                        生成报告
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleActivityAction("edit", activity)}>
                        <Edit className="mr-2 h-4 w-4" />
                        修改活动
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleActivityAction("violations", activity)}
                        className={activity.status !== "completed" ? "text-muted-foreground opacity-50" : ""}
                        disabled={activity.status !== "completed"}
                      >
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        违约处理
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Badge variant="outline" className="font-normal">
                    {activity.organizer}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 导出名单对话框 */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>导出预约名单</DialogTitle>
            <DialogDescription>选择导出格式和内容</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>活动信息</Label>
              <div className="rounded-md border p-2">
                <p className="font-medium">{selectedActivity?.title}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedActivity?.date} {selectedActivity?.time}
                </p>
                <p className="text-sm text-muted-foreground">
                  已报名: {selectedActivity?.registered}/{selectedActivity?.maxParticipants}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="export-format">导出格式</Label>
              <Select defaultValue="excel">
                <SelectTrigger id="export-format">
                  <SelectValue placeholder="选择格式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV (.csv)</SelectItem>
                  <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="export-content">导出内容</Label>
              <Select defaultValue="all">
                <SelectTrigger id="export-content">
                  <SelectValue placeholder="选择内容" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部信息</SelectItem>
                  <SelectItem value="basic">基本信息</SelectItem>
                  <SelectItem value="contact">联系方式</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              取消
            </Button>
            <Button>导出名单</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 生成报告对话框 */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>生成活动报告</DialogTitle>
            <DialogDescription>选择报告类型和内容</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>活动信息</Label>
              <div className="rounded-md border p-2">
                <p className="font-medium">{selectedActivity?.title}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedActivity?.date} {selectedActivity?.time}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-type">报告类型</Label>
              <Select defaultValue="summary">
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="选择类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">摘要报告</SelectItem>
                  <SelectItem value="detailed">详细报告</SelectItem>
                  <SelectItem value="analytics">数据分析报告</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-format">报告格式</Label>
              <Select defaultValue="pdf">
                <SelectTrigger id="report-format">
                  <SelectValue placeholder="选择格式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                  <SelectItem value="word">Word (.docx)</SelectItem>
                  <SelectItem value="ppt">PowerPoint (.pptx)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="include-attendance">包含内容</Label>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="include-attendance" defaultChecked />
                <Label htmlFor="include-attendance" className="font-normal">
                  出席情况
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="include-feedback" defaultChecked />
                <Label htmlFor="include-feedback" className="font-normal">
                  参与者反馈
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="include-photos" defaultChecked />
                <Label htmlFor="include-photos" className="font-normal">
                  活动照片
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
              取消
            </Button>
            <Button>生成报告</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 违约处理对话框 */}
      <Dialog open={isViolationDialogOpen} onOpenChange={setIsViolationDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>违约记录处理</DialogTitle>
            <DialogDescription>管理活动的违约记录</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>活动信息</Label>
              <div className="rounded-md border p-2">
                <p className="font-medium">{selectedActivity?.title}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedActivity?.date} {selectedActivity?.time}
                </p>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>学号</TableHead>
                    <TableHead>姓名</TableHead>
                    <TableHead>院系</TableHead>
                    <TableHead>违约日期</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {violations
                    .filter((v) => v.activityId === selectedActivity?.id)
                    .map((violation) => (
                      <TableRow key={violation.id}>
                        <TableCell>{violation.studentId}</TableCell>
                        <TableCell>{violation.studentName}</TableCell>
                        <TableCell>{violation.department}</TableCell>
                        <TableCell>{violation.date}</TableCell>
                        <TableCell>
                          <Badge variant={violation.status === "processed" ? "secondary" : "destructive"}>
                            {violation.status === "processed" ? "已处理" : "未处理"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {violation.status === "pending" ? (
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" className="h-8 gap-1">
                                <CheckCircle className="h-3.5 w-3.5" />
                                确认
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 gap-1">
                                <XCircle className="h-3.5 w-3.5" />
                                取消
                              </Button>
                            </div>
                          ) : (
                            <Button variant="outline" size="sm" className="h-8" disabled>
                              已处理
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsViolationDialogOpen(false)}>完成</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


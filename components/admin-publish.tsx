"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, CalendarPlus, Bell, Upload } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export default function AdminPublish() {
  const [date, setDate] = useState<Date>()
  const [activeTab, setActiveTab] = useState("activity")

  // 活动表单状态
  const [activityForm, setActivityForm] = useState({
    title: "",
    category: "",
    location: "",
    maxParticipants: "",
    organizer: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    description: "",
    requirements: "",
  })

  // 通知表单状态
  const [notificationForm, setNotificationForm] = useState({
    title: "",
    type: "",
    content: "",
    targetAudience: "",
  })

  // 处理活动表单变化
  const handleActivityFormChange = (field: string, value: string) => {
    setActivityForm((prev) => ({ ...prev, [field]: value }))
  }

  // 处理通知表单变化
  const handleNotificationFormChange = (field: string, value: string) => {
    setNotificationForm((prev) => ({ ...prev, [field]: value }))
  }

  // 提交活动表单
  const handleActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("活动表单提交:", { ...activityForm, date })
    alert("活动发布成功!")
    // 重置表单
    setActivityForm({
      title: "",
      category: "",
      location: "",
      maxParticipants: "",
      organizer: "",
      contactPerson: "",
      contactPhone: "",
      contactEmail: "",
      description: "",
      requirements: "",
    })
    setDate(undefined)
  }

  // 提交通知表单
  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("通知表单提交:", notificationForm)
    alert("通知发布成功!")
    // 重置表单
    setNotificationForm({
      title: "",
      type: "",
      content: "",
      targetAudience: "",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="activity" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="activity" className="flex items-center gap-1">
            <CalendarPlus className="h-4 w-4" />
            发布活动
          </TabsTrigger>
          <TabsTrigger value="notification" className="flex items-center gap-1">
            <Bell className="h-4 w-4" />
            发布通知
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <Card className="shadow-sm border border-gray-100">
            <form onSubmit={handleActivitySubmit}>
              <CardHeader>
                <CardTitle>发布新活动</CardTitle>
                <CardDescription>填写活动信息并发布到平台</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">活动标题 *</Label>
                    <Input
                      id="title"
                      placeholder="输入活动标题"
                      value={activityForm.title}
                      onChange={(e) => handleActivityFormChange("title", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">活动类别 *</Label>
                    <Select
                      value={activityForm.category}
                      onValueChange={(value) => handleActivityFormChange("category", value)}
                      required
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="选择活动类别" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="学术">学术</SelectItem>
                        <SelectItem value="文艺">文艺</SelectItem>
                        <SelectItem value="体育">体育</SelectItem>
                        <SelectItem value="志愿公益">志愿公益</SelectItem>
                        <SelectItem value="招新活动">招新活动</SelectItem>
                        <SelectItem value="节日庆典">节日庆典</SelectItem>
                        <SelectItem value="其它">其它</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">活动日期 *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "yyyy年MM月dd日") : "选择日期"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">活动时间 *</Label>
                    <div className="flex items-center gap-2">
                      <Input id="timeStart" placeholder="开始时间" className="w-full" required />
                      <span>至</span>
                      <Input id="timeEnd" placeholder="结束时间" className="w-full" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">活动地点 *</Label>
                    <Input
                      id="location"
                      placeholder="输入活动地点"
                      value={activityForm.location}
                      onChange={(e) => handleActivityFormChange("location", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">最大参与人数 *</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      min="1"
                      placeholder="输入人数"
                      value={activityForm.maxParticipants}
                      onChange={(e) => handleActivityFormChange("maxParticipants", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organizer">主办方 *</Label>
                    <Input
                      id="organizer"
                      placeholder="输入主办单位/组织"
                      value={activityForm.organizer}
                      onChange={(e) => handleActivityFormChange("organizer", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">联系人 *</Label>
                    <Input
                      id="contactPerson"
                      placeholder="输入联系人姓名"
                      value={activityForm.contactPerson}
                      onChange={(e) => handleActivityFormChange("contactPerson", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">联系电话 *</Label>
                    <Input
                      id="contactPhone"
                      placeholder="输入联系电话"
                      value={activityForm.contactPhone}
                      onChange={(e) => handleActivityFormChange("contactPhone", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">联系邮箱</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="输入联系邮箱"
                      value={activityForm.contactEmail}
                      onChange={(e) => handleActivityFormChange("contactEmail", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover">活动封面图</Label>
                  <div className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-accent transition-colors">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-1">点击或拖拽上传图片</p>
                    <p className="text-xs text-muted-foreground">支持 PNG, JPG, GIF 格式，建议尺寸 1200 x 600 像素</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">活动详情 *</Label>
                  <Textarea
                    id="description"
                    placeholder="输入活动详细介绍"
                    className="min-h-[120px]"
                    value={activityForm.description}
                    onChange={(e) => handleActivityFormChange("description", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">参与要求</Label>
                  <Textarea
                    id="requirements"
                    placeholder="输入参与要求和注意事项"
                    className="min-h-[100px]"
                    value={activityForm.requirements}
                    onChange={(e) => handleActivityFormChange("requirements", e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">
                  取消
                </Button>
                <Button type="submit">发布活动</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notification">
          <Card className="shadow-sm border border-gray-100">
            <form onSubmit={handleNotificationSubmit}>
              <CardHeader>
                <CardTitle>发布新通知</CardTitle>
                <CardDescription>创建系统通知或活动提醒</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="notification-title">通知标题 *</Label>
                    <Input
                      id="notification-title"
                      placeholder="输入通知标题"
                      value={notificationForm.title}
                      onChange={(e) => handleNotificationFormChange("title", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notification-type">通知类型 *</Label>
                    <Select
                      value={notificationForm.type}
                      onValueChange={(value) => handleNotificationFormChange("type", value)}
                      required
                    >
                      <SelectTrigger id="notification-type">
                        <SelectValue placeholder="选择通知类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">系统通知</SelectItem>
                        <SelectItem value="reminder">活动提醒</SelectItem>
                        <SelectItem value="violation">违约提醒</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-content">通知内容 *</Label>
                  <Textarea
                    id="notification-content"
                    placeholder="输入通知内容"
                    className="min-h-[150px]"
                    value={notificationForm.content}
                    onChange={(e) => handleNotificationFormChange("content", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-audience">目标受众 *</Label>
                  <Select
                    value={notificationForm.targetAudience}
                    onValueChange={(value) => handleNotificationFormChange("targetAudience", value)}
                    required
                  >
                    <SelectTrigger id="target-audience">
                      <SelectValue placeholder="选择目标受众" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有用户</SelectItem>
                      <SelectItem value="specific-activity">特定活动参与者</SelectItem>
                      <SelectItem value="department">特定学院</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {notificationForm.targetAudience === "specific-activity" && (
                  <div className="space-y-2">
                    <Label htmlFor="activity-select">选择活动</Label>
                    <Select>
                      <SelectTrigger id="activity-select">
                        <SelectValue placeholder="选择活动" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">文学讲座：当代文学的发展与趋势</SelectItem>
                        <SelectItem value="2">校园歌手大赛</SelectItem>
                        <SelectItem value="3">篮球友谊赛：材料vs生物</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {notificationForm.targetAudience === "department" && (
                  <div className="space-y-2">
                    <Label htmlFor="department-select">选择学院</Label>
                    <Select>
                      <SelectTrigger id="department-select">
                        <SelectValue placeholder="选择学院" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="material">材料科学与工程学院</SelectItem>
                        <SelectItem value="computer">计算机学院</SelectItem>
                        <SelectItem value="art">艺术学院</SelectItem>
                        <SelectItem value="business">经济管理学院</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">
                  取消
                </Button>
                <Button type="submit">发布通知</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


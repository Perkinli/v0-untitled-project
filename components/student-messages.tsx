"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Bell, AlertCircle, Info } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

// 模拟日历上的活动日期
const events = [
  new Date(2025, 2, 25), // 3月25日的活动
  new Date(2025, 3, 10), // 4月10日的活动
  new Date(2025, 2, 28), // 3月28日的活动
]

// 模拟消息数据
const notifications = [
  {
    id: 1,
    title: "系统通知",
    content: "您的账户已成功激活，欢迎使用狮山约享校园活动预约系统！",
    date: "2025-03-20 09:15",
    type: "system",
    read: true,
  },
  {
    id: 2,
    title: "活动提醒",
    content: '您预约的"文学讲座：当代文学的发展与趋势"将在明天（3月25日）14:00开始，请准时参加。',
    date: "2025-03-24 10:30",
    type: "reminder",
    read: false,
  },
  {
    id: 3,
    title: "活动提醒",
    content: '您预约的"篮球友谊赛：材料vs生物"将在本周五（3月28日）15:00开始，请准时参加。',
    date: "2025-03-26 08:45",
    type: "reminder",
    read: false,
  },
  {
    id: 4,
    title: "违约提醒",
    content: '您未参加"3月15日开展的校园环保宣传活动"，已记录一次违约，请注意活动参与率。',
    date: "2025-03-15 18:00",
    type: "violation",
    read: false,
  },
]

export default function StudentMessages() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [activeTab, setActiveTab] = useState("all")

  // 根据当前选择的标签过滤消息
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    return notification.type === activeTab
  })

  // 自定义日历渲染函数
  const dayHasEvent = (day: Date) => {
    return events.some(
      (event) =>
        event.getDate() === day.getDate() &&
        event.getMonth() === day.getMonth() &&
        event.getFullYear() === day.getFullYear(),
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>活动日历</CardTitle>
            <CardDescription>查看您即将参加的活动</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiersStyles={{
                event: { backgroundColor: "#4d71f5", color: "white", borderRadius: "9999px" },
              }}
              modifiers={{
                event: (date) => dayHasEvent(date),
              }}
              components={{
                DayContent: (props) => {
                  const isEvent = dayHasEvent(props.date)
                  return (
                    <div
                      className={`relative w-full h-full flex items-center justify-center ${
                        isEvent ? "font-bold" : ""
                      }`}
                    >
                      {props.date.getDate()}
                      {isEvent && <div className="absolute bottom-1 w-1 h-1 bg-current rounded-full" />}
                    </div>
                  )
                },
              }}
            />
            {dayHasEvent(selectedDate!) && (
              <div className="mt-4 space-y-2">
                <h3 className="font-medium">今日活动</h3>
                <div className="text-sm space-y-1 text-muted-foreground">
                  {selectedDate!.getDate() === 25 && selectedDate!.getMonth() === 2 && (
                    <div className="flex items-center gap-2 p-2 rounded-md border">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      <span>文学讲座：当代文学的发展与趋势</span>
                    </div>
                  )}
                  {selectedDate!.getDate() === 10 && selectedDate!.getMonth() === 3 && (
                    <div className="flex items-center gap-2 p-2 rounded-md border">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      <span>校园歌手大赛</span>
                    </div>
                  )}
                  {selectedDate!.getDate() === 28 && selectedDate!.getMonth() === 2 && (
                    <div className="flex items-center gap-2 p-2 rounded-md border">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      <span>篮球友谊赛：材料vs生物</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>消息中心</CardTitle>
            <CardDescription>查看系统通知、活动提醒和违约记录</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="all" className="flex items-center gap-1">
                  <Bell className="h-4 w-4" />
                  全部消息
                </TabsTrigger>
                <TabsTrigger value="reminder" className="flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  活动提醒
                </TabsTrigger>
                <TabsTrigger value="violation" className="flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  违约提醒
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg ${!notification.read ? "bg-accent" : ""}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {notification.type === "system" && <Bell className="h-4 w-4 text-blue-500" />}
                          {notification.type === "reminder" && <Info className="h-4 w-4 text-green-500" />}
                          {notification.type === "violation" && <AlertCircle className="h-4 w-4 text-red-500" />}
                          <h3 className="font-medium">
                            {notification.title}
                            {!notification.read && (
                              <Badge variant="default" className="ml-2 text-[10px]">
                                新消息
                              </Badge>
                            )}
                          </h3>
                        </div>
                        <span className="text-xs text-muted-foreground">{notification.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">暂无消息</div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


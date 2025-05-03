"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  School,
  Phone,
  Mail,
  Share2,
  Heart,
  MessageSquare,
  ThumbsUp,
  Flame,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// 模拟活动数据
const activityData = {
  id: "1",
  title: "文学讲座：当代文学的发展与趋势",
  category: "学术",
  date: "2025年3月25日",
  time: "14:00-16:00",
  location: "中心校区图书馆报告厅",
  organizer: "中文系学生会",
  contactPerson: "李明",
  contactPhone: "138****1234",
  contactEmail: "liming@example.com",
  image: "/placeholder.svg?height=400&width=800",
  hot: true,
  seats: {
    total: 100,
    available: 23,
  },
  description: `
    <p>本次讲座邀请到了著名文学评论家张教授，为大家带来关于当代文学发展趋势的精彩讲解。</p>
    <p>主要内容：</p>
    <ul>
      <li>当代文学的主要流派及其特点</li>
      <li>新媒体时代文学创作的变革</li>
      <li>青年写作者的机遇与挑战</li>
      <li>文学与社会的互动关系</li>
    </ul>
    <p>讲座结束后将有互动环节，欢迎同学们积极提问。</p>
  `,
  requirements: `
    <p>参与要求：</p>
    <ul>
      <li>请提前10分钟到场</li>
      <li>请自备笔记本</li>
      <li>讲座全程禁止喧哗</li>
      <li>请勿迟到早退</li>
    </ul>
  `,
  comments: [
    {
      id: 1,
      user: {
        name: "王丽",
        avatar: "/placeholder.svg?height=40&width=40",
        department: "中文系",
      },
      content: "上学期参加过张教授的讲座，讲得非常精彩，这次一定不能错过！",
      time: "2025-03-20 10:30",
      likes: 12,
    },
    {
      id: 2,
      user: {
        name: "刘洋",
        avatar: "/placeholder.svg?height=40&width=40",
        department: "新闻学院",
      },
      content: "对文学很感兴趣，期待这次讲座能有所收获。有人一起去吗？",
      time: "2025-03-19 16:45",
      likes: 5,
    },
  ],
}

export default function ActivityDetail({ id }: { id: string }) {
  const router = useRouter()
  const [followStatus, setFollowStatus] = useState<"followed" | "unfollowed">("unfollowed")
  const [commentText, setCommentText] = useState("")
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false)

  // 处理活动收藏
  const handleFollow = () => {
    setFollowStatus(followStatus === "followed" ? "unfollowed" : "followed")
  }

  // 提交评论
  const handleSubmitComment = () => {
    if (commentText.trim()) {
      // 实际应用中这里会发送到后端
      alert("评论已提交")
      setCommentText("")
    }
  }

  // 处理活动预约
  const handleReservation = () => {
    // 实际应用中这里会发送到后端
    alert("预约成功")
    setIsReservationDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" className="mb-6" onClick={() => router.back()}>
        返回列表
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border border-gray-100">
            <div className="relative">
              <img
                src={activityData.image || "/placeholder.svg"}
                alt={activityData.title}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge className="bg-primary">{activityData.category}</Badge>
                {activityData.hot && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <Flame className="h-3 w-3" /> 热门
                  </Badge>
                )}
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">{activityData.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{activityData.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{activityData.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{activityData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>
                    剩余 {activityData.seats.available}/{activityData.seats.total} 个名额
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <School className="h-4 w-4" />
                  <span>{activityData.organizer}</span>
                </div>
              </div>

              <Tabs defaultValue="details">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="details">活动详情</TabsTrigger>
                  <TabsTrigger value="requirements">参与要求</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="py-4">
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: activityData.description }}
                  />
                </TabsContent>
                <TabsContent value="requirements" className="py-4">
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: activityData.requirements }}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-4">
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFollow}
                    className={`${followStatus === "followed" ? "text-red-500 hover:text-red-600" : ""} transition-colors`}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${followStatus === "followed" ? "fill-red-500" : ""}`} />
                    {followStatus === "followed" ? "已关注" : "关注"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    分享
                  </Button>
                </div>
                <Dialog open={isReservationDialogOpen} onOpenChange={setIsReservationDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>立即预约</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>预约确认</DialogTitle>
                      <DialogDescription>您正在预约参加"{activityData.title}"活动</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">活动信息：</p>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{activityData.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{activityData.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{activityData.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-destructive">注意事项：</p>
                        <p className="text-sm">
                          1. 请确保您能够准时参加，若无法参加请提前取消预约。
                          <br />
                          2. 无故缺席将记录违约，影响后续活动预约。
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsReservationDialogOpen(false)}>
                        取消
                      </Button>
                      <Button onClick={handleReservation}>确认预约</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardFooter>
          </Card>

          <Card className="shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                活动评论
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {activityData.comments.map((comment) => (
                <div key={comment.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{comment.user.name}</span>
                        <span className="text-xs text-muted-foreground">{comment.user.department}</span>
                      </div>
                      <p className="text-sm mb-2">{comment.content}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{comment.time}</span>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                          <ThumbsUp className="h-3.5 w-3.5" />
                          {comment.likes}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Textarea
                  placeholder="写下你的评论..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="mb-2 resize-none"
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button onClick={handleSubmitComment}>发布评论</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="text-lg">联系方式</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">联系人</p>
                  <p className="font-medium">{activityData.contactPerson}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">联系电话</p>
                  <p className="font-medium">{activityData.contactPhone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">电子邮箱</p>
                  <p className="font-medium">{activityData.contactEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="text-lg">相关活动推荐</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg overflow-hidden border group">
                <div className="relative aspect-video">
                  <img
                    src="/placeholder.svg?height=120&width=240"
                    alt="活动图片"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary">学术</Badge>
                </div>
                <div className="p-3">
                  <h4 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                    古典文学解读讲座
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">2025年4月5日 14:00-16:00</p>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden border group">
                <div className="relative aspect-video">
                  <img
                    src="/placeholder.svg?height=120&width=240"
                    alt="活动图片"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary">学术</Badge>
                </div>
                <div className="p-3">
                  <h4 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                    文学创作工作坊
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">2025年4月12日 15:00-17:00</p>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden border group">
                <div className="relative aspect-video">
                  <img
                    src="/placeholder.svg?height=120&width=240"
                    alt="活动图片"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary">学术</Badge>
                </div>
                <div className="p-3">
                  <h4 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                    青年作家分享会
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">2025年3月30日 19:00-21:00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


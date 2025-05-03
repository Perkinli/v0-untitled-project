"use client"

import { useState } from "react"
import {
  Activity,
  Award,
  Lock,
  HelpCircle,
  Palette,
  Calendar,
  CheckCircle,
  XCircle,
  Settings,
  BookOpen,
  GraduationCap,
  Bell,
  Shield,
  UserCog,
  History,
  Star,
  Download,
  Share2,
  LogOut,
  Trophy,
  Heart,
  Music,
  Phone,
  Mail,
  MessageSquare,
  Languages,
  MapPin,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function StudentProfile() {
  const [darkMode, setDarkMode] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="space-y-6">
      {/* 顶部个人信息卡片 */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 border-4 border-primary/10">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="学生头像" />
                <AvatarFallback>张三</AvatarFallback>
              </Avatar>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-3.5 w-3.5" />
                  更换头像
                </Button>
              </div>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h2 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
                  张三
                  <Badge variant="outline" className="ml-2">
                    学生
                  </Badge>
                </h2>
                <p className="text-muted-foreground">材料科学与工程学院 · 材料2021-3班</p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <GraduationCap className="h-3 w-3" />
                  大三学生
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  学号: 2021XXXXX
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  活跃用户
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col items-center p-2 rounded-md bg-primary/5">
                  <span className="text-2xl font-bold text-primary">12</span>
                  <span className="text-xs text-muted-foreground">预约次数</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-md bg-primary/5">
                  <span className="text-2xl font-bold text-primary">10</span>
                  <span className="text-xs text-muted-foreground">参与次数</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-md bg-destructive/5">
                  <span className="text-2xl font-bold text-destructive">1</span>
                  <span className="text-xs text-muted-foreground">违约次数</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center gap-2">
                <UserCog className="h-4 w-4" />
                编辑资料
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                退出登录
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧导航 */}
        <Card className="lg:col-span-1 shadow-sm border border-gray-100">
          <CardContent className="p-4">
            <Tabs defaultValue="profile" orientation="vertical" onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex flex-col h-auto items-stretch bg-transparent space-y-1">
                <TabsTrigger value="profile" className="justify-start text-left px-3 py-2 h-auto">
                  <UserCog className="h-4 w-4 mr-2" />
                  个人资料
                </TabsTrigger>
                <TabsTrigger value="activities" className="justify-start text-left px-3 py-2 h-auto">
                  <Calendar className="h-4 w-4 mr-2" />
                  活动记录
                </TabsTrigger>
                <TabsTrigger value="achievements" className="justify-start text-left px-3 py-2 h-auto">
                  <Award className="h-4 w-4 mr-2" />
                  成就徽章
                </TabsTrigger>
                <TabsTrigger value="settings" className="justify-start text-left px-3 py-2 h-auto">
                  <Settings className="h-4 w-4 mr-2" />
                  账户设置
                </TabsTrigger>
                <TabsTrigger value="help" className="justify-start text-left px-3 py-2 h-auto">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  帮助与反馈
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* 右侧内容区域 */}
        <div className="lg:col-span-3 space-y-6">
          {/* 个人资料 */}
          {activeTab === "profile" && (
            <Card className="shadow-sm border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCog className="h-5 w-5" />
                  个人资料
                </CardTitle>
                <CardDescription>查看和管理您的个人信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">基本信息</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label>姓名</Label>
                        <div className="flex items-center justify-between">
                          <span>张三</span>
                          <Button variant="ghost" size="sm">
                            修改
                          </Button>
                        </div>
                        <Separator />
                      </div>
                      <div className="space-y-2">
                        <Label>学号</Label>
                        <div className="flex items-center justify-between">
                          <span>2021XXXXX</span>
                          <Badge variant="outline">不可修改</Badge>
                        </div>
                        <Separator />
                      </div>
                      <div className="space-y-2">
                        <Label>性别</Label>
                        <div className="flex items-center justify-between">
                          <span>男</span>
                          <Button variant="ghost" size="sm">
                            修改
                          </Button>
                        </div>
                        <Separator />
                      </div>
                      <div className="space-y-2">
                        <Label>出生日期</Label>
                        <div className="flex items-center justify-between">
                          <span>2003-05-15</span>
                          <Button variant="ghost" size="sm">
                            修改
                          </Button>
                        </div>
                        <Separator />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">联系方式</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label>手机号码</Label>
                        <div className="flex items-center justify-between">
                          <span>138****5678</span>
                          <Button variant="ghost" size="sm">
                            修改
                          </Button>
                        </div>
                        <Separator />
                      </div>
                      <div className="space-y-2">
                        <Label>电子邮箱</Label>
                        <div className="flex items-center justify-between">
                          <span>zhangsan@example.com</span>
                          <Button variant="ghost" size="sm">
                            修改
                          </Button>
                        </div>
                        <Separator />
                      </div>
                      <div className="space-y-2">
                        <Label>宿舍地址</Label>
                        <div className="flex items-center justify-between">
                          <span>学生公寓 3号楼 422室</span>
                          <Button variant="ghost" size="sm">
                            修改
                          </Button>
                        </div>
                        <Separator />
                      </div>
                      <div className="space-y-2">
                        <Label>紧急联系人</Label>
                        <div className="flex items-center justify-between">
                          <span>张父 (139****1234)</span>
                          <Button variant="ghost" size="sm">
                            修改
                          </Button>
                        </div>
                        <Separator />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">学术信息</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>院系</Label>
                      <div className="flex items-center justify-between">
                        <span>材料科学与工程学院</span>
                        <Badge variant="outline">不可修改</Badge>
                      </div>
                      <Separator />
                    </div>
                    <div className="space-y-2">
                      <Label>专业</Label>
                      <div className="flex items-center justify-between">
                        <span>材料科学与工程</span>
                        <Badge variant="outline">不可修改</Badge>
                      </div>
                      <Separator />
                    </div>
                    <div className="space-y-2">
                      <Label>班级</Label>
                      <div className="flex items-center justify-between">
                        <span>材料2021-3班</span>
                        <Badge variant="outline">不可修改</Badge>
                      </div>
                      <Separator />
                    </div>
                    <div className="space-y-2">
                      <Label>学年</Label>
                      <div className="flex items-center justify-between">
                        <span>大三</span>
                        <Badge variant="outline">不可修改</Badge>
                      </div>
                      <Separator />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>保存更改</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 活动记录 */}
          {activeTab === "activities" && (
            <Card className="shadow-sm border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  活动记录
                </CardTitle>
                <CardDescription>查看您的活动参与历史和即将参加的活动</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="history">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="history" className="flex items-center gap-1">
                      <History className="h-4 w-4" />
                      参与历史
                    </TabsTrigger>
                    <TabsTrigger value="upcoming" className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      即将参加
                    </TabsTrigger>
                    <TabsTrigger value="violation" className="flex items-center gap-1">
                      <XCircle className="h-4 w-4" />
                      违约记录
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="history" className="space-y-4 pt-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">校园歌手初赛</h4>
                        <Badge>文艺</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">2025年2月25日 18:30-21:00</p>
                      <p className="text-sm text-muted-foreground mb-2">地点：大学生活动中心</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-sm text-green-500">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          已参加
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            查看详情
                          </Button>
                          <Button size="sm" variant="outline">
                            <Star className="h-3.5 w-3.5 mr-1" />
                            评价
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">人工智能讲座</h4>
                        <Badge>学术</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">2025年3月10日 14:00-16:00</p>
                      <p className="text-sm text-muted-foreground mb-2">地点：中心校区图书馆报告厅</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-sm text-green-500">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          已参加
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            查看详情
                          </Button>
                          <Button size="sm" variant="outline">
                            <Star className="h-3.5 w-3.5 mr-1" />
                            评价
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">校园马拉松</h4>
                        <Badge>体育</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">2025年1月15日 08:00-12:00</p>
                      <p className="text-sm text-muted-foreground mb-2">地点：校园环形跑道</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-sm text-green-500">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          已参加
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            查看详情
                          </Button>
                          <Button size="sm" variant="outline">
                            <Star className="h-3.5 w-3.5 mr-1" />
                            评价
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="upcoming" className="space-y-4 pt-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">文学讲座：当代文学的发展与趋势</h4>
                        <Badge>学术</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">2025年3月25日 14:00-16:00</p>
                      <p className="text-sm text-muted-foreground mb-2">地点：中心校区图书馆报告厅</p>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-blue-500 flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          即将开始
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            查看详情
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                            取消预约
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">篮球友谊赛：材料vs生物</h4>
                        <Badge>体育</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">2025年3月28日 15:00-17:00</p>
                      <p className="text-sm text-muted-foreground mb-2">地点：北区篮球场</p>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-blue-500 flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          即将开始
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            查看详情
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                            取消预约
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">校园歌手决赛</h4>
                        <Badge>文艺</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">2025年4月15日 19:00-21:30</p>
                      <p className="text-sm text-muted-foreground mb-2">地点：大学生活动中心</p>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-blue-500 flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          即将开始
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            查看详情
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                            取消预约
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="violation" className="space-y-4 pt-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">校园环保宣传活动</h4>
                        <Badge variant="destructive">未参加</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">2025年3月15日 09:00-11:00</p>
                      <p className="text-sm text-muted-foreground mb-2">地点：中心校区广场</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-sm text-destructive">
                          <XCircle className="mr-1 h-4 w-4" />
                          预约后未到场
                        </div>
                        <Button size="sm" variant="outline">
                          申诉
                        </Button>
                      </div>
                    </div>

                    <div className="p-8 text-center text-muted-foreground">
                      <p>除上述记录外，您没有其他违约记录</p>
                      <p className="text-sm mt-2">请继续保持良好的活动参与习惯</p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <h3 className="font-medium">活动参与统计</h3>
                    <p className="text-sm text-muted-foreground">您的活动参与情况概览</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    导出记录
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>活动参与率</span>
                      <span className="font-medium">83%</span>
                    </div>
                    <Progress value={83} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-2xl font-bold text-primary">12</p>
                      <p className="text-xs text-muted-foreground">总预约次数</p>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-2xl font-bold text-green-500">10</p>
                      <p className="text-xs text-muted-foreground">已参加次数</p>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-2xl font-bold text-blue-500">3</p>
                      <p className="text-xs text-muted-foreground">即将参加</p>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <p className="text-2xl font-bold text-destructive">1</p>
                      <p className="text-xs text-muted-foreground">违约次数</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 成就徽章 */}
          {activeTab === "achievements" && (
            <Card className="shadow-sm border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  成就徽章
                </CardTitle>
                <CardDescription>您获得的活动成就和徽章</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">已获得的成就</h3>

                    <div className="rounded-lg border p-4 flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">活动先锋</h4>
                        <p className="text-sm text-muted-foreground">参与10次活动</p>
                        <p className="text-xs text-primary mt-1">获得于 2025年3月15日</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="rounded-lg border p-4 flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">学术爱好者</h4>
                        <p className="text-sm text-muted-foreground">参与5次学术类活动</p>
                        <p className="text-xs text-primary mt-1">获得于 2025年2月20日</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">进行中的成就</h3>

                    <div className="rounded-lg border p-4 flex items-center gap-4 opacity-70">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Activity className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">活动达人</h4>
                        <p className="text-sm text-muted-foreground">参与20次活动</p>
                        <div className="mt-2">
                          <Progress value={50} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">进度: 10/20</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4 flex items-center gap-4 opacity-70">
                      <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                        <Trophy className="h-8 w-8 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">体育健将</h4>
                        <p className="text-sm text-muted-foreground">参与8次体育类活动</p>
                        <div className="mt-2">
                          <Progress value={25} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">进度: 2/8</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">未解锁的成就</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-lg border p-4 text-center opacity-50">
                      <div className="h-16 w-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
                        <Star className="h-8 w-8 text-gray-400" />
                      </div>
                      <h4 className="font-medium mt-2">五星评价者</h4>
                      <p className="text-xs text-muted-foreground">为10个活动提供评价</p>
                    </div>

                    <div className="rounded-lg border p-4 text-center opacity-50">
                      <div className="h-16 w-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
                        <Heart className="h-8 w-8 text-gray-400" />
                      </div>
                      <h4 className="font-medium mt-2">志愿者之星</h4>
                      <p className="text-xs text-muted-foreground">参与5次志愿活动</p>
                    </div>

                    <div className="rounded-lg border p-4 text-center opacity-50">
                      <div className="h-16 w-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
                        <Music className="h-8 w-8 text-gray-400" />
                      </div>
                      <h4 className="font-medium mt-2">文艺达人</h4>
                      <p className="text-xs text-muted-foreground">参与8次文艺活动</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <h3 className="font-medium">成就统计</h3>
                    <p className="text-sm text-muted-foreground">您已获得 2/10 个可用成就</p>
                  </div>
                  <Button variant="outline" size="sm">
                    查看所有成就
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 账户设置 */}
          {activeTab === "settings" && (
            <Card className="shadow-sm border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  账户设置
                </CardTitle>
                <CardDescription>管理您的账户和应用设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">安全设置</h3>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Lock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">密码管理</h4>
                          <p className="text-sm text-muted-foreground">上次更新: 2025年1月15日</p>
                        </div>
                      </div>
                      <Button>修改密码</Button>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">手机绑定</h4>
                          <p className="text-sm text-muted-foreground">已绑定: 138****5678</p>
                        </div>
                      </div>
                      <Button variant="outline">更换手机</Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">双重认证</h4>
                          <p className="text-sm text-muted-foreground">未启用</p>
                        </div>
                      </div>
                      <Button variant="outline">启用</Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">通知设置</h3>

                  <div className="rounded-lg border p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bell className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">活动提醒</h4>
                          <p className="text-sm text-muted-foreground">接收活动开始前的提醒通知</p>
                        </div>
                      </div>
                      <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">邮件通知</h4>
                          <p className="text-sm text-muted-foreground">接收活动相关的邮件通知</p>
                        </div>
                      </div>
                      <Switch checked={true} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">系统消息</h4>
                          <p className="text-sm text-muted-foreground">接收系统公告和更新通知</p>
                        </div>
                      </div>
                      <Switch checked={true} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">个性化设置</h3>

                  <div className="rounded-lg border p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Palette className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">深色模式</h4>
                          <p className="text-sm text-muted-foreground">切换深色/浅色主题</p>
                        </div>
                      </div>
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Languages className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">语言设置</h4>
                          <p className="text-sm text-muted-foreground">当前: 简体中文</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">更改</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>简体中文</DropdownMenuItem>
                          <DropdownMenuItem>English</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <Button variant="destructive" className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    退出登录
                  </Button>
                  <Button>保存设置</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 帮助与反馈 */}
          {activeTab === "help" && (
            <Card className="shadow-sm border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  帮助与反馈
                </CardTitle>
                <CardDescription>获取帮助或提交反馈</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">常见问题</h3>

                  <div className="rounded-lg border divide-y">
                    <div className="p-4">
                      <h4 className="font-medium mb-2">如何预约活动？</h4>
                      <p className="text-sm text-muted-foreground">
                        您可以在首页浏览活动列表，点击"立即预约"按钮进行活动预约。预约成功后，您可以在"我的"页面查看预约记录。
                      </p>
                    </div>

                    <div className="p-4">
                      <h4 className="font-medium mb-2">如何取消预约？</h4>
                      <p className="text-sm text-muted-foreground">
                        您可以在"我的"页面的"即将参加"标签中找到已预约的活动，点击"取消预约"按钮进行取消。请注意，活动开始前24小时内取消预约可能会被记录为违约。
                      </p>
                    </div>

                    <div className="p-4">
                      <h4 className="font-medium mb-2">违约记录会有什么影响？</h4>
                      <p className="text-sm text-muted-foreground">
                        累计3次违约记录将会限制您一个月内的活动预约权限。如有特殊情况导致的违约，可以提交申诉。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">提交反馈</h3>

                  <div className="rounded-lg border p-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="feedback-type">反馈类型</Label>
                        <Select>
                          <SelectTrigger id="feedback-type">
                            <SelectValue placeholder="选择反馈类型" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bug">系统问题</SelectItem>
                            <SelectItem value="suggestion">功能建议</SelectItem>
                            <SelectItem value="complaint">投诉</SelectItem>
                            <SelectItem value="other">其他</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="feedback-content">反馈内容</Label>
                        <Textarea
                          id="feedback-content"
                          placeholder="请详细描述您的问题或建议..."
                          className="min-h-[120px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-info">联系方式（选填）</Label>
                        <Input id="contact-info" placeholder="请留下您的联系方式，以便我们回复" />
                      </div>

                      <div className="flex justify-end">
                        <Button>提交反馈</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">联系我们</h3>

                  <div className="rounded-lg border p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">电子邮箱</h4>
                        <p className="text-sm">support@example.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">联系电话</h4>
                        <p className="text-sm">400-123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">在线客服</h4>
                        <p className="text-sm">工作时间: 9:00-18:00</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">线下服务点</h4>
                        <p className="text-sm">学生服务中心 102室</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}


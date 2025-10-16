"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Users, Settings, Brain, Shield, Plus, Edit, Trash2 } from "lucide-react"
import { getSecuritySummary } from "@/lib/profile"

export default function AdministrationPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [security, setSecurity] = useState<{
    password_last_changed_at?: string
    recent_events?: { type: string; message?: string; created_at: string }[]
  } | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const s = await getSecuritySummary()
        if (!mounted) return
        setSecurity(s)
      } catch (e) {
        // ignore errors, keep static placeholders
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const users = [
    {
      id: "U-001",
      name: "Priya Sharma",
      email: "priya.sharma@company.co.in",
      role: "Finance Manager",
      department: "Finance",
      status: "Active",
      lastLogin: "2024-01-15T14:30:00Z",
      permissions: ["Invoice Review", "Payment Approval", "User Management"],
    },
    {
      id: "U-002",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@company.co.in",
      role: "AP Specialist",
      department: "Accounting",
      status: "Active",
      lastLogin: "2024-01-15T09:15:00Z",
      permissions: ["Invoice Processing", "Vendor Management"],
    },
    {
      id: "U-003",
      name: "Anita Patel",
      email: "anita.patel@company.co.in",
      role: "CFO",
      department: "Executive",
      status: "Active",
      lastLogin: "2024-01-14T16:45:00Z",
      permissions: ["Full Access", "System Administration"],
    },
    {
      id: "U-004",
      name: "Vikram Singh",
      email: "vikram.singh@company.co.in",
      role: "Senior Accountant",
      department: "Finance",
      status: "Active",
      lastLogin: "2024-01-15T11:20:00Z",
      permissions: ["Invoice Processing", "Report Generation"],
    },
    {
      id: "U-005",
      name: "Deepika Reddy",
      email: "deepika.reddy@company.co.in",
      role: "IT Administrator",
      department: "IT",
      status: "Active",
      lastLogin: "2024-01-15T08:45:00Z",
      permissions: ["System Administration", "User Management", "AI Model Management"],
    },
  ]

  const aiModels = [
    {
      id: "M-001",
      name: "Invoice Data Extraction",
      type: "OCR + NLP",
      status: "Active",
      accuracy: 94.2,
      processedToday: 156,
      lastTrained: "2024-01-10",
      version: "v2.1.3",
    },
    {
      id: "M-002",
      name: "PO Matching Engine",
      type: "Machine Learning",
      status: "Active",
      accuracy: 89.7,
      processedToday: 89,
      lastTrained: "2024-01-08",
      version: "v1.8.2",
    },
    {
      id: "M-003",
      name: "Duplicate Detection",
      type: "Deep Learning",
      status: "Training",
      accuracy: 96.1,
      processedToday: 0,
      lastTrained: "2024-01-12",
      version: "v3.0.1",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-secondary text-secondary-foreground"
      case "Training":
        return "bg-warning text-warning-foreground"
      case "Inactive":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Administration</h1>
          <p className="text-muted-foreground">Manage users, AI models, and system settings</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="ai-models">AI Model Hub</TabsTrigger>
          <TabsTrigger value="system">System Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">22</div>
                <p className="text-xs text-muted-foreground">92% active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Departments</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Finance, IT, HR, Ops, Exec</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Roles</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Different permission levels</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="specialist">Specialist</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Search users..." className="w-64" />
                  <Button className="bg-secondary hover:bg-secondary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`/abstract-geometric-shapes.png?height=48&width=48&query=${user.name}`} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-foreground">{user.name}</h3>
                            <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <div>{user.email}</div>
                            <div>
                              {user.role} • {user.department}
                            </div>
                            <div>Last login: {new Date(user.lastLogin).toLocaleDateString()}</div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {user.permissions.map((permission) => (
                              <Badge key={permission} variant="outline" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-models" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Models</CardTitle>
                <Brain className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 production, 1 training</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Accuracy</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">93.3%</div>
                <p className="text-xs text-muted-foreground">+2.1% this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Processed Today</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground">Documents processed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Model Health</CardTitle>
                <Brain className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Excellent</div>
                <p className="text-xs text-muted-foreground">All systems operational</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>AI Model Hub</CardTitle>
                  <CardDescription>Monitor and manage AI model performance</CardDescription>
                </div>
                <Button className="bg-secondary hover:bg-secondary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Deploy Model
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiModels.map((model) => (
                  <div key={model.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{model.name}</h3>
                          <Badge className={getStatusColor(model.status)}>{model.status}</Badge>
                          <Badge variant="outline">{model.type}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Accuracy:</span> {model.accuracy}%
                          </div>
                          <div>
                            <span className="font-medium">Processed Today:</span> {model.processedToday}
                          </div>
                          <div>
                            <span className="font-medium">Last Trained:</span>{" "}
                            {new Date(model.lastTrained).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">Version:</span> {model.version}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Metrics
                        </Button>
                        <Button variant="outline" size="sm">
                          Retrain
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system-wide settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-approve invoices under $500</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically approve invoices below the threshold
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email notifications</Label>
                    <div className="text-sm text-muted-foreground">Send email alerts for important events</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Require dual approval for payments over $10,000</Label>
                    <div className="text-sm text-muted-foreground">Require two approvers for high-value payments</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">AI confidence threshold</Label>
                    <div className="text-sm text-muted-foreground">Minimum confidence score for auto-processing</div>
                  </div>
                  <Select defaultValue="85">
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="70">70%</SelectItem>
                      <SelectItem value="80">80%</SelectItem>
                      <SelectItem value="85">85%</SelectItem>
                      <SelectItem value="90">90%</SelectItem>
                      <SelectItem value="95">95%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Password Last Changed</CardTitle>
                <Shield className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {security?.password_last_changed_at
                    ? new Date(security.password_last_changed_at).toLocaleDateString()
                    : "—"}
                </div>
                <p className="text-xs text-muted-foreground">Account password rotation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Security Events</CardTitle>
                <Shield className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{security?.recent_events?.length ?? 0}</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Audit Logging</CardTitle>
                <Shield className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Enabled</div>
                <p className="text-xs text-muted-foreground">System event tracking</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Security Policies</CardTitle>
              <CardDescription>Configure security settings and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">IP whitelist enabled</Label>
                    <div className="text-sm text-muted-foreground">Restrict access to approved IP addresses</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Audit logging</Label>
                    <div className="text-sm text-muted-foreground">Log all user actions and system events</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Security Events</CardTitle>
              <CardDescription>Latest security-related activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(security?.recent_events ?? []).map((evt, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 border rounded-lg">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        evt.type === "login_success"
                          ? "bg-secondary"
                          : evt.type === "token_reuse_detected"
                          ? "bg-warning"
                          : "bg-muted"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{evt.type.replace(/_/g, " ")}</p>
                        <span className="text-sm text-muted-foreground">
                          {new Date(evt.created_at).toLocaleString()}
                        </span>
                      </div>
                      {evt.message && (
                        <p className="text-sm text-muted-foreground">{evt.message}</p>
                      )}
                    </div>
                  </div>
                ))}
                {!security?.recent_events?.length && (
                  <div className="text-sm text-muted-foreground">No recent security events.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

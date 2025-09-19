"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, FileCheck, TrendingUp, CheckCircle, AlertCircle, XCircle } from "lucide-react"

const kpiData = [
  {
    title: "Invoices Needing Review",
    value: "12",
    description: "Pending your approval",
    icon: AlertCircle,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    title: "Total Pending Payment",
    value: "₹37,52,400",
    description: "Awaiting payment",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Average Processing Time",
    value: "2.4 hrs",
    description: "Down from 3.1 hrs",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Automation Rate",
    value: "87%",
    description: "Up 5% from last month",
    icon: TrendingUp,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
]

const recentActivity = [
  {
    id: 1,
    action: "Invoice #INV-2024-001 approved",
    timestamp: "2 minutes ago",
    icon: CheckCircle,
    iconColor: "text-green-600",
  },
  {
    id: 2,
    action: "New invoice received from Tata Consultancy Services",
    timestamp: "15 minutes ago",
    icon: FileCheck,
    iconColor: "text-blue-600",
  },
  {
    id: 3,
    action: "Invoice #INV-2024-002 flagged for review",
    timestamp: "1 hour ago",
    icon: AlertCircle,
    iconColor: "text-amber-600",
  },
  {
    id: 4,
    action: "Payment confirmed for Invoice #INV-2024-003",
    timestamp: "2 hours ago",
    icon: DollarSign,
    iconColor: "text-green-600",
  },
  {
    id: 5,
    action: "Invoice #INV-2024-004 rejected",
    timestamp: "3 hours ago",
    icon: XCircle,
    iconColor: "text-red-600",
  },
]

const invoiceStatusData = [
  { status: "Approved", count: 45, color: "bg-green-500" },
  { status: "Needs Review", count: 12, color: "bg-amber-500" },
  { status: "Paid", count: 38, color: "bg-blue-500" },
  { status: "Error", count: 3, color: "bg-red-500" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your invoices.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
              <div className={`rounded-full p-2 ${kpi.bgColor}`}>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Invoice Status Breakdown */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Invoice Status Breakdown</CardTitle>
            <CardDescription>Current status distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {invoiceStatusData.map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${item.color}`} />
                  <span className="text-sm font-medium">{item.status}</span>
                </div>
                <Badge variant="secondary">{item.count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

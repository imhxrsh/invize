"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, Clock, CheckCircle, Eye, MessageSquare, FileText } from "lucide-react"

export default function ResolutionQueuePage() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)

  const issues = [
    {
      id: "RQ-001",
      type: "Data Extraction Error",
      invoice: "INV-2024-0156",
      vendor: "TechCorp Solutions",
      priority: "High",
      status: "Open",
      confidence: 45,
      description: "Unable to extract vendor address from scanned document",
      assignedTo: "Sarah Chen",
      createdAt: "2024-01-15T10:30:00Z",
      dueDate: "2024-01-16T17:00:00Z",
    },
    {
      id: "RQ-002",
      type: "PO Matching Failed",
      invoice: "INV-2024-0157",
      vendor: "Office Supplies Inc",
      priority: "Medium",
      status: "In Progress",
      confidence: 62,
      description: "Purchase order number doesn't match any existing POs",
      assignedTo: "Mike Rodriguez",
      createdAt: "2024-01-15T09:15:00Z",
      dueDate: "2024-01-17T12:00:00Z",
    },
    {
      id: "RQ-003",
      type: "Duplicate Detection",
      invoice: "INV-2024-0158",
      vendor: "Marketing Agency Pro",
      priority: "Low",
      status: "Resolved",
      confidence: 89,
      description: "Potential duplicate invoice detected",
      assignedTo: "Lisa Wang",
      createdAt: "2024-01-14T14:20:00Z",
      dueDate: "2024-01-18T16:00:00Z",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive text-destructive-foreground"
      case "Medium":
        return "bg-warning text-warning-foreground"
      case "Low":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-destructive text-destructive-foreground"
      case "In Progress":
        return "bg-warning text-warning-foreground"
      case "Resolved":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Resolution Queue</h1>
          <p className="text-muted-foreground">Manage and resolve invoice processing issues</p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Issues</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Search issues..." className="w-64" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">-1 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">-0.3h from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Issues Queue</CardTitle>
              <CardDescription>Review and resolve processing issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issues.map((issue) => (
                  <div
                    key={issue.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedIssue === issue.id ? "border-primary bg-muted/30" : "border-border"
                    }`}
                    onClick={() => setSelectedIssue(issue.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{issue.id}</span>
                          <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
                          <Badge className={getStatusColor(issue.status)}>{issue.status}</Badge>
                        </div>
                        <h3 className="font-medium text-foreground">{issue.type}</h3>
                        <p className="text-sm text-muted-foreground">{issue.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Invoice: {issue.invoice}</span>
                          <span>Vendor: {issue.vendor}</span>
                          <span>Confidence: {issue.confidence}%</span>
                        </div>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <div>Assigned to: {issue.assignedTo}</div>
                        <div>Due: {new Date(issue.dueDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
              <CardDescription>
                {selectedIssue ? "Review and resolve the selected issue" : "Select an issue to view details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedIssue ? (
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="document">Document</TabsTrigger>
                    <TabsTrigger value="actions">Actions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Issue Type</label>
                        <p className="text-sm text-muted-foreground">Data Extraction Error</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Confidence Score</label>
                        <p className="text-sm text-muted-foreground">45%</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Assigned To</label>
                        <p className="text-sm text-muted-foreground">Sarah Chen</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Created</label>
                        <p className="text-sm text-muted-foreground">Jan 15, 2024 10:30 AM</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="document" className="space-y-4">
                    <div className="border rounded-lg p-4 bg-muted/20">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm font-medium">INV-2024-0156.pdf</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        View Document
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="actions" className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Resolution Notes</label>
                        <Textarea placeholder="Add resolution notes..." className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Assign To</label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select team member" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sarah">Sarah Chen</SelectItem>
                            <SelectItem value="mike">Mike Rodriguez</SelectItem>
                            <SelectItem value="lisa">Lisa Wang</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-secondary hover:bg-secondary/90">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Comment
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select an issue from the queue to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

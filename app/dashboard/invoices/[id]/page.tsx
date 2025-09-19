"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Check, X, CheckCircle, XCircle, Clock } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data for the invoice
const invoiceData = {
  id: "INV-2024-001",
  vendor: "Acme Corporation",
  amount: "$2,450.00",
  status: "needs-review",
  dateReceived: "2024-01-15",
  extractedData: {
    vendorName: "Acme Corporation",
    invoiceNumber: "AC-2024-0115",
    date: "2024-01-15",
    totalAmount: "2450.00",
    confidence: {
      vendorName: 98,
      invoiceNumber: 95,
      date: 99,
      totalAmount: 97,
    },
  },
  poMatch: {
    poNumber: "PO-2024-001",
    matches: [
      { field: "Vendor", status: "match", value: "Acme Corporation" },
      { field: "Amount", status: "match", value: "$2,450.00" },
      { field: "Description", status: "mismatch", value: "Office Equipment vs Office Supplies" },
      { field: "Date", status: "match", value: "2024-01-15" },
    ],
  },
  activityLog: [
    {
      id: 1,
      action: "Invoice uploaded",
      timestamp: "2024-01-15 09:30 AM",
      user: "System",
      status: "info",
    },
    {
      id: 2,
      action: "AI extraction completed",
      timestamp: "2024-01-15 09:31 AM",
      user: "AI Agent",
      status: "success",
    },
    {
      id: 3,
      action: "PO matching performed",
      timestamp: "2024-01-15 09:32 AM",
      user: "AI Agent",
      status: "warning",
    },
    {
      id: 4,
      action: "Flagged for manual review",
      timestamp: "2024-01-15 09:33 AM",
      user: "System",
      status: "info",
    },
  ],
}

export default function InvoiceDetailPage() {
  const params = useParams()
  const [extractedData, setExtractedData] = useState(invoiceData.extractedData)

  const handleInputChange = (field: string, value: string) => {
    setExtractedData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleApprove = () => {
    // Handle approve logic
    console.log("Invoice approved")
  }

  const handleReject = () => {
    // Handle reject logic
    console.log("Invoice rejected")
  }

  const getMatchIcon = (status: string) => {
    switch (status) {
      case "match":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "mismatch":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-amber-600" />
    }
  }

  const getActivityIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <Clock className="h-4 w-4 text-amber-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-blue-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/invoices">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Invoices
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invoice Review</h1>
          <p className="text-muted-foreground">Review and verify extracted invoice data</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Panel - Document Viewer */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Original Document</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📄</span>
                </div>
                <p className="text-sm text-muted-foreground">Invoice PDF Preview</p>
                <p className="text-xs text-muted-foreground mt-1">{invoiceData.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Center Panel - Extracted Data */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Extracted Data</CardTitle>
            <div className="flex gap-2">
              <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                <Check className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button
                onClick={handleReject}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
              >
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vendorName">Vendor Name</Label>
              <Input
                id="vendorName"
                value={extractedData.vendorName}
                onChange={(e) => handleInputChange("vendorName", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">{extractedData.confidence.vendorName}% confidence</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={extractedData.invoiceNumber}
                onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">{extractedData.confidence.invoiceNumber}% confidence</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={extractedData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">{extractedData.confidence.date}% confidence</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalAmount">Total Amount</Label>
              <Input
                id="totalAmount"
                value={extractedData.totalAmount}
                onChange={(e) => handleInputChange("totalAmount", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">{extractedData.confidence.totalAmount}% confidence</p>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Verification & Logs */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Verification & Logs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* PO/GRN Match */}
            <div>
              <h3 className="font-semibold mb-3">PO/GRN Match</h3>
              <div className="space-y-3">
                {invoiceData.poMatch.matches.map((match, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getMatchIcon(match.status)}
                      <span className="text-sm font-medium">{match.field}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{match.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Activity Log */}
            <div>
              <h3 className="font-semibold mb-3">Activity Log</h3>
              <div className="space-y-3">
                {invoiceData.activityLog.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-0.5">{getActivityIcon(activity.status)}</div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{activity.timestamp}</span>
                        <span>•</span>
                        <span>{activity.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

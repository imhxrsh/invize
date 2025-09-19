"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Upload, Eye } from "lucide-react"
import Link from "next/link"

const invoiceData = [
  {
    id: "INV-2024-001",
    vendor: "Tata Consultancy Services",
    amount: "₹2,04,750",
    status: "needs-review",
    dateReceived: "2024-01-15",
  },
  {
    id: "INV-2024-002",
    vendor: "Infosys Technologies",
    amount: "₹1,00,200",
    status: "approved",
    dateReceived: "2024-01-14",
  },
  {
    id: "INV-2024-003",
    vendor: "Wipro Limited",
    amount: "₹29,250",
    status: "paid",
    dateReceived: "2024-01-13",
  },
  {
    id: "INV-2024-004",
    vendor: "HCL Technologies",
    amount: "₹4,17,500",
    status: "error",
    dateReceived: "2024-01-12",
  },
  {
    id: "INV-2024-005",
    vendor: "Tech Mahindra",
    amount: "₹74,270",
    status: "approved",
    dateReceived: "2024-01-11",
  },
  {
    id: "INV-2024-006",
    vendor: "Larsen & Toubro Infotech",
    amount: "₹2,67,200",
    status: "needs-review",
    dateReceived: "2024-01-10",
  },
  {
    id: "INV-2024-007",
    vendor: "Mindtree Limited",
    amount: "₹62,625",
    status: "paid",
    dateReceived: "2024-01-09",
  },
  {
    id: "INV-2024-008",
    vendor: "Mphasis Limited",
    amount: "₹1,25,250",
    status: "approved",
    dateReceived: "2024-01-08",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "needs-review":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Needs Review</Badge>
    case "approved":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
    case "paid":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Paid</Badge>
    case "error":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([])

  const filteredInvoices = invoiceData.filter((invoice) => {
    const matchesSearch =
      invoice.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab = activeTab === "all" || invoice.status === activeTab.replace("-", "-")

    return matchesSearch && matchesTab
  })

  const handleSelectInvoice = (invoiceId: string, checked: boolean) => {
    if (checked) {
      setSelectedInvoices([...selectedInvoices, invoiceId])
    } else {
      setSelectedInvoices(selectedInvoices.filter((id) => id !== invoiceId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedInvoices(filteredInvoices.map((invoice) => invoice.id))
    } else {
      setSelectedInvoices([])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground">Manage and review your invoices</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Upload className="mr-2 h-4 w-4" />
          Upload Invoice
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Invoice List</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="needs-review">Needs Review</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Received</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedInvoices.includes(invoice.id)}
                            onCheckedChange={(checked) => handleSelectInvoice(invoice.id, checked as boolean)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{invoice.vendor}</TableCell>
                        <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                        <TableCell className="font-semibold">{invoice.amount}</TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(invoice.dateReceived).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Link href={`/dashboard/invoices/${invoice.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredInvoices.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No invoices found matching your criteria.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

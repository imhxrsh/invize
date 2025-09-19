"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Download,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Zap,
} from "lucide-react";

const invoiceVolumeData = [
  { month: "Jul", invoices: 45, value: 1850000 },
  { month: "Aug", invoices: 52, value: 2100000 },
  { month: "Sep", invoices: 48, value: 1950000 },
  { month: "Oct", invoices: 61, value: 2450000 },
  { month: "Nov", invoices: 55, value: 2200000 },
  { month: "Dec", invoices: 67, value: 2750000 },
];

const topVendorsData = [
  { vendor: "TCS", spend: 1285200 },
  { vendor: "Infosys", spend: 1068000 },
  { vendor: "Wipro", spend: 805650 },
  { vendor: "HCL Tech", spend: 742900 },
  { vendor: "Tech Mahindra", spend: 601200 },
  { vendor: "L&T Infotech", spend: 567800 },
  { vendor: "Mindtree", spend: 450400 },
  { vendor: "Mphasis", spend: 408900 },
  { vendor: "Cognizant", spend: 350200 },
  { vendor: "Capgemini", spend: 317800 },
];

const processingSpeedData = [
  { time: "9:00", speed: 0.8 },
  { time: "10:00", speed: 0.7 },
  { time: "11:00", speed: 0.9 },
  { time: "12:00", speed: 1.1 },
  { time: "13:00", speed: 0.6 },
  { time: "14:00", speed: 0.8 },
  { time: "15:00", speed: 0.7 },
  { time: "16:00", speed: 0.9 },
];

const accuracyData = [
  { name: "Accurate", value: 96.8, color: "#10b981" },
  { name: "Needs Review", value: 2.7, color: "#f59e0b" },
  { name: "Errors", value: 0.5, color: "#ef4444" },
];

const aiAgentPerformanceData = [
  {
    name: "OCR Agent Alpha",
    type: "Data Extraction",
    documentsProcessed: 1256,
    avgProcessingTime: "0.8 sec",
    accuracy: "98.5%",
    uptime: "99.9%",
  },
  {
    name: "Validation Agent Beta",
    type: "PO Matching",
    documentsProcessed: 1142,
    avgProcessingTime: "1.2 sec",
    accuracy: "96.2%",
    uptime: "99.7%",
  },
  {
    name: "Classification Agent Gamma",
    type: "Document Classification",
    documentsProcessed: 1398,
    avgProcessingTime: "0.5 sec",
    accuracy: "94.8%",
    uptime: "99.8%",
  },
  {
    name: "Approval Agent Delta",
    type: "Auto-Approval",
    documentsProcessed: 834,
    avgProcessingTime: "0.3 sec",
    accuracy: "97.1%",
    uptime: "100%",
  },
];

const keyMetrics = [
  {
    title: "Total Invoices Processed",
    value: "1,247",
    description: "Last 30 days",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Total Value Processed",
    value: "₹20.04 Cr",
    description: "Last 30 days",
    icon: DollarSign,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "AI Processing Speed",
    value: "0.7s",
    description: "Average per document",
    icon: Zap,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "Error Rate",
    value: "2.3%",
    description: "Down 0.5% from last month",
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("last-6-months");

  const handleExportReport = () => {
    console.log("Exporting report...");
  };

  console.log("Invoice volume data:", invoiceVolumeData);
  console.log("Processing speed data:", processingSpeedData);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            AI performance insights and processing trends
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleExportReport}
            className="bg-primary hover:bg-primary/90"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        {keyMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`rounded-full p-2 ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {metric.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Invoice Volume Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Volume Over Time</CardTitle>
            <CardDescription>
              Number of invoices processed by AI agents in the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={invoiceVolumeData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--muted-foreground))"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="invoices"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: "#3b82f6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Processing Speed Chart */}
        <Card>
          <CardHeader>
            <CardTitle>AI Processing Speed</CardTitle>
            <CardDescription>
              Average processing time per document throughout the day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={processingSpeedData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--muted-foreground))"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="time"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(value) => [`${value}s`, "Processing Time"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="speed"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: "#10b981", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Vendors Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Vendors by Spend</CardTitle>
            <CardDescription>
              Highest spending vendors processed by AI (in INR)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topVendorsData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="vendor" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [
                      `₹${Number(value).toLocaleString("en-IN")}`,
                      "Spend",
                    ]}
                  />
                  <Bar
                    dataKey="spend"
                    fill="hsl(var(--secondary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Accuracy Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Processing Accuracy</CardTitle>
            <CardDescription>
              AI accuracy breakdown for processed documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={accuracyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {accuracyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value}%`, "Percentage"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {accuracyData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {entry.name}: {entry.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Agent Performance</CardTitle>
          <CardDescription>
            Performance metrics for AI processing agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Documents Processed</TableHead>
                  <TableHead>Avg Processing Time</TableHead>
                  <TableHead>Accuracy Rate</TableHead>
                  <TableHead>Uptime</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aiAgentPerformanceData.map((agent) => (
                  <TableRow key={agent.name}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {agent.type}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {agent.documentsProcessed.toLocaleString()}
                    </TableCell>
                    <TableCell>{agent.avgProcessingTime}</TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${
                          Number.parseFloat(agent.accuracy) >= 97
                            ? "text-secondary"
                            : Number.parseFloat(agent.accuracy) >= 95
                            ? "text-warning"
                            : "text-destructive"
                        }`}
                      >
                        {agent.accuracy}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${
                          Number.parseFloat(agent.uptime) >= 99.5
                            ? "text-secondary"
                            : Number.parseFloat(agent.uptime) >= 99
                            ? "text-warning"
                            : "text-destructive"
                        }`}
                      >
                        {agent.uptime}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

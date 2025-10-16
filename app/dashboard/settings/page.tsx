"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Plus, Mail, Database, CreditCard, Zap, Trash2, Edit } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getProfileContext, updateMe, updatePreferences } from "@/lib/profile"

// Mock data
const teamMembers = [
  { id: 1, name: "Priya Sharma", email: "priya@invize.in", role: "Admin" },
  { id: 2, name: "Rajesh Kumar", email: "rajesh@invize.in", role: "Manager" },
  { id: 3, name: "Anita Patel", email: "anita@invize.in", role: "Clerk" },
  { id: 4, name: "Vikram Singh", email: "vikram@invize.in", role: "Clerk" },
]

const integrations = [
  {
    id: "email",
    name: "Email Ingestion",
    description: "Automatically process invoices from email attachments",
    icon: Mail,
    connected: true,
    status: "active",
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Sync invoice data with your QuickBooks account",
    icon: Database,
    connected: true,
    status: "active",
  },
  {
    id: "azure",
    name: "Azure",
    description: "Connect to Azure services for enhanced processing",
    icon: Database,
    connected: false,
    status: "inactive",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Process payments and track payment status",
    icon: CreditCard,
    connected: false,
    status: "inactive",
  },
]

const automationRules = [
  {
    id: 1,
    name: "Auto-approve small invoices",
    description: "IF Invoice Amount < $500 AND PO Match = Perfect THEN Auto-approve",
    enabled: true,
  },
  {
    id: 2,
    name: "Flag high-value invoices",
    description: "IF Invoice Amount > $5000 THEN Require manager approval",
    enabled: true,
  },
  {
    id: 3,
    name: "Auto-reject duplicate invoices",
    description: "IF Invoice Number exists AND Vendor matches THEN Auto-reject",
    enabled: false,
  },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [preferences, setPreferences] = useState({
    theme: "system" as "light" | "dark" | "system",
    density: "comfortable" as "comfortable" | "compact",
    locale: "",
    time_zone: "",
    notifications_email: true,
    notifications_push: true,
  })
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPreferences, setSavingPreferences] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const ctx = await getProfileContext()
        if (!mounted) return
        const user = ctx?.user ?? ctx?.profile?.user
        const prefs = ctx?.preferences ?? ctx?.profile?.preferences
        if (user) {
          setProfileData((prev) => ({
            ...prev,
            name: user.full_name || "",
            email: user.email || "",
          }))
        }
        if (prefs) {
          setPreferences({
            theme: prefs.theme as any,
            density: prefs.density as any,
            locale: prefs.locale || "",
            time_zone: prefs.time_zone || "",
            notifications_email: Boolean(prefs.notifications_email),
            notifications_push: Boolean(prefs.notifications_push),
          })
        }
      } catch (e: any) {
        setError(e?.message || "Failed to load profile context")
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingProfile(true)
    setError(null)
    try {
      await updateMe({ full_name: profileData.name, locale: preferences.locale, time_zone: preferences.time_zone })
    } catch (e: any) {
      setError(e?.message || "Failed to update profile")
    } finally {
      setSavingProfile(false)
    }
  }

  const handlePreferencesUpdate = async () => {
    setSavingPreferences(true)
    setError(null)
    try {
      await updatePreferences({
        theme: preferences.theme,
        density: preferences.density,
        locale: preferences.locale,
        time_zone: preferences.time_zone,
        notifications: {
          email: preferences.notifications_email,
          push: preferences.notifications_push,
        },
      })
    } catch (e: any) {
      setError(e?.message || "Failed to update preferences")
    } finally {
      setSavingPreferences(false)
    }
  }

  const handleInviteUser = () => {
    console.log("Invite user")
  }

  const handleConnectIntegration = (integrationId: string) => {
    console.log(`Connect integration: ${integrationId}`)
  }

  const handleToggleRule = (ruleId: number) => {
    console.log(`Toggle rule: ${ruleId}`)
  }

  const handleCreateRule = () => {
    console.log("Create new rule")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="automation">Automation Rules</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and account settings</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      disabled
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={profileData.currentPassword}
                        onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={profileData.newPassword}
                        onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={profileData.confirmPassword}
                        onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {error && <span className="text-sm text-red-600">{error}</span>}
                  <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={savingProfile}>
                    {savingProfile ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Theme, density, locale, and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={preferences.theme}
                    onValueChange={(v) => setPreferences((p) => ({ ...p, theme: v as any }))}
                  >
                    <SelectTrigger id="theme" className="w-full">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="density">Density</Label>
                  <Select
                    value={preferences.density}
                    onValueChange={(v) => setPreferences((p) => ({ ...p, density: v as any }))}
                  >
                    <SelectTrigger id="density" className="w-full">
                      <SelectValue placeholder="Select density" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="compact">Compact</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="locale">Locale</Label>
                  <Input
                    id="locale"
                    value={preferences.locale}
                    onChange={(e) => setPreferences((p) => ({ ...p, locale: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time_zone">Time Zone</Label>
                  <Input
                    id="time_zone"
                    value={preferences.time_zone}
                    onChange={(e) => setPreferences((p) => ({ ...p, time_zone: e.target.value }))}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email notifications</Label>
                    <div className="text-sm text-muted-foreground">Send email alerts for important events</div>
                  </div>
                  <Switch
                    checked={preferences.notifications_email}
                    onCheckedChange={(v) => setPreferences((p) => ({ ...p, notifications_email: v }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push notifications</Label>
                    <div className="text-sm text-muted-foreground">Enable push notifications</div>
                  </div>
                  <Switch
                    checked={preferences.notifications_push}
                    onCheckedChange={(v) => setPreferences((p) => ({ ...p, notifications_push: v }))}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Button onClick={handlePreferencesUpdate} className="bg-primary hover:bg-primary/90" disabled={savingPreferences}>
                  {savingPreferences ? "Saving..." : "Save Preferences"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage user access and permissions</CardDescription>
              </div>
              <Button onClick={handleInviteUser} className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Invite New User
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell className="text-muted-foreground">{member.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              member.role === "Admin" ? "default" : member.role === "Manager" ? "secondary" : "outline"
                            }
                          >
                            {member.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect external services to enhance your workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {integrations.map((integration) => (
                  <Card key={integration.id} className="relative">
                    <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-muted p-2">
                          <integration.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{integration.name}</CardTitle>
                          <CardDescription className="text-sm">{integration.description}</CardDescription>
                        </div>
                      </div>
                      {integration.connected && (
                        <div className="absolute top-4 right-4">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex items-center justify-between">
                        <Badge variant={integration.connected ? "default" : "secondary"}>
                          {integration.connected ? "Connected" : "Not Connected"}
                        </Badge>
                        <Button
                          variant={integration.connected ? "outline" : "default"}
                          size="sm"
                          onClick={() => handleConnectIntegration(integration.id)}
                          className={integration.connected ? "" : "bg-primary hover:bg-primary/90"}
                        >
                          {integration.connected ? "Manage" : "Connect"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Rules Tab */}
        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Automation Rules</CardTitle>
                <CardDescription>Configure AI agent behavior and automated workflows</CardDescription>
              </div>
              <Button onClick={handleCreateRule} className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Create New Rule
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {automationRules.map((rule) => (
                <div key={rule.id} className="flex items-start justify-between rounded-lg border p-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">{rule.name}</h3>
                      <Badge variant={rule.enabled ? "default" : "secondary"}>
                        {rule.enabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                      {rule.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={rule.enabled} onCheckedChange={() => handleToggleRule(rule.id)} />
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Create New Rule</h3>
                <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 text-center">
                  <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium mb-2">Build Custom Automation</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create if-this-then-that rules to automate your invoice processing workflow
                  </p>
                  <Button onClick={handleCreateRule} className="bg-primary hover:bg-primary/90">
                    Start Building
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

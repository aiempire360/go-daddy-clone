"use client"

import { useState } from "react"
import {
  Globe,
  Calendar,
  Settings,
  RefreshCw,
  ExternalLink,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

interface Domain {
  id: string
  name: string
  status: "active" | "expiring" | "expired" | "pending"
  registrationDate: string
  expirationDate: string
  autoRenew: boolean
  privacy: boolean
  price: string
}

const mockDomains: Domain[] = [
  {
    id: "1",
    name: "myawesomesite.com",
    status: "active",
    registrationDate: "2023-01-15",
    expirationDate: "2025-01-15",
    autoRenew: true,
    privacy: true,
    price: "$12.99",
  },
  {
    id: "2",
    name: "techstartup.io",
    status: "expiring",
    registrationDate: "2022-03-20",
    expirationDate: "2024-03-20",
    autoRenew: false,
    privacy: false,
    price: "$49.99",
  },
  {
    id: "3",
    name: "creativestudio.co",
    status: "active",
    registrationDate: "2023-06-10",
    expirationDate: "2025-06-10",
    autoRenew: true,
    privacy: true,
    price: "$29.99",
  },
  {
    id: "4",
    name: "oldproject.net",
    status: "expired",
    registrationDate: "2021-12-05",
    expirationDate: "2023-12-05",
    autoRenew: false,
    privacy: false,
    price: "$14.99",
  },
  {
    id: "5",
    name: "newventure.ai",
    status: "pending",
    registrationDate: "2024-01-20",
    expirationDate: "2025-01-20",
    autoRenew: true,
    privacy: true,
    price: "$79.99",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "expiring":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    case "expired":
      return <AlertTriangle className="h-4 w-4 text-red-500" />
    case "pending":
      return <Clock className="h-4 w-4 text-blue-500" />
    default:
      return <CheckCircle className="h-4 w-4 text-gray-500" />
  }
}

const getStatusBadge = (status: string) => {
  const variants = {
    active: "default",
    expiring: "destructive",
    expired: "destructive",
    pending: "secondary",
  } as const

  return (
    <Badge variant={variants[status as keyof typeof variants] || "default"}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

const getDaysUntilExpiration = (expirationDate: string) => {
  const today = new Date()
  const expiry = new Date(expirationDate)
  const diffTime = expiry.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [domains] = useState<Domain[]>(mockDomains)

  const filteredDomains = domains.filter((domain) => {
    const matchesSearch = domain.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || domain.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: domains.length,
    active: domains.filter((d) => d.status === "active").length,
    expiring: domains.filter((d) => d.status === "expiring").length,
    expired: domains.filter((d) => d.status === "expired").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <Globe className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">DomainPro</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/dashboard" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-4">
                My Domains
              </Link>
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Search Domains
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
                Billing
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
                Support
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/">
                  <Plus className="h-4 w-4 mr-2" />
                  Register Domain
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Account Settings</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Domain Management</h1>
          <p className="text-gray-600">Manage your registered domains, renewals, and settings.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Domains</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-3xl font-bold text-green-600">{stats.active}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.expiring}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Expired</p>
                  <p className="text-3xl font-bold text-red-600">{stats.expired}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="domains" className="space-y-6">
          <TabsList>
            <TabsTrigger value="domains">My Domains</TabsTrigger>
            <TabsTrigger value="renewals">Renewals</TabsTrigger>
            <TabsTrigger value="transfers">Transfers</TabsTrigger>
          </TabsList>

          <TabsContent value="domains" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search domains..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="expiring">Expiring</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Domains List */}
            <div className="space-y-4">
              {filteredDomains.map((domain) => (
                <Card key={domain.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(domain.status)}
                          <h3 className="text-xl font-semibold text-gray-900">{domain.name}</h3>
                          {getStatusBadge(domain.status)}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Expires: {new Date(domain.expirationDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4" />
                            <span>Auto-renew: {domain.autoRenew ? "On" : "Off"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            <span>Privacy: {domain.privacy ? "Protected" : "Public"}</span>
                          </div>
                        </div>

                        {domain.status === "expiring" && (
                          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                            <p className="text-sm text-yellow-800">
                              <AlertTriangle className="h-4 w-4 inline mr-1" />
                              Expires in {getDaysUntilExpiration(domain.expirationDate)} days
                            </p>
                          </div>
                        )}

                        {domain.status === "expired" && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-800">
                              <AlertTriangle className="h-4 w-4 inline mr-1" />
                              Domain expired on {new Date(domain.expirationDate).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Manage
                        </Button>

                        {domain.status === "expiring" || domain.status === "expired" ? (
                          <Button size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Renew ({domain.price})
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit Site
                          </Button>
                        )}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>DNS Settings</DropdownMenuItem>
                            <DropdownMenuItem>Transfer Domain</DropdownMenuItem>
                            <DropdownMenuItem>Domain Privacy</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete Domain</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredDomains.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No domains found</h3>
                    <p className="text-gray-600 mb-6">
                      {searchTerm || statusFilter !== "all"
                        ? "Try adjusting your search or filter criteria."
                        : "You don't have any registered domains yet."}
                    </p>
                    <Button asChild>
                      <Link href="/">
                        <Plus className="h-4 w-4 mr-2" />
                        Register Your First Domain
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="renewals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Domain Renewals</CardTitle>
                <CardDescription>Manage your domain renewals and auto-renewal settings.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {domains
                    .filter((d) => d.status === "expiring" || d.status === "expired")
                    .map((domain) => (
                      <div key={domain.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-semibold">{domain.name}</div>
                          <div className="text-sm text-gray-600">
                            Expires: {new Date(domain.expirationDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{domain.price}/year</span>
                          <Button size="sm">Renew Now</Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transfers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Domain Transfers</CardTitle>
                <CardDescription>Transfer domains to or from DomainPro.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ExternalLink className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Transfers</h3>
                  <p className="text-gray-600 mb-4">You don't have any domain transfers in progress.</p>
                  <Button>Start Domain Transfer</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

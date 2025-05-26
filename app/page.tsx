"use client"

import type React from "react"

import { useState } from "react"
import { Search, Globe, Shield, Zap, Users, Star, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const popularExtensions = [
  { ext: ".com", price: "$12.99", popular: true },
  { ext: ".net", price: "$14.99", popular: false },
  { ext: ".org", price: "$13.99", popular: false },
  { ext: ".io", price: "$49.99", popular: true },
  { ext: ".co", price: "$29.99", popular: false },
  { ext: ".ai", price: "$79.99", popular: true },
]

const features = [
  {
    icon: Globe,
    title: "Global Domain Registry",
    description: "Access to 500+ domain extensions worldwide",
  },
  {
    icon: Shield,
    title: "Domain Privacy Protection",
    description: "Keep your personal information private and secure",
  },
  {
    icon: Zap,
    title: "Instant Activation",
    description: "Get your domain up and running in minutes",
  },
  {
    icon: Users,
    title: "24/7 Expert Support",
    description: "Our domain experts are here to help anytime",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "TechStart Inc.",
    content: "Found the perfect domain for my startup in seconds. The process was incredibly smooth!",
    rating: 5,
  },
  {
    name: "Mike Chen",
    company: "Creative Agency",
    content: "Great pricing and excellent customer support. Highly recommend for domain registration.",
    rating: 5,
  },
  {
    name: "Emily Davis",
    company: "E-commerce Store",
    content: "The domain management dashboard is intuitive and makes renewals a breeze.",
    rating: 5,
  },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = () => {
    if (searchTerm.trim()) {
      window.location.href = `/search?domain=${encodeURIComponent(searchTerm.trim())}`
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">DomainPro</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Domains
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                My Domains
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
                Hosting
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
                Support
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="text-blue-600 block">Domain Name</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Search millions of available domains and secure your online presence today. Get started with the world's
            most trusted domain registrar.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Enter your domain name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-14 text-lg pl-12 pr-4 border-2 border-gray-200 focus:border-blue-500"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <Button onClick={handleSearch} size="lg" className="h-14 px-8 text-lg font-semibold">
                Search Domains
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Popular Extensions */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {popularExtensions.map((ext) => (
              <Card key={ext.ext} className="relative hover:shadow-lg transition-shadow cursor-pointer">
                {ext.popular && <Badge className="absolute -top-2 -right-2 bg-orange-500">Popular</Badge>}
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-gray-900">{ext.ext}</div>
                  <div className="text-sm text-gray-600">Starting at</div>
                  <div className="text-xl font-bold text-blue-600">{ext.price}</div>
                  <div className="text-xs text-gray-500 mt-1">/year</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose DomainPro?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make domain registration simple, secure, and affordable for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">No hidden fees. No surprises. Just great domains at great prices.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Starter</CardTitle>
                <CardDescription>Perfect for personal projects</CardDescription>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  $12.99
                  <span className="text-lg font-normal text-gray-600">/year</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>1 Domain Registration</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>DNS Management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Email Support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="relative border-blue-500 border-2">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">Most Popular</Badge>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Professional</CardTitle>
                <CardDescription>Great for businesses</CardDescription>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  $29.99
                  <span className="text-lg font-normal text-gray-600">/year</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>5 Domain Registrations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Advanced DNS Management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Domain Privacy Protection</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Priority Support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <CardDescription>For large organizations</CardDescription>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  $99.99
                  <span className="text-lg font-normal text-gray-600">/year</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Unlimited Domains</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Premium DNS Features</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Advanced Security</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>24/7 Phone Support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-gray-600">See what our customers have to say about their experience.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">DomainPro</span>
              </div>
              <p className="text-gray-400">Your trusted partner for domain registration and management.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Domain Registration
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Domain Transfer
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    DNS Management
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Domain Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Live Chat
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Status Page
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DomainPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

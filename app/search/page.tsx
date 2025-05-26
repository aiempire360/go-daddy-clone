"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Globe, ShoppingCart, Check, X, Star, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface DomainResult {
  domain: string
  extension: string
  available: boolean
  price: string
  premium: boolean
  suggested?: boolean
}

const extensions = [
  { ext: ".com", price: 12.99, popular: true },
  { ext: ".net", price: 14.99, popular: false },
  { ext: ".org", price: 13.99, popular: false },
  { ext: ".io", price: 49.99, popular: true },
  { ext: ".co", price: 29.99, popular: false },
  { ext: ".ai", price: 79.99, popular: true },
  { ext: ".app", price: 19.99, popular: false },
  { ext: ".dev", price: 15.99, popular: false },
  { ext: ".tech", price: 24.99, popular: false },
  { ext: ".online", price: 9.99, popular: false },
]

function SearchContent() {
  const searchParams = useSearchParams()
  const initialDomain = searchParams.get("domain") || ""

  const [searchTerm, setSearchTerm] = useState(initialDomain)
  const [results, setResults] = useState<DomainResult[]>([])
  const [cart, setCart] = useState<DomainResult[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    if (initialDomain) {
      performSearch(initialDomain)
    }
  }, [initialDomain])

  const performSearch = async (domain: string) => {
    if (!domain.trim()) return

    setLoading(true)
    setHasSearched(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const baseDomain = domain.replace(/\.(com|net|org|io|co|ai|app|dev|tech|online)$/i, "")
    const searchResults: DomainResult[] = []

    extensions.forEach((ext, index) => {
      const fullDomain = `${baseDomain}${ext.ext}`
      const isAvailable = Math.random() > 0.3 // 70% chance of being available
      const isPremium = Math.random() > 0.8 // 20% chance of being premium

      searchResults.push({
        domain: fullDomain,
        extension: ext.ext,
        available: isAvailable,
        price: isPremium ? `$${(ext.price * 3).toFixed(2)}` : `$${ext.price.toFixed(2)}`,
        premium: isPremium,
        suggested: index < 3 && isAvailable,
      })
    })

    // Add some alternative suggestions
    const alternatives = ["shop", "store", "hub", "pro", "plus"]
    alternatives.forEach((alt) => {
      const altDomain = `${baseDomain}${alt}.com`
      searchResults.push({
        domain: altDomain,
        extension: ".com",
        available: true,
        price: "$12.99",
        premium: false,
        suggested: true,
      })
    })

    setResults(searchResults)
    setLoading(false)
  }

  const handleSearch = () => {
    performSearch(searchTerm)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const addToCart = (domain: DomainResult) => {
    if (!cart.find((item) => item.domain === domain.domain)) {
      setCart([...cart, domain])
    }
  }

  const removeFromCart = (domain: DomainResult) => {
    setCart(cart.filter((item) => item.domain !== domain.domain))
  }

  const isInCart = (domain: DomainResult) => {
    return cart.some((item) => item.domain === domain.domain)
  }

  const cartTotal = cart.reduce((total, item) => {
    return total + Number.parseFloat(item.price.replace("$", ""))
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
                <Globe className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">DomainPro</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-600" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cart.length}
                  </Badge>
                )}
              </div>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Input
                      type="text"
                      placeholder="Search for your perfect domain..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="h-12 text-lg pl-12 pr-4"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <Button onClick={handleSearch} size="lg" className="h-12 px-8" disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Loading State */}
            {loading && (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-lg text-gray-600">Searching for available domains...</p>
                </CardContent>
              </Card>
            )}

            {/* Search Results */}
            {!loading && hasSearched && results.length > 0 && (
              <div className="space-y-6">
                {/* Exact Match */}
                {results.filter((r) => !r.suggested).length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Domain Availability Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {results
                          .filter((r) => !r.suggested)
                          .map((result, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                            >
                              <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                  <div className="font-semibold text-lg">{result.domain}</div>
                                  {result.premium && (
                                    <Badge variant="secondary" className="mt-1">
                                      Premium Domain
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-bold text-blue-600">{result.price}</div>
                                  <div className="text-sm text-gray-500">/year</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                {result.available ? (
                                  <>
                                    <div className="flex items-center text-green-600">
                                      <Check className="h-5 w-5 mr-1" />
                                      Available
                                    </div>
                                    {isInCart(result) ? (
                                      <Button
                                        variant="outline"
                                        onClick={() => removeFromCart(result)}
                                        className="text-red-600 border-red-600 hover:bg-red-50"
                                      >
                                        Remove
                                      </Button>
                                    ) : (
                                      <Button onClick={() => addToCart(result)}>Add to Cart</Button>
                                    )}
                                  </>
                                ) : (
                                  <div className="flex items-center text-red-600">
                                    <X className="h-5 w-5 mr-1" />
                                    Taken
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Suggestions */}
                {results.filter((r) => r.suggested && r.available).length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Suggested Alternatives
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {results
                          .filter((r) => r.suggested && r.available)
                          .slice(0, 6)
                          .map((result, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                            >
                              <div>
                                <div className="font-semibold">{result.domain}</div>
                                <div className="text-sm text-gray-500">{result.price}/year</div>
                              </div>
                              {isInCart(result) ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeFromCart(result)}
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                >
                                  Remove
                                </Button>
                              ) : (
                                <Button size="sm" onClick={() => addToCart(result)}>
                                  Add
                                </Button>
                              )}
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* No Results */}
            {!loading && hasSearched && results.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try searching for a different domain name.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Shopping Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Shopping Cart ({cart.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div key={index} className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.domain}</div>
                          <div className="text-sm text-gray-500">{item.price}/year</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    <Separator />

                    <div className="flex justify-between items-center font-semibold">
                      <span>Total:</span>
                      <span className="text-lg">${cartTotal.toFixed(2)}</span>
                    </div>

                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>

                    <p className="text-xs text-gray-500 text-center">* Prices shown are for the first year</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}

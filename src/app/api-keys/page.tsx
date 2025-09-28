"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Key } from "lucide-react"

export default function ApiKeysPage() {
  const [inviteCode, setInviteCode] = useState("")
  const [organizationName, setOrganizationName] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [organizationId, setOrganizationId] = useState<string | null>(null)
  const [validUntil, setValidUntil] = useState<string | null>(null)
  const { toast } = useToast()

  // Redeem API key invitation
  const handleRedeemInvite = async () => {
    if (!inviteCode.trim() || !organizationName.trim() || !name.trim() || !email.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)

      // Используем наш API роут
      const response = await fetch(`/api/sensay/api-keys/invites/${inviteCode}/redeem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organizationName,
          name,
          email,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setApiKey(data.apiKey)
        setOrganizationId(data.organizationID)
        setValidUntil(data.validUntil)

        toast({
          title: "Success",
          description: "API key invitation redeemed successfully.",
        })
      } else {
        const errorData = await response.json()
        toast({
          title: "Error",
          description: errorData.error || "Failed to redeem invitation code.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error redeeming invitation code:", error)
      toast({
        title: "Error",
        description: "Failed to redeem invitation code. Please check the code and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Copy API key to clipboard
  const copyApiKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey)
      toast({
        title: "Copied",
        description: "API key copied to clipboard.",
      })
    }
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6 text-mafia-900 dark:text-mafia-300">API Keys</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-mafia-200 dark:border-mafia-800">
          <CardHeader className="bg-mafia-50 dark:bg-mafia-900/20 rounded-t-lg">
            <CardTitle className="text-mafia-900 dark:text-mafia-300">Redeem Invitation</CardTitle>
            <CardDescription>Redeem an API key invitation code</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <label htmlFor="inviteCode" className="block text-sm font-medium mb-1">
                Invitation Code
              </label>
              <Input
                id="inviteCode"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="Enter your invitation code"
                className="border-mafia-300 focus-visible:ring-mafia-500"
              />
            </div>
            <div>
              <label htmlFor="organizationName" className="block text-sm font-medium mb-1">
                Organization Name
              </label>
              <Input
                id="organizationName"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="Enter organization name"
                className="border-mafia-300 focus-visible:ring-mafia-500"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Contact Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="border-mafia-300 focus-visible:ring-mafia-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border-mafia-300 focus-visible:ring-mafia-500"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleRedeemInvite} className="bg-mafia-600 hover:bg-mafia-700" disabled={loading}>
              <Key className="mr-2 h-4 w-4" />
              {loading ? "Redeeming..." : "Redeem Code"}
            </Button>
          </CardFooter>
        </Card>

        {apiKey && (
          <Card className="border-mafia-200 dark:border-mafia-800">
            <CardHeader className="bg-mafia-50 dark:bg-mafia-900/20 rounded-t-lg">
              <CardTitle className="text-mafia-900 dark:text-mafia-300">Your API Key</CardTitle>
              <CardDescription>Store this key securely</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">API Key</label>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md font-mono text-sm break-all">{apiKey}</div>
              </div>
              {organizationId && (
                <div>
                  <label className="block text-sm font-medium mb-1">Organization ID</label>
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md font-mono text-sm break-all">{organizationId}</div>
                </div>
              )}
              {validUntil && (
                <div>
                  <label className="block text-sm font-medium mb-1">Valid Until</label>
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-sm">{validUntil}</div>
                </div>
              )}
              <p className="text-sm text-red-600 dark:text-red-400">
                Important: Save this key now. You won't be able to see it again!
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={copyApiKey} className="bg-mafia-600 hover:bg-mafia-700">
                Copy API Key
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

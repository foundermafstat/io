"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Building } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Building className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold text-foreground">Sensay.io</span>
      </div>
      <nav className="hidden md:flex items-center space-x-6">
        <a href="/cars" className="text-sm font-medium hover:text-primary">
          Browse Cars
        </a>
        <a href="/real-estate" className="text-sm font-medium hover:text-primary">
          Real Estate
        </a>
        <Button variant="ghost" size="sm">Sign In</Button>
      </nav>
    </header>
  )
}

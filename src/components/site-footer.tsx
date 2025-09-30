import React from 'react'
import { Button } from '@/components/ui/button'
import { Building, Phone } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="bg-muted/50 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Building className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Sensay.io</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Beach Properties</li>
              <li>Historic Districts</li>
              <li>Urban Living</li>
              <li>Mountain Retreats</li>
              <li>Luxury Villas</li>
              <li>Investment Properties</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Blog</li>
              <li>Property Guide</li>
              <li>Market Insights</li>
              <li>Investment Tips</li>
              <li>Property Types</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Privacy</li>
              <li>Terms of Use</li>
              <li>Cookie Preferences</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Join Our Community! Get exclusive property offers and market insights.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="you@domain.com"
                className="flex-1 px-3 py-2 border border-input rounded-md text-sm"
              />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex justify-between items-center text-sm text-muted-foreground">
          <p>The source code is available on GitHub.</p>
          <Button size="icon" variant="outline" className="rounded-full">
            <Phone className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </footer>
  )
}

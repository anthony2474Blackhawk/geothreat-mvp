import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GeoThreat MVP',
  description: 'Geopolitical Threat Assessment Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <header className="bg-white shadow">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🌍 GeoThreat</h1>
              <p className="text-xs text-gray-600 font-semibold">MVP v0.1.0 - Demonstration Data Only</p>
            </div>
            <ul className="flex gap-6 text-gray-700">
              <li><a href="/" className="hover:text-blue-600">Dashboard</a></li>
              <li><a href="/countries" className="hover:text-blue-600">Countries</a></li>
            </ul>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-800 text-white text-center py-4 mt-12">
          <p className="text-sm">⚠️ All geopolitical scores are SYNTHETIC DEMONSTRATION DATA</p>
          <p className="text-xs text-gray-400 mt-1">GeoThreat MVP © 2024</p>
        </footer>
      </body>
    </main>
  )
}

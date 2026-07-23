import prisma from '@/lib/prisma'
import { CountryList } from '@/components/CountryList'

async function getCountries() {
  try {
    const countries = await prisma.country.findMany({
      orderBy: { name: 'asc' },
    })
    return countries
  } catch (error) {
    console.error('Failed to fetch countries:', error)
    return []
  }
}

export default async function Dashboard() {
  const countries = await getCountries()

  return (
    <div>
      <div className="demo-banner">
        <p>⚠️ <strong>Demonstration Mode:</strong> All geopolitical threat scores are SYNTHETIC DATA for MVP testing purposes only.</p>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-gray-900">Geopolitical Threat Dashboard</h1>
      <p className="text-lg text-gray-600 mb-8">
        This MVP provides a demonstration framework for assessing and monitoring geopolitical threat levels across countries.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">About This MVP</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>View threat assessments for multiple countries</li>
          <li>Analyze threat metrics and indicators</li>
          <li>Compare geopolitical risk levels</li>
          <li><strong>All data is synthetic demonstration data</strong></li>
        </ul>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Countries</h2>
      {countries.length > 0 ? (
        <CountryList countries={countries} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No countries found. Please seed the database first.</p>
          <p className="text-sm text-gray-500 mt-2">Run: npm run prisma:seed</p>
        </div>
      )}
    </div>
  )
}

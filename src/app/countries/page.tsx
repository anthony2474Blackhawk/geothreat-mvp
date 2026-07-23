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

export default async function CountriesPage() {
  const countries = await getCountries()

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2 text-gray-900">All Countries</h1>
      <p className="text-gray-600 mb-8">Browse threat assessments for countries in our database.</p>

      <div className="demo-banner">
        <p>⚠️ All geopolitical scores are SYNTHETIC DEMONSTRATION DATA</p>
      </div>

      {countries.length > 0 ? (
        <CountryList countries={countries} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No countries found.</p>
        </div>
      )}
    </div>
  )
}

import prisma from '@/lib/prisma'
import { ThreatCard } from '@/components/ThreatCard'
import Link from 'next/link'

interface CountryDetailPageProps {
  params: {
    code: string
  }
}

async function getCountryData(code: string) {
  try {
    const country = await prisma.country.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        threatAssessments: {
          include: {
            metrics: true,
          },
        },
      },
    })
    return country
  } catch (error) {
    console.error('Failed to fetch country:', error)
    return null
  }
}

export default async function CountryDetailPage({ params }: CountryDetailPageProps) {
  const country = await getCountryData(params.code)

  if (!country) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Country Not Found</h1>
        <p className="text-gray-600 mb-6">The country code '{params.code}' was not found in our database.</p>
        <Link href="/countries" className="text-blue-600 hover:text-blue-800 font-semibold">
          ← Back to Countries
        </Link>
      </div>
    )
  }

  const assessment = country.threatAssessments[0]

  return (
    <div>
      <Link href="/countries" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
        ← Back to Countries
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{country.name}</h1>
        <p className="text-lg text-gray-600">Region: <strong>{country.region}</strong></p>
        <p className="text-sm text-gray-500 mt-2">Country Code: {country.code}</p>
      </div>

      <div className="demo-banner mb-8">
        <p>⚠️ All geopolitical scores are SYNTHETIC DEMONSTRATION DATA for testing purposes.</p>
      </div>

      {assessment ? (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Threat Assessment</h2>
            <ThreatCard countryName={country.name} assessment={assessment} />
          </div>

          {assessment.metrics.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assessment.metrics.map((metric) => (
                  <div key={metric.id} className="bg-white border rounded-lg p-4 shadow">
                    <h3 className="font-semibold text-gray-900 mb-2">{metric.category}</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-2">{metric.value.toFixed(1)}/10</p>
                    {metric.description && (
                      <p className="text-sm text-gray-600">{metric.description}</p>
                    )}
                    {metric.isDemo && (
                      <p className="text-xs text-gray-500 mt-2 italic">Demo data</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {assessment.notes && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Notes</h2>
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                <p className="text-gray-700">{assessment.notes}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No threat assessment data available for {country.name}.</p>
        </div>
      )}
    </div>
  )
}

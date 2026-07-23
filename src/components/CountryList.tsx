'use client'

import Link from 'next/link'
import { Country } from '@/types'

interface CountryListProps {
  countries: Country[]
}

export function CountryList({ countries }: CountryListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {countries.map((country) => (
        <Link
          key={country.id}
          href={`/countries/${country.code}`}
          className="block p-4 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer hover:border-blue-500"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{country.name}</h3>
          <p className="text-sm text-gray-600 mb-3">Region: {country.region}</p>
          <p className="text-xs text-blue-600 font-semibold">View Details →</p>
        </Link>
      ))}
    </div>
  )
}

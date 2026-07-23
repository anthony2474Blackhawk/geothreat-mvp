'use client'

import { ThreatAssessment } from '@/types'

interface ThreatCardProps {
  countryName: string
  assessment: ThreatAssessment
}

export function ThreatCard({ countryName, assessment }: ThreatCardProps) {
  const getThreatColor = (level: number) => {
    if (level >= 8) return 'bg-red-100 border-red-500'
    if (level >= 6) return 'bg-orange-100 border-orange-500'
    if (level >= 4) return 'bg-yellow-100 border-yellow-500'
    return 'bg-green-100 border-green-500'
  }

  const getThreatBadgeColor = (level: number) => {
    if (level >= 8) return 'bg-red-500'
    if (level >= 6) return 'bg-orange-500'
    if (level >= 4) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className={`border-l-4 p-4 rounded shadow ${getThreatColor(assessment.threatLevel)}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{countryName}</h3>
        <span className={`${getThreatBadgeColor(assessment.threatLevel)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
          {assessment.threatLevel}/10
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">
        Threat Score: {(assessment.score * 100).toFixed(1)}%
      </p>
      <div className="bg-white bg-opacity-50 p-2 rounded text-xs text-gray-700 border border-gray-300">
        <p className="font-semibold mb-1">⚠️ Demonstration Data</p>
        <p>All geopolitical scores are SYNTHETIC DEMONSTRATION DATA for MVP testing purposes.</p>
      </div>
    </div>
  )
}

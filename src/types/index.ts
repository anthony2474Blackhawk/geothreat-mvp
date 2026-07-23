export interface Country {
  id: string
  code: string
  name: string
  region: string
  createdAt: Date
  updatedAt: Date
}

export interface ThreatAssessment {
  id: string
  countryId: string
  threatLevel: number
  score: number
  notes: string | null
  metrics: Metric[]
  createdAt: Date
  updatedAt: Date
}

export interface Metric {
  id: string
  threatAssessmentId: string
  category: string
  value: number
  description: string | null
  isDemo: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CountryWithThreat extends Country {
  threatAssessments: ThreatAssessment[]
}

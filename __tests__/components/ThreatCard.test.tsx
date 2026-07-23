import { render, screen } from '@testing-library/react'
import { ThreatCard } from '@/components/ThreatCard'
import { ThreatAssessment } from '@/types'

const mockAssessment: ThreatAssessment = {
  id: '1',
  countryId: '1',
  threatLevel: 8,
  score: 0.8,
  notes: 'Test notes',
  metrics: [],
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('ThreatCard', () => {
  it('renders country name and threat level', () => {
    render(<ThreatCard countryName="Russia" assessment={mockAssessment} />)
    expect(screen.getByText('Russia')).toBeInTheDocument()
    expect(screen.getByText('8/10')).toBeInTheDocument()
  })

  it('displays demonstration data warning', () => {
    render(<ThreatCard countryName="Russia" assessment={mockAssessment} />)
    expect(screen.getByText(/Demonstration Data/)).toBeInTheDocument()
  })
})

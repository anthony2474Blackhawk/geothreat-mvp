const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const DEMO_DATA_WARNING = 'All geopolitical scores are SYNTHETIC DEMONSTRATION DATA'

async function main() {
  console.log('🌍 Seeding GeoThreat database with demonstration data...')
  console.log(`⚠️  ${DEMO_DATA_WARNING}\n`)

  // Clear existing data
  await prisma.metric.deleteMany({})
  await prisma.threatAssessment.deleteMany({})
  await prisma.country.deleteMany({})

  // Seed countries with threat assessments
  const countries = [
    {
      code: 'RU',
      name: 'Russia',
      region: 'Eastern Europe',
      threatLevel: 8,
      metrics: [
        { category: 'Military Capability', value: 8.5 },
        { category: 'Political Instability', value: 7.2 },
        { category: 'Cyber Activity', value: 8.8 },
      ],
    },
    {
      code: 'CN',
      name: 'China',
      region: 'East Asia',
      threatLevel: 7,
      metrics: [
        { category: 'Economic Power', value: 9.0 },
        { category: 'Military Capability', value: 8.2 },
        { category: 'Technological Advancement', value: 8.5 },
      ],
    },
    {
      code: 'IR',
      name: 'Iran',
      region: 'Middle East',
      threatLevel: 7,
      metrics: [
        { category: 'Regional Conflicts', value: 8.0 },
        { category: 'Nuclear Program', value: 7.5 },
        { category: 'Proxy Warfare', value: 8.2 },
      ],
    },
    {
      code: 'NK',
      name: 'North Korea',
      region: 'East Asia',
      threatLevel: 6,
      metrics: [
        { category: 'Nuclear Weapons', value: 7.8 },
        { category: 'Military Provocations', value: 6.5 },
        { category: 'International Isolation', value: 8.0 },
      ],
    },
    {
      code: 'US',
      name: 'United States',
      region: 'North America',
      threatLevel: 3,
      metrics: [
        { category: 'Political Polarization', value: 6.2 },
        { category: 'Internal Security', value: 4.5 },
        { category: 'Global Influence', value: 9.0 },
      ],
    },
  ]

  for (const countryData of countries) {
    const { metrics, threatLevel, ...countryInfo } = countryData

    const country = await prisma.country.create({
      data: countryInfo,
    })

    const threatAssessment = await prisma.threatAssessment.create({
      data: {
        countryId: country.id,
        threatLevel,
        score: threatLevel / 10,
        notes: `Demonstration assessment for ${country.name}. ${DEMO_DATA_WARNING}`,
      },
    })

    for (const metric of metrics) {
      await prisma.metric.create({
        data: {
          ...metric,
          threatAssessmentId: threatAssessment.id,
          isDemo: true,
          description: `Demonstration metric for ${country.name}`,
        },
      })
    }

    console.log(`✅ Created ${country.name} with threat assessment`)
  }

  console.log('\n✨ Database seeding complete!')
  console.log(`⚠️  ${DEMO_DATA_WARNING}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const countries = await prisma.country.findMany({
      include: {
        threatAssessments: {
          include: {
            metrics: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({
      success: true,
      data: countries,
      message: '⚠️ All geopolitical data is SYNTHETIC DEMONSTRATION DATA',
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

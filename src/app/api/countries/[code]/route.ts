import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  _request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const country = await prisma.country.findUnique({
      where: { code: params.code.toUpperCase() },
      include: {
        threatAssessments: {
          include: {
            metrics: true,
          },
        },
      },
    })

    if (!country) {
      return NextResponse.json(
        { success: false, error: 'Country not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: country,
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

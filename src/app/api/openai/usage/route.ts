import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.",
          usage: {
            total_tokens: 0,
            input_tokens: 0,
            output_tokens: 0
          }
        },
        { status: 200 }
      )
    }

    // Получение параметров запроса
    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get("date") // YYYY-MM-DD format

    // Если дата не указана, используем текущую дату
    const targetDate = date || new Date().toISOString().split('T')[0]

    // OpenAI Usage API endpoint
    const usageUrl = `https://api.openai.com/v1/usage?date=${targetDate}`

    const response = await fetch(usageUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Error fetching OpenAI usage: ${errorText}`)
      return NextResponse.json(
        { error: `Failed to fetch OpenAI usage: ${response.statusText}` },
        { status: response.status }
      )
    }

    const usageData = await response.json()

    return NextResponse.json({
      date: targetDate,
      usage: usageData
    })
  } catch (error) {
    console.error("Error in OpenAI usage API:", error)
    return NextResponse.json(
      { error: "Failed to fetch OpenAI usage statistics" },
      { status: 500 }
    )
  }
}

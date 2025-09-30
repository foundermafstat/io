import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const url = searchParams.get('url');

	if (!url) {
		return NextResponse.json(
			{ success: false, error: 'URL is required' },
			{ status: 400 }
		);
	}

	try {
		const response = await fetch(url, {
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
			},
		});

		if (!response.ok) {
			return NextResponse.json(
				{
					success: false,
					error: `Failed to fetch URL: ${response.status}`,
				},
				{ status: response.status }
			);
		}

		const html = await response.text();

		// Простое извлечение текста из HTML
		const textContent = html
			.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
			.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
			.replace(/<[^>]*>/g, ' ')
			.replace(/\s+/g, ' ')
			.trim();

		return NextResponse.json({
			success: true,
			content: textContent.substring(0, 5000), // Ограничиваем размер
		});
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: `Error scraping website: ${
					error instanceof Error ? error.message : 'Unknown error'
				}`,
			},
			{ status: 500 }
		);
	}
}

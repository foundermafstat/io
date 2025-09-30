import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const resp = await fetch('https://api.openai.com/v1/realtime/sessions', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			model: 'gpt-4o-realtime-preview',
			voice: 'verse',
		}),
	});

	const data = await resp.json();
	return NextResponse.json(data);
}

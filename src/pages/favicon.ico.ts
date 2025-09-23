import type { APIRoute } from "astro"
import sharp from "sharp"
import ico from "sharp-ico"
import path from "node:path"

// relative to project root
const faviconSrc = path.resolve("src/images/favicon.png")

export const GET: APIRoute = async () => {
	try {
		const buffer = await sharp(faviconSrc).resize(32).toFormat("png").toBuffer()

		const icoBuffer = ico.encode([buffer])

		const responseBuffer = Buffer.from(icoBuffer)

		return new Response(responseBuffer, {
			headers: {
				"Content-Type": "image/x-icon",
				"Content-Length": responseBuffer.length.toString(),
			},
		})
	} catch (error) {
		return new Response("Error generating favicon", { status: 500 })
	}
}

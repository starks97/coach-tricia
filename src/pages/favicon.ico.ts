import type { APIRoute } from "astro"
import { getImage } from "astro:assets"
import favicon from "../images/Coach.png"

export const GET: APIRoute = async () => {
	try {
		const image = await getImage({
			src: favicon,
			width: 32,
			height: 32,
			format: "png",
		})

		// Redirigir a la imagen generada o servirla directamente
		return new Response(null, {
			status: 302,
			headers: {
				Location: image.src,
			},
		})
	} catch (error) {
		console.error("Error generating favicon:", error)
		return new Response("Error generating favicon", { status: 500 })
	}
}

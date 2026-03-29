import type { APIRoute } from "astro"
import { getImage } from "astro:assets"
import favicon from "../images/Coach.png"

const faviconPngSizes = [192, 512]

export const GET: APIRoute = async () => {
	const icons = await Promise.all(
		faviconPngSizes.map(async (size) => {
			const image = await getImage({
				src: favicon,
				width: size,
				height: size,
				format: "png",
			})
			return {
				src: image.src,
				type: `image/${image.options.format}`,
				sizes: `${image.options.width}x${image.options.height}`,
			}
		})
	)

	const manifest = {
		name: "Coach Tricia Rago",
		short_name: "Tricia Rago",
		description:
			"Transformational relationship coaching for women who are looking to create the life of their dreams.",
		start_url: "/",
		display: "standalone",
		background_color: "#f3f3e8",
		theme_color: "#fbefec",
		lang: "en",
		orientation: "portrait",
		id: "coach-tricia-rago",
		icons,
	}

	return new Response(JSON.stringify(manifest))
}

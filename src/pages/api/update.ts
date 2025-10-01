import type { APIRoute } from "astro"
import { updateSection } from "~/lib/db/queries/updateSection"

import { schemaRouter } from "@lib/db/schemaRouter.ts"

export const PATCH: APIRoute = async ({ request }) => {
	try {
		const { searchParams } = new URL(request.url)
		const id = searchParams.get("id")
		const page = searchParams.get("page")
		const body = await request.json()

		if (!id || !page || typeof page !== "string" || !(page in schemaRouter)) {
			return new Response("Bad Request", { status: 400 })
		}

		if (!body) {
			return new Response("No data provided", { status: 400 })
		}

		const route = schemaRouter[page as keyof typeof schemaRouter]

		if (!route) {
			return new Response("Page not found", { status: 404 })
		}

		const update = await updateSection(id, route.collection, body, route.schema)

		return new Response(JSON.stringify(update), {
			headers: {
				"Content-Type": "application/json",
			},
		})
	} catch (e) {
		console.error(e)
		return new Response("Internal Server Error", { status: 500 })
	}
}

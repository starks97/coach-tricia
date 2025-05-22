import type { APIRoute } from "astro"

import { getAllSections } from "../../lib/queries/getAllSections.ts"
import { schemaRouter } from "../../lib/schemaRouter.ts"

export const GET: APIRoute = async ({ request }) => {
	try {
		const { searchParams } = new URL(request.url)
		const section = searchParams.get("section")

		if (!section || !(section in schemaRouter)) {
			return new Response(JSON.stringify({ error: "Invalid schema" }), {
				status: 400,
				headers: {
					"Content-Type": "application/json",
				},
			})
		}

		const { collection, schema, schemaType } = schemaRouter[section as keyof typeof schemaRouter]

		const sections = await getAllSections<typeof schemaType>(collection, schema)
		return new Response(JSON.stringify(sections), {
			headers: {
				"Content-Type": "application/json",
			},
		})
	} catch (error) {
		console.error(error)
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		})
	}
}

import type { APIRoute } from "astro"
import z from "zod"

<<<<<<< HEAD
import getPage from "@lib/db/queries/getPage.ts"
import { schemaRouter } from "@lib/db/schemaRouter.ts"
=======
import getPage from "@lib/queries/getPage.ts"
import { schemaRouter } from "@lib/schemaRouter.ts"
>>>>>>> cf2b7c4 (backend system)

export const GET: APIRoute = async ({ request }) => {
	try {
		const { searchParams } = new URL(request.url)
		const id = searchParams.get("id")
		const page = searchParams.get("page")

		if (!id || !page || typeof page !== "string" || !(page in schemaRouter)) {
			return new Response("Bad Request", { status: 400 })
		}

		const route = schemaRouter[page as keyof typeof schemaRouter]

		if (!route) {
			return new Response("Page not found", { status: 404 })
		}

		const result = await getPage<z.infer<typeof route.schema>>(id, route.collection, route.schema)

		return new Response(JSON.stringify(result), {
			headers: {
				"Content-Type": "application/json",
			},
		})
	} catch (error: any) {
		console.error(error)

		return new Response("Internal Server Error", { status: 500 })
	}
}

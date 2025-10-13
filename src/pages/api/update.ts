import type { APIRoute } from "astro"
import { updateSection } from "~/lib/db/queries/updateSection"

import { schemaRouter } from "@lib/db/schemaRouter.ts"
import type { UpdateParams} from "~/lib/db/types/update.types"

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

		const updateParams:UpdateParams = {
			id,
			collectionName: route.collection,
			update: body,
			schema: route.schema,
		}

		const result = await updateSection(updateParams)

		return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
      },
      status: result.success ? 200 : 500
    })

	} catch (e) {
		console.error(e)
    return new Response(JSON.stringify({ 
      success: false, 
      error: "Internal Server Error" 
    }), { status: 500 })
  }
}

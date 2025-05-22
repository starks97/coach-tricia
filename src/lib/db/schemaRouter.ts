<<<<<<< HEAD:src/lib/db/schemaRouter.ts
import { HomePageSchema } from "./models/home.ts"
=======
import { HomePageSchema } from "@lib/models/home.ts"
import { CoachingPageSchema } from "@lib/models/coaching.ts"
import { ContactPageSchema } from "./models/contact.ts"
import { SEODocumentSchema } from "./models/seo.ts"
import { AboutPageSchema } from "./models/about.ts"
>>>>>>> cf2b7c4 (backend system):src/lib/schemaRouter.ts
import z from "zod"

export function defineSchemaRouter<T extends z.ZodTypeAny>(config: {
	schema: T
	collection: string
}) {
	return {
		schema: config.schema,
		collection: config.collection,
		schemaType: undefined as unknown as z.infer<T>,
	}
}

export const schemaRouter = {
	home: defineSchemaRouter({ schema: HomePageSchema, collection: "home" }),
	coaching: defineSchemaRouter({ schema: CoachingPageSchema, collection: "coaching" }),
	contact: defineSchemaRouter({ schema: ContactPageSchema, collection: "contact" }),
	seo: defineSchemaRouter({ schema: SEODocumentSchema, collection: "seo" }),
	about: defineSchemaRouter({ schema: AboutPageSchema, collection: "about" }),
} as const

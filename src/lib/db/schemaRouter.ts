import { HomePageSchema } from "./models/home.ts"

import { CoachingPageSchema } from "~/lib/db/models/coaching.ts"

import { ContactPageSchema } from "./models/contact.ts"
import { SEODocumentSchema } from "./models/seo.ts"
import { AboutPageSchema } from "./models/about.ts"


export function defineSchemaRouter<T>(config: {
	schema: T
	collection: string
}) {
	return {
		schema: config.schema,
		collection: config.collection,
		schemaType: config.schema,
	}
}

export const schemaRouter = {
	home: defineSchemaRouter({ schema: HomePageSchema, collection: "home" }),
	coaching: defineSchemaRouter({ schema: CoachingPageSchema, collection: "coaching" }),
	contact: defineSchemaRouter({ schema: ContactPageSchema, collection: "contact" }),
	seo: defineSchemaRouter({ schema: SEODocumentSchema, collection: "seo" }),
	about: defineSchemaRouter({ schema: AboutPageSchema, collection: "about" }),
} as const

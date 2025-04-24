import { HomePageSchema } from "../lib/models/home.ts"
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
} as const

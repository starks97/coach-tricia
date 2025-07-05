<<<<<<< HEAD
import { type HomePageZodSchemaType } from "@lib/db/models/home.ts"
import { schemaRouter } from "@lib/db/schemaRouter.ts"
=======
import { schemaRouter } from "./lib/schemaRouter.ts"
>>>>>>> cf2b7c4 (backend system)
import z from "zod"
import { pageStoreID } from "./consts.ts"

import { type HomePageZodSchemaType } from "@lib/models/home.ts"
import { type CoachingPageZodSchemaType } from "@lib/models/coaching.ts"
import { type ContactPageZodSchemaType } from "@lib/models/contact.ts"
import { type SeoDocument } from "@lib/models/seo.ts"
import { type AboutPageZodSchemaType } from "@lib/models/about.ts"

export type Page =
	| HomePageZodSchemaType
	| CoachingPageZodSchemaType
	| ContactPageZodSchemaType
	| SeoDocument
	| AboutPageZodSchemaType

export type PageTypeMap = {
	home: Omit<HomePageZodSchemaType, "_id">
	coaching: Omit<CoachingPageZodSchemaType, "_id">
	contact: Omit<CoachingPageZodSchemaType, "_id">
	seo: Omit<SeoDocument, "_id">
	about: Omit<AboutPageZodSchemaType, "_id">
}
export type PageTypeKeys = keyof PageTypeMap

export type PageSections = {
	[K in keyof SchemaRouter]: z.infer<SchemaRouter[K]["schema"]>
}

export type Review = {
	title: string
	quote: string
	author: string
}

export type Story = {
	first: {
		title: string
		content: {
			first: string
			second: string
			third: string
		}
		image: string
	}
	second: {
		title: string
		description: string
		content: string
		image: string
	}
}

export type FunFact = {
	title: string
	id: number
}

type SchemaRouter = typeof schemaRouter
export type PageSchemas = {
	[K in keyof SchemaRouter]: z.infer<SchemaRouter[K]["schema"]>
}

export type pageStoreKeys = keyof typeof pageStoreID

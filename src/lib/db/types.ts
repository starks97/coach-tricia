import type { ZodObject, ZodRawShape } from "zod"
import { schemaRouter } from "./schemaRouter"

import z from "zod"

import { type CoachingPageZodSchemaType } from "~/lib/db/models/coaching.ts"
import { type ContactPageZodSchemaType } from "~/lib/db/models/contact.ts"
import { type SeoDocument } from "~/lib/db/models/seo.ts"
import { type AboutPageZodSchemaType } from "~/lib/db/models/about.ts"
import type { HomePageZodSchemaType } from "./models/home"

import { pageStoreID } from "@consts"

type SchemaRouter = typeof schemaRouter
export type PageSchemas = {
	[K in keyof SchemaRouter]: z.infer<SchemaRouter[K]["schema"]>
}

export type PageTypeMap = {
	home: HomePageZodSchemaType
	coaching: CoachingPageZodSchemaType
	contact: ContactPageZodSchemaType
	seo: SeoDocument
	about: AboutPageZodSchemaType
}

export type Page = PageTypeMap[keyof PageTypeMap]
export type PageTypeKeys = keyof PageTypeMap

export type PageSections = {
	[K in keyof SchemaRouter]: z.infer<SchemaRouter[K]["schema"]>
}

export type pageStoreKeys = keyof typeof pageStoreID

// types/update.types.ts
export interface UpdateResult {
	success: boolean
	data?: unknown | null
	error?: string
}

export interface UpdateParams {
	id: string
	collectionName: string
	update: Record<string, any>
	schema?: ZodObject<ZodRawShape, any>
}

import { type HomePageZodSchemaType } from "@lib/db/models/home.ts"

import { schemaRouter } from "./lib/db/schemaRouter.ts"

import z from "zod"

import { type CoachingPageZodSchemaType } from "~/lib/db/models/coaching.ts"
import { type ContactPageZodSchemaType } from "~/lib/db/models/contact.ts"
import { type SeoDocument } from "~/lib/db/models/seo.ts"
import { type AboutPageZodSchemaType } from "~/lib/db/models/about.ts"

import { pageStoreID } from "./consts.ts"

import type { Accessor } from "solid-js"
import type { SetStoreFunction } from "solid-js/store"

export type Page =
	| HomePageZodSchemaType
	| CoachingPageZodSchemaType
	| ContactPageZodSchemaType
	| SeoDocument
	| AboutPageZodSchemaType

export type PageTypeMap = {
	home: HomePageZodSchemaType
	coaching: CoachingPageZodSchemaType
	contact: ContactPageZodSchemaType
	seo: SeoDocument
	about: AboutPageZodSchemaType
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

export interface FieldErrors {
	[key: string]: string
}

//general form types
export interface GeneralFormProps<T extends PageTypeKeys> {
	data: Accessor<PageTypeMap[T]>
	schema: z.ZodObject<z.ZodRawShape, any>
	currentSection: Accessor<{
		key: string
		value: PageTypeKeys
	}>
}

//for form
export interface RenderFieldsProps<T extends PageTypeKeys> {
	data: Accessor<PageTypeMap[T]>
	path: string
	errors: FieldErrors
	handleUpdateField: (path: string, value: any) => void
}

export interface ApiResponse<T = any> {
	success: boolean
	data?: T
	error?: string
}

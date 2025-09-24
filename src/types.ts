import { type HomePageZodSchemaType } from "@lib/db/models/home.ts"

import { schemaRouter } from "./lib/db/schemaRouter.ts"

import z from "zod"

import { type CoachingPageZodSchemaType } from "~/lib/db/models/coaching.ts"
import { type ContactPageZodSchemaType } from "~/lib/db/models/contact.ts"
import { type SeoDocument } from "~/lib/db/models/seo.ts"
import { type AboutPageZodSchemaType } from "~/lib/db/models/about.ts"

import { pageStoreID } from "./consts.ts"

import { type JSX } from "solid-js"

export type TextInputProps = {
	name: string
	type: "text" | "email" | "tel" | "password" | "url" | "date"
	label?: string
	placeholder?: string
	value: string | undefined
	error: string
	required?: boolean
	ref: (element: HTMLInputElement) => void
	onInput: JSX.EventHandler<HTMLInputElement, InputEvent>
	onChange: JSX.EventHandler<HTMLInputElement, Event>
	onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>
}

export type Page =
	| HomePageZodSchemaType
	| CoachingPageZodSchemaType
	| ContactPageZodSchemaType
	| SeoDocument
	| AboutPageZodSchemaType

export type PageTypeMap = {
	home: HomePageZodSchemaType
	coaching: Omit<CoachingPageZodSchemaType, "_id">
	contact: Omit<ContactPageZodSchemaType, "_id">
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

export interface FieldErrors {
	[key: string]: string
}

//general form types
export interface GeneralFormProps<T extends PageTypeKeys> {
	data: PageTypeMap[T]
	schema: z.ZodObject<z.ZodRawShape, any>
}

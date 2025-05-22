<<<<<<< HEAD
import { type HomePageZodSchemaType } from "@lib/db/models/home.ts"
import { schemaRouter } from "@lib/db/schemaRouter.ts"
=======
import { schemaRouter } from "./lib/schemaRouter.ts"
>>>>>>> cf2b7c4 (backend system)
import z from "zod"
import { type Document } from "mongodb"

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

export type HomePageDataResponseType = HomePageZodSchemaType

export type PageID = "home_page_id" | "about_page_id"
export type PageCollection = "home" | "collection"

export type SectionName = "home" | "coaching" | "about" | "contact" | "seo"

export type AllSections = Record<string, Document[]>

//types for Section Wrapper
export type SchemaRouterMap = typeof schemaRouter

export type SectionKey = keyof SchemaRouterMap

export type SchemaTypeFor<K extends keyof SchemaRouterMap> = z.infer<SchemaRouterMap[K]["schema"]>

/**
 * Defines the structure of a single form field.
 * Fields:
 * - `name`: Unique identifier for the form field.
 * - `type`: Type of input field (e.g., `text`, `select`, `password`, etc.).
 * - `label`: User-friendly label for the form field.
 * - `placeholder`: Placeholder text for the input field.
 * - `required`: Indicates whether the field is mandatory.
 * - `options`: Optional field for dropdowns or select inputs.
 */
export interface FormField {
	name: string
	type: "text" | "select" | "password" | "email"
	label: string
	placeholder: string
	required: boolean
	options?: { value: string; label: string }[]
}

/**
 * Represents the props passed to a form component.
 * Fields:
 * - `formSchema`: An array of `FormField` definitions.
 * - `children`: Optional child components rendered inside the form.
 * - `actionData`: Contains action-related data like errors.
 */
export interface FormProps<T> {
	formSchema: FormField[]
	actionData: ActionData<T>
	method: "post" | "get" | "dialog"
	action?: string //this field is to define what route should be use to excute the action of the form
	submitLabel: string
	className?: string
}

/**
 * Represents data related to form submission actions.
 * Fields:
 * - `errors`: Partial dictionary of field errors, optionally including a general error message.
 */
export interface ActionData<T> {
	errors?: Partial<Record<keyof T, string>> & { general?: string }
}

/**
 * Represents error messages for specific form fields.
 * A dictionary where each key corresponds to a field name, and the value is the error message.
 */
export interface FieldErrors {
	[key: string]: string
}

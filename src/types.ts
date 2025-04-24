import { type HomePageZodSchemaType } from "./lib/models/home.ts"
import { schemaRouter } from "./lib/schemaRouter.ts"
import z from "zod"

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

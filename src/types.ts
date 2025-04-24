import { type HomePageZodSchemaType } from "./lib/models/home.ts"
import { schemaRouter } from "./lib/schemaRouter.ts"
import z from "zod"

export type Review = {
	title: string
	quote: string
	author: string
}

type SchemaRouter = typeof schemaRouter
export type PageSchemas = {
	[K in keyof SchemaRouter]: z.infer<SchemaRouter[K]["schema"]>
}

export type HomePageDataResponseType = HomePageZodSchemaType

export type PageID = "home_page_id" | "about_page_id"
export type PageCollection = "home" | "collection"

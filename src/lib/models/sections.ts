import z from "zod"

import { AboutPageSectionSchema } from "./about"
import { HomePageSectionSchema } from "./home"
import { CoachingPageSectionSchema } from "./coaching"
import { ContactPageSectionSchema } from "./contact"
import { SeoDocumentSchema } from "./seo"

export const SectionSchema = z.object({
	_id: z.string().length(24, "The _id must have 24 characters (valid ObjectId)"),
	home: HomePageSectionSchema,
	coaching: CoachingPageSectionSchema,
	about: AboutPageSectionSchema,
	contact: ContactPageSectionSchema,
	seo: SeoDocumentSchema,
})

export type SectionSchemaType = z.infer<typeof SectionSchema>

import z from "zod"

export const seoSectionSchema = z.object({
	title: z.string().min(1).max(60),
	description: z.string().min(1).max(160),
	keywords: z.array(z.string().min(1).max(255)).min(1).max(10),
})

export const SEODocumentSchema = z.object({
	_id: z.string().min(5, "the id has to have at least 5 characters"),
	page_name: z.string().min(1, "The page name cannot be empty"),
	sections: z.object({
		home: seoSectionSchema,
		about: seoSectionSchema,
		coaching: seoSectionSchema,
		contact: seoSectionSchema,
	}),
})

export type SeoDocument = z.infer<typeof SEODocumentSchema>

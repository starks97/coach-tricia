import z from "zod"

export const seoSectionSchema = z.object({
	title: z.string().min(1).max(60),
	description: z.string().min(1).max(160),
	keywords: z.array(z.string().min(1).max(255)).min(1).max(10),
})

export const seoDocumentSchema = z.object({
	_id: z.string().length(24, "_id must be a 24-character valid ObjectId"),
	sections: z.object({
		home: seoSectionSchema,
		about: seoSectionSchema,
		coaching: seoSectionSchema,
		contact: seoSectionSchema,
	}),
})

export type SeoDocument = z.infer<typeof seoDocumentSchema>

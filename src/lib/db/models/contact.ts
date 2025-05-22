import z from "zod"

const heroContactSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	subtitle: z.string().min(1, "The subtitle cannot be empty"),
	description: z.string().min(1, "The description cannot be empty"),
	image: z.string().url("The image must be a valid URL"),
})

export const ContactPageSchema = z.object({
	_id: z.string().min(5, "the id has to have at least 5 characters"),
	page_name: z.string().min(1, "The page name cannot be empty"),
	sections: z.object({
		hero: heroContactSchema,
	}),
})

export const ContactPageSectionSchema = z.object({
	hero: heroContactSchema,
})

export type ContactPageSectionSchemaType = z.infer<typeof ContactPageSectionSchema>

export type ContactPageZodSchemaType = z.infer<typeof ContactPageSchema>

import z from "zod"

const heroContactSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	subtitle: z.string().min(1, "The subtitle cannot be empty"),
	description: z.string().min(1, "The description cannot be empty"),
	image: z.string().url("The image must be a valid URL"),
})

export const ContactPageSchema = z.object({
	hero: heroContactSchema,
})

export type ContactPageZodSchemaType = z.infer<typeof ContactPageSchema>

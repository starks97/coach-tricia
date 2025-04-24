import { z } from "zod"

const heroAboutSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	subtitle: z.string().min(1, "The subtitle cannot be empty"),
	description: z.string().min(1, "The description cannot be empty"),
	image: z.string().min(1).url("The image must be a valid URL"),
})

const storyFirstContentSchema = z.object({
	first: z.string().min(1, "First paragraph cannot be empty"),
	second: z.string().min(1, "Second paragraph cannot be empty"),
	third: z.string().min(1, "Third paragraph cannot be empty"),
})

const storyFirstSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	content: storyFirstContentSchema,
	image: z.string().min(1).url("The image must be a valid URL"),
})

const storySecondSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	description: z.string().min(1, "The description cannot be empty"),
	content: z.string().min(1, "The content cannot be empty"),
	image: z.string().min(1).url("The image must be a valid URL"),
})

const storySchema = z.object({
	first: storyFirstSchema,
	second: storySecondSchema,
})

const funFactSchema = z.object({
	id: z.number(),
	title: z.string().min(1, "Fun fact title cannot be empty"),
})

const enoughSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	about_course: z.string().min(1, "The course description cannot be empty"),
})

export const AboutPageSchema = z.object({
	_id: z.string().length(24, "The _id must have 24 characters (valid ObjectId)"), // ObjectId de MongoDB
	page_name: z.string().min(1, "The page name cannot be empty"),
	sections: z.object({
		"hero": heroAboutSchema,
		"story": storySchema,
		"fun-facts": z.array(funFactSchema),
		"enough": enoughSchema,
	}),
})

export type AboutPageZodSchemaType = z.infer<typeof AboutPageSchema>

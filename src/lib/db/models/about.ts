import { z } from "zod"
import { ZodValidators as v } from "../../validator/zod-validators"

const heroAboutSchema = z.object({
	title: v.stringWithConstraints({ minLength: 1, emptyMessage: "The title cannot be empty" }),
	subtitle: v.stringWithConstraints({ minLength: 1, emptyMessage: "The subtitle cannot be empty" }),
	description: v.stringWithConstraints({ minLength: 1, emptyMessage: "The description cannot be empty" }),
	image: v.url("The image must be a valid URL"),
})

const storyFirstContentSchema = z.object({
	first: v.stringWithConstraints({ minLength: 1, emptyMessage: "First paragraph cannot be empty" }),
	second: v.stringWithConstraints({ minLength: 1, emptyMessage: "Second paragraph cannot be empty" }),
	third: v.stringWithConstraints({ minLength: 1, emptyMessage: "Third paragraph cannot be empty" }),
})

const storyFirstSchema = z.object({
	title: v.stringWithConstraints({ minLength: 1, emptyMessage: "The title cannot be empty" }),
	content: storyFirstContentSchema,
	image: v.url("The image must be a valid URL"),
})

const storySecondSchema = z.object({
	title: v.stringWithConstraints({ minLength: 1, emptyMessage: "The title cannot be empty" }),
	description: v.stringWithConstraints({ minLength: 1, emptyMessage: "The description cannot be empty" }),
	content: v.stringWithConstraints({ minLength: 1, emptyMessage: "The content cannot be empty" }),
	image: v.url("The image must be a valid URL"),
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
	image: z.string().min(1).url("The image must be a valid URL"),
})

export const AboutPageSchema = z.object({
	"hero": heroAboutSchema,
	"story": storySchema,
	"fun-facts": z.array(funFactSchema),
	"enough": enoughSchema,
})

export type AboutPageZodSchemaType = z.infer<typeof AboutPageSchema>

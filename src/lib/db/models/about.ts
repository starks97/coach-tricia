import { object, array, number, string, type infer as Infer } from "zod"
import { ZodValidators as v } from "../../validator/zod-validators"

const heroAboutSchema = object({
	title: v.stringWithConstraints({ minLength: 1, emptyMessage: "The title cannot be empty" }),
	subtitle: v.stringWithConstraints({ minLength: 1, emptyMessage: "The subtitle cannot be empty" }),
	description: v.stringWithConstraints({
		minLength: 1,
		emptyMessage: "The description cannot be empty",
	}),
	image: v.url("The image must be a valid URL"),
})

const storyFirstContentSchema = object({
	first: v.stringWithConstraints({ minLength: 1, emptyMessage: "First paragraph cannot be empty" }),
	second: v.stringWithConstraints({
		minLength: 1,
		emptyMessage: "Second paragraph cannot be empty",
	}),
	third: v.stringWithConstraints({ minLength: 1, emptyMessage: "Third paragraph cannot be empty" }),
})

const storyFirstSchema = object({
	title: v.stringWithConstraints({ minLength: 1, emptyMessage: "The title cannot be empty" }),
	content: storyFirstContentSchema,
	image: v.url("The image must be a valid URL"),
})

const storySecondSchema = object({
	title: v.stringWithConstraints({ minLength: 1, emptyMessage: "The title cannot be empty" }),
	description: v.stringWithConstraints({
		minLength: 1,
		emptyMessage: "The description cannot be empty",
	}),
	content: v.stringWithConstraints({ minLength: 1, emptyMessage: "The content cannot be empty" }),
	image: v.url("The image must be a valid URL"),
})

const storySchema = object({
	first: storyFirstSchema,
	second: storySecondSchema,
})

const funFactSchema = object({
	id: number(),
	title: string().min(1, "Fun fact title cannot be empty"),
})

const enoughSchema = object({
	title: string().min(1, "The title cannot be empty"),
	about_course: string().min(1, "The course description cannot be empty"),
	image: string().min(1).url("The image must be a valid URL"),
})

export const AboutPageSchema = object({
	"hero": heroAboutSchema,
	"story": storySchema,
	"fun-facts": array(funFactSchema),
	"enough": enoughSchema,
})

export type AboutPageZodSchemaType = Infer<typeof AboutPageSchema>

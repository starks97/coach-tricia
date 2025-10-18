import z from "zod"
import { ZodValidators as v } from "../../validator/zod-validators"

const heroContactSchema = z.object({
	title: v.stringWithConstraints({ minLength: 1, emptyMessage: "The title cannot be empty" }),
	subtitle: v.stringWithConstraints({ minLength: 1, emptyMessage: "The subtitle cannot be empty" }),
	description: v.stringWithConstraints({ minLength: 1, emptyMessage: "The description cannot be empty" }),
	image: v.url("The image must be a valid URL"),
})

export const ContactPageSchema = z.object({
	hero: heroContactSchema,
})

export type ContactPageZodSchemaType = z.infer<typeof ContactPageSchema>

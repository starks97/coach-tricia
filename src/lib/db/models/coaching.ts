import z from "zod"
import { ZodValidators as v } from "../../validator/zod-validators"

const heroCoachingSchema = z.object({
	title: v.stringWithConstraints({ minLength: 1, emptyMessage: "The title cannot be empty" }),
	subtitle: v.stringWithConstraints({ minLength: 1, emptyMessage: "The subtitle cannot be empty" }),
	description: v.stringWithConstraints({ minLength: 1, emptyMessage: "The description cannot be empty" }),
	image: v.url("The image must be a valid URL"),
})

const stepsSchema = z.object({
	id: z.number(),
	title: v.stringWithConstraints({ minLength: 1, emptyMessage: "The title cannot be empty" }),
	description: v.stringWithConstraints({ minLength: 1, emptyMessage: "The description cannot be empty" }),
	image: v.url("The image must be a valid URL"),
})

const guideSchema = z.object({
	title: v.stringWithConstraints({ minLength: 1, emptyMessage: "The title cannot be empty" }),
	subtitle: v.stringWithConstraints({ minLength: 1, emptyMessage: "The subtitle cannot be empty" }),
	description: v.stringWithConstraints({ minLength: 1, emptyMessage: "The description cannot be empty" }),
	steps: z.array(stepsSchema),
})

const paymentPlanSchema = z.object({
	id: z.number(),
	title: v.stringWithConstraints({ minLength: 1, emptyMessage: "The title cannot be empty" }),
	description: v.stringWithConstraints({ minLength: 1, emptyMessage: "The description cannot be empty" }),
	price: z.number().min(0, "The price cannot be negative"),
	image: v.url("The image must be a valid URL"),
})

const connectSchema = z.object({
	title: v.stringWithConstraints({ minLength: 1, emptyMessage: "The title cannot be empty" }),
	subtitle: v.stringWithConstraints({ minLength: 1, emptyMessage: "The subtitle cannot be empty" }),
	description: v.stringWithConstraints({ minLength: 1, emptyMessage: "The description cannot be empty" }),
	image: v.url("The image must be a valid URL"),
})

export const CoachingPageSchema = z.object({
	hero: heroCoachingSchema,
	guide: guideSchema,
	paymentPlan: z.array(paymentPlanSchema),
	connect: connectSchema,
})

export type CoachingPageZodSchemaType = z.infer<typeof CoachingPageSchema>

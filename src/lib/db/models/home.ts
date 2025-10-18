import { z } from "zod"
import { ZodValidators as v } from "../../validator/zod-validators"

const reviewSchema = z.object({
	title: v.stringWithConstraints({ minLength: 5, emptyMessage: "The title can not be empty" }),
	quote: v.stringWithConstraints({ minLength: 10, emptyMessage: "The quote can not be empty" }),
	author: v.stringWithConstraints({ minLength: 3, emptyMessage: "The author can not be empty" }),
})

const userPainPointsSchema = z.object({
	title: v.stringWithConstraints({ minLength: 5, emptyMessage: "The title cannot be empty" }),
	subtitle: v.stringWithConstraints({ minLength: 5, emptyMessage: "The subtitle cannot be empty" }),
	pain_points: z.array(
		v.stringWithConstraints({ minLength: 5, emptyMessage: "The pain point can not be empty" })
	),
	reviews: z.array(reviewSchema),
})

const heroSchema = z.object({
	title: v.stringWithConstraints({ minLength: 5, emptyMessage: "The title cannot be empty" }),
	subtitle: v.stringWithConstraints({ minLength: 5, emptyMessage: "The subtitle cannot be empty" }),
	description: v.stringWithConstraints({
		minLength: 10,
		emptyMessage: "The description cannot be empty",
	}),
	image: v.url("The image must be a valid URL"),
})

const benefitsSchema = z.object({
	title: v.stringWithConstraints({ minLength: 5, emptyMessage: "The title cannot be empty" }),
	benefits: z.array(
		v.stringWithConstraints({ minLength: 5, emptyMessage: "The benefit can not be empty" })
	),
	image: v.url("The image must be a valid URL"),
})

const coachingInfoSchema = z.object({
	title: v.stringWithConstraints({ minLength: 5, emptyMessage: "The title cannot be empty" }),
	subtitle: v.stringWithConstraints({ minLength: 5, emptyMessage: "The subtitle cannot be empty" }),
	description: v.stringWithConstraints({
		minLength: 10,
		emptyMessage: "The description cannot be empty",
	}),
	image: v.url("The image must be a valid URL"),
})

const podcastSchema = z.object({
	title: v.stringWithConstraints({ minLength: 5, emptyMessage: "The title cannot be empty" }),
	description: v.stringWithConstraints({
		minLength: 10,
		emptyMessage: "The description cannot be empty",
	}),
	image: v.url("The image must be a valid URL"),
})

export const HomePageSchema = z.object({
	hero: heroSchema,
	user_pain_points: userPainPointsSchema,
	benefits: benefitsSchema,
	coaching_info: coachingInfoSchema,
	podcast: podcastSchema,
})

export type HomePageZodSchemaType = z.infer<typeof HomePageSchema>

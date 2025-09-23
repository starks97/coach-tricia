import { z } from "zod"

const requiredString = (message: string) =>
	z
		.string()
		.min(1, message)
		.refine((val) => val.trim().length > 0, message)

const requiredUrl = (message: string) =>
	z.url(message).refine((val) => val.trim().length > 0, message)

const reviewSchema = z.object({
	title: requiredString("The title cannot be empty"),
	quote: requiredString("The quote cannot be empty"),
	author: requiredString("The author cannot be empty"),
})

const userPainPointsSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	subtitle: z.string().min(1, "The subtitle cannot be empty"),
	pain_points: z.array(z.string().min(1, "The pain point cannot be empty")),
	reviews: z.array(reviewSchema).min(1, "There must be at least one review"),
})

const heroSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	subtitle: z.string().min(1, "The subtitle cannot be empty"),
	description: z.string().min(1, "The description cannot be empty"),
	image: z.url("The image must be a valid URL"),
})

const benefitsSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	benefits: z.array(z.string().min(1, "Each benefit must be a non-empty string")),
	image: z.url("The image must be a valid URL"),
})

const coachingInfoSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	subtitle: z.string().min(1, "The subtitle cannot be empty"),
	description: z.string().min(1, "The description cannot be empty"),
	image: z.url("The image must be a valid URL"),
})

const podcastSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	description: z.string().min(1, "The description cannot be empty"),
	image: z.url("The image must be a valid URL"),
})

export const HomePageSchema = z.object({
	hero: heroSchema,
	user_pain_points: userPainPointsSchema,
	benefits: benefitsSchema,
	coaching_info: coachingInfoSchema,
	podcast: podcastSchema,
})

export type HomePageZodSchemaType = z.infer<typeof HomePageSchema>

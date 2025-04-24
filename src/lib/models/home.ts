import { z } from "zod"

const reviewSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	quote: z.string().min(1, "The quote cannot be empty"),
	author: z.string().min(1, "The author cannot be empty"),
})

const heroSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	subtitle: z.string().min(1, "The subtitle cannot be empty"),
	description: z.string().min(1, "The description cannot be empty"),
	image: z.string().url("The image must be a valid URL"),
})

const userPainPointsSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	subtitle: z.string().min(1, "The subtitle cannot be empty"),
	pain_points: z.array(z.string().min(1, "Each pain point must be a non-empty string")),
	reviews: z.array(reviewSchema).min(1, "There must be at least one review"),
})

const benefitsSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	benefits: z.array(z.string().min(1, "Each benefit must be a non-empty string")),
	image: z.string().url("The image must be a valid URL"),
})

const coachingInfoSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	subtitle: z.string().min(1, "The subtitle cannot be empty"),
	description: z.string().min(1, "The description cannot be empty"),
	image: z.string().url("The image must be a valid URL"),
})

const podcastSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	description: z.string().min(1, "The description cannot be empty"),
	image: z.string().url("The image must be a valid URL"),
})

export const HomePageSchema = z.object({
	_id: z.string().length(24, "The _id must have 24 characters (valid ObjectId)"), // ObjectId de MongoDB
	page_name: z.string().min(1, "The page name cannot be empty"),
	sections: z.object({
		hero: heroSchema,
		user_pain_points: userPainPointsSchema,
		benefits: benefitsSchema,
		coaching_info: coachingInfoSchema,
		podcast: podcastSchema,
	}),
})

export type HomePageZodSchemaType = z.infer<typeof HomePageSchema>

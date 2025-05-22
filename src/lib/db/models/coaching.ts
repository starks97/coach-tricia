import z from "zod"

const heroCoachingSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	subtitle: z.string().min(1, "The subtitle cannot be empty"),
	description: z.string().min(1, "The description cannot be empty"),
	image: z.string().min(1).url("The image must be a valid URL"),
})

const stepsSchema = z.object({
	id: z.number(),
	title: z.string().min(1, "The title cannot be empty"),
	description: z.string().min(1, "The description cannot be empty"),
	image: z.string().min(1).url("The image must be a valid URL"),
})

const guideSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	subtitle: z.string().min(1, "The subtitle cannot be empty"),
	description: z.string().min(1, "The description cannot be empty"),
	steps: z.array(stepsSchema),
})

const paymentPlanSchema = z.object({
	id: z.number(),
	title: z.string().min(1, "The title cannot be empty"),
	description: z.string().min(1, "The description cannot be empty"),
	price: z.number().min(0, "The price cannot be negative"),
	image: z.string().min(1).url("The image must be a valid URL"),
})

const connectSchema = z.object({
	title: z.string().min(1, "The title cannot be empty"),
	subtitle: z.string().min(1, "The subtitle cannot be empty"),
	description: z.string().min(1, "The description cannot be empty"),
	image: z.string().min(1).url("The image must be a valid URL"),
})

export const CoachingPageSchema = z.object({
	_id: z.string().min(5, "the id has to have at least 5 characters"),
	page_name: z.string().min(1, "The page name cannot be empty"),
	sections: z.object({
		hero: heroCoachingSchema,
		guide: guideSchema,
		payment_plan: z.array(paymentPlanSchema),
		connect: connectSchema,
	}),
})

export const CoachingPageSectionSchema = z.object({
	hero: heroCoachingSchema,
	guide: guideSchema,
	paymentPlan: z.array(paymentPlanSchema),
	connect: connectSchema,
})

export type CoachingPageSectionSchemaType = z.infer<typeof CoachingPageSectionSchema>

export type CoachingPageZodSchemaType = z.infer<typeof CoachingPageSchema>

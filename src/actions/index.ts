import { defineAction, ActionError } from "astro:actions"
import { z } from "astro:schema"
import { sendEmail } from "../utilities/email"

export const server = {
	sendEmail: defineAction({
		accept: "form",
		input: z.object({
			name: z.string().min(2).max(100),
			lastName: z.string().min(2).max(100),
			email: z.string().email(),
			message: z.string().min(10).max(500),
		}),
		handler: async (input, context) => {
			console.log("Received input:", input)

			try {
				const html = `<p>Name: ${input.name}</p><p>Last Name: ${input.lastName}</p><p>Email: ${input.email}</p><p>Message: ${input.message}</p>`

				await sendEmail({
					to: "cazcodavid@gmail.com",
					subject: "New message from your website",
					from: input.email,
					html,
				})

				console.log("Email sent successfully!")
			} catch (error) {
				console.error("Error while sending email:", error)
			}
		},
	}),
}

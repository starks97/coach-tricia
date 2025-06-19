import { defineAction } from "astro:actions"
import { z } from "astro:schema"
import { sendEmail } from "@lib/email/config"
import { myEmail } from "~/consts"

export const email = {
	send: defineAction({
		accept: "form",
		input: z.object({
			name: z.string(),
			lastName: z.string(),
			email: z.string().email(),
			message: z.string().min(10).max(500),
		}),
		handler: async (input) => {
			try {
				const html = `
          <h1>New message from your website</h1>
          <p><strong>Name:</strong> ${input.name} ${input.lastName}</p>
          <p><strong>Email:</strong> ${input.email}</p>
          <p><strong>Message:</strong></p>
          <p>${input.message}</p>
        `

				const result = await sendEmail({
					to: `${myEmail}`,
					subject: `New message from ${input.email}`,
					html,
					replyTo: input.email,
				})

				if (!result.success) {
					return {
						success: false,
						error: result.error || "Failed to send email",
					}
				}

				return { success: result.success }
			} catch (error) {
				console.error("Error while sending email:", error)
				return new Response(
					JSON.stringify({
						success: false,
						error: error,
					}),
					{
						status: 500,
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
			}
		},
	}),
}

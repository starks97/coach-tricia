import { createTransport, type SendMailOptions, type Transporter } from "nodemailer"
import { RESEND_API_KEY } from "astro:env/server"
import { subDomain } from "~/consts"

export async function sendEmail(options: SendMailOptions) {
	const transporter = await getEmailTransporter()

	try {
		const info = transporter.sendMail({
			from: `"Coach Tricia" ${subDomain}`,
			to: options.to,
			subject: options.subject,
			html: options.html,
			replyTo: options.replyTo,
		})

		return { success: true, info }
	} catch (error) {
		console.error("Email sending failed:", error)
		return { success: false, error }
	}
}

async function getEmailTransporter(): Promise<Transporter> {
	if (!RESEND_API_KEY) {
		throw new Error("RESEND_API_KEY is not set")
	}
	return new Promise((resolve, _) => {
		const transporter = createTransport({
			host: "smtp.resend.com",
			secure: true,
			port: 465,
			auth: { user: "resend", pass: RESEND_API_KEY },
		})

		resolve(transporter)
	})
}

import { createTransport, type SendMailOptions, type Transporter } from "nodemailer"
import { RESEND_API_KEY } from "astro:env/server"

export async function sendEmail(options: SendMailOptions): Promise<Transporter> {
	const transporter = await getEmailTransporter()

	return new Promise(async (resolve, reject) => {
		const { to, subject, html, from } = options
		const message = {
			from,
			to,
			subject,
			html,
		}

		transporter.sendMail(message, (err, info) => {
			if (err) {
				console.error(err)
				reject(err)
			} else {
				resolve(info)
			}
		})
	})
}

async function getEmailTransporter(): Promise<Transporter> {
	if (!RESEND_API_KEY) {
		throw new Error("RESEND_API_KEY is not set")
	}
	return new Promise((resolve, reject) => {
		const transporter = createTransport({
			host: "smtp.resend.com",
			secure: true,
			port: 465,
			auth: { user: "resend", pass: RESEND_API_KEY },
		})

		resolve(transporter)
	})
}

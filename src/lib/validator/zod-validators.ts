import { z } from "zod"

export class ZodValidators {
	static nonEmptyString(message: string = "This field cannot be empty") {
		return z.preprocess(
			(val) => (val === null || val === undefined ? "" : val),
			z
				.string()
				.min(1, message)
				.refine((val) => val.trim() !== "", { message })
		)
	}
	static minLengthString(min: number, message?: string) {
		const defaultMessage = `Must be at least ${min} characters long`
		return z.preprocess(
			(val) => (val === null || val === undefined ? "" : val),
			z
				.string()
				.min(min, message || defaultMessage)
				.refine((val) => val.trim() !== "", {
					message: message || "This field cannot be empty",
				})
		)
	}

	static email(message: string = "Please enter a valid email address") {
		return z.preprocess(
			(val) => (val === null || val === undefined ? "" : val),
			z.string().email(message)
		)
	}
	static url(message: string = "Please enter a valid URL") {
		return z.preprocess(
			(val) => (val === null || val === undefined ? "" : val),
			z.string().url(message)
		)
	}

	static stringWithConstraints(options: {
		minLength?: number
		maxLength?: number
		pattern?: RegExp
		patternMessage?: string
		emptyMessage?: string
	}) {
		const {
			minLength = 1,
			maxLength,
			pattern,
			patternMessage,
			emptyMessage = "This field cannot be empty",
		} = options

		let baseString = z
			.string()
			.min(1, emptyMessage)
			.refine((val) => val.trim() !== "", { message: emptyMessage })

		if (minLength > 1) {
			baseString = baseString.min(
				minLength,
				`${emptyMessage} and at least ${minLength} characters long`
			)
		}

		if (maxLength) {
			baseString = baseString.max(maxLength, `Must be at most ${maxLength} characters long`)
		}

		if (pattern) {
			baseString = baseString.refine((val) => pattern.test(val), {
				message: patternMessage || "Invalid format",
			})
		}

		const schema = z.preprocess((val) => (val === null || val === undefined ? "" : val), baseString)

		return schema
	}
}

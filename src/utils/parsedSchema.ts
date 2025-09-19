import { z } from "zod/v4"

export interface FieldErrors {
	[key: string]: string
}

function parsedZodError(error: z.ZodError) {
	const fieldErrors: FieldErrors = {}
	error.issues.forEach((issue) => {
		if (issue.path.length > 0) {
			fieldErrors[issue.path.join(".")] = issue.message
		}
	})
	return fieldErrors
}
export function parseSchema<T extends z.ZodType>(
	_schema: T,
	data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: FieldErrors } {
	const result = _schema.safeParse(data)
	if (!result.success) {
		const fieldErrors: FieldErrors = parsedZodError(result.error)
		return { success: false, errors: fieldErrors }
	} else {
		return { success: true, data: result.data }
	}
}

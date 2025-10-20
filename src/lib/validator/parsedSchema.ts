import { z } from "zod"

import { type FieldErrors } from "@components/dashboard/form/types"

/**
 * Transforms Zod validation errors into a flat field error object
 *
 * This utility function converts Zod's complex error structure into a simple
 * key-value object where keys are field paths and values are error messages.
 * This is particularly useful for form validation where you need to display
 * field-specific errors in a structured manner.
 *
 * @param error - The ZodError object containing validation issues
 * @returns FieldErrors - A flat object with field paths as keys and error messages as values
 *
 * @example
 * // Zod error structure:
 * // { issues: [{ path: ['user', 'email'], message: 'Invalid email' }] }
 * // Becomes:
 * // { 'user.email': 'Invalid email' }
 */
function parsedZodError(error: z.ZodError) {
	const fieldErrors: FieldErrors = {}

	// Iterate through each validation issue found by Zod
	error.issues.forEach((issue) => {
		// Only process errors that have a specific field path (named fields)
		if (issue.path.length > 0) {
			// Convert the path array into a dot-separated string
			// Example: ['user', 'profile', 'email'] → 'user.profile.email'
			const fieldPath = issue.path.join(".")
			fieldErrors[fieldPath] = issue.message
		}
	})

	console.log(fieldErrors)

	return fieldErrors
}

/**
 * Validates unknown data against a Zod schema and returns a standardized result
 *
 * This function acts as a wrapper around Zod's safeParse() method, transforming
 * the validation results into a more application-friendly format. It provides
 * type-safe validation with clear success/error states.
 *
 * @template T - The Zod schema type
 * @param _schema - The Zod schema to validate against
 * @param data - The unknown data to validate (typed as unknown for type safety)
 * @returns A result object indicating success or failure with corresponding data
 *
 * @example
 * const result = parseSchema(userSchema, formData);
 * if (result.success) {
 *   // TypeScript knows result.data is properly typed
 *   console.log('Valid data:', result.data);
 * } else {
 *   // Display field-specific errors
 *   console.log('Validation errors:', result.errors);
 * }
 */
export function parseSchema<T extends z.ZodType>(
	_schema: T, // Zod schema for validation
	data: unknown // Data to validate (typed as unknown for safety)
):
	| { success: true; data: z.infer<T> } // Success case
	| { success: false; errors: FieldErrors } {
	// Error case

	// Perform validation using Zod's safeParse
	const result = _schema.safeParse(data)

	if (!result.success) {
		// Transform Zod errors into our flat field error format
		const fieldErrors: FieldErrors = parsedZodError(result.error)
		return {
			success: false,
			errors: fieldErrors,
		}
	} else {
		// Return typed data when validation succeeds
		return {
			success: true,
			data: result.data,
		}
	}
}

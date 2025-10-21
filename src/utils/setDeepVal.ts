import { cloneDeepPlain } from "./cloneDeepPlain"

/**
 * Updates a deeply nested property in an object, creating the necessary
 * structure if it doesn't exist. Handles both objects and arrays.
 *
 * @param obj - The source object to update
 * @param path - Dot notation path to the property (e.g.: 'user.profile.name')
 * @param value - The value to assign
 * @returns A new object with the updated value (immutable operation)
 *
 * @example
 * // Update nested object property
 * updateFormField(formData, 'user.profile.name', 'John')
 *
 * @example
 * // Update array element
 * updateFormField(formData, 'hobbies.0', 'Reading')
 *
 * @example
 * // Update object within array
 * updateFormField(formData, 'contacts.1.email', 'test@example.com')
 */
export const updateFormField = (obj: any, path: string, value: any): any => {
	const newObj = cloneDeepPlain(obj)

	const keys = path.split(".").filter((key) => key !== "")

	let current = newObj

	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i]
		const nextKey = keys[i + 1]

		if (current[key] === undefined || current[key] === null) {
			current[key] = !isNaN(Number(nextKey)) ? [] : {}
		}
		current = current[key]
	}

	const lastKey = keys[keys.length - 1]

	if (Array.isArray(current) && !isNaN(Number(lastKey))) {
		const index = parseInt(lastKey)
		current[index] = value
	} else {
		current[lastKey] = value
	}

	return newObj
}

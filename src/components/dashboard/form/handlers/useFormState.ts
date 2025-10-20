import { createStore, reconcile, produce } from "solid-js/store"
import { createSignal } from "solid-js"

import type { FieldErrors, SchemaType } from "../types"
import type { PageTypeMap } from "~/lib/db/types"

import { setDeepValue } from "~/utils/setDeepVal"
import { parseSchema } from "@lib/validator/parsedSchema"

export function useFormState<T extends keyof PageTypeMap>(
	initialData: PageTypeMap[T],
	schema: SchemaType
) {
	const [errors, setErrors] = createStore<FieldErrors>({})
	const [fieldChanged, setFieldChanged] = createSignal<Record<string, any> | null>(null)
	const [localFormData, setLocalFormData] = createStore<PageTypeMap[T]>(initialData)
	const handleUpdateField = (path: string, value: any) => {
		const newValue = value === "" ? null : value

		//set the field that changed
		setFieldChanged({ [path]: newValue })

		//validation on real time
		const newData = setDeepValue({ ...localFormData }, path, newValue)

		setLocalFormData(newData)

		const result = parseSchema(schema, newData)

		if (!result.success) {
			setErrors(reconcile(result.errors))
		} else {
			setErrors(
				produce((errors) => {
					delete errors[path]
				})
			)
		}
	}

	return {
		errors,
		localFormData,
		fieldChanged,
		handleUpdateField,
		setLocalFormData,
		setErrors,
	}
}

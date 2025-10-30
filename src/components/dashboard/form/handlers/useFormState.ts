import { createStore, reconcile, produce } from "solid-js/store"

import type { FieldErrors, SchemaType, HistoryType } from "../types"
import type { PageTypeMap } from "~/lib/db/types"

import { parseSchema } from "@lib/validator/parsedSchema"
import { FormEngine } from "../formEngine"

export function useFormState<T extends keyof PageTypeMap>(
	initialData: PageTypeMap[T],
	schema: SchemaType
) {
	const [history, setHistory] = createStore<HistoryType<T>>({
		past: [],
		future: [],
	})

	const [errors, setErrors] = createStore<FieldErrors>({})

	// ✅ SOLO UN STORE para los datos que se renderizan
	const [formData, setFormData] = createStore<PageTypeMap[T]>(initialData)

	const cloneDeep = (obj: any) => JSON.parse(JSON.stringify(obj))

	const onBlurField = (path: string, value: any) => {
		const currentValue = FormEngine.getDeepValue(formData, path)
		const newValue = value === "" ? null : value

		if (currentValue === newValue) return

		const newData = FormEngine.setDeepValue(cloneDeep(formData), path, newValue)

		setHistory(
			produce((h) => {
				h.past = [
					{
						changes: { [path]: newValue },
						timestamp: Date.now(),
						previusData: cloneDeep(formData), // ✅ Usar formData
					},
					...h.past.slice(0, 49),
				]
				h.future = []
			})
		)

		// ✅ Actualizar el store que se renderiza
		setFormData(reconcile(newData))

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

	const undo = () => {
		if (history.past.length === 0) return

		const [lastChange, ...remainingPast] = history.past

		setHistory(
			produce((h) => {
				h.future = [lastChange, ...h.future.slice(0, 49)]
				h.past = remainingPast
			})
		)

		// ✅ Actualizar el store que se renderiza
		setFormData(reconcile(cloneDeep(lastChange.previusData)))

		const result = parseSchema(schema, lastChange.previusData)
		if (!result.success) {
			setErrors(reconcile(result.errors))
		} else {
			setErrors({})
		}
	}

	const redo = () => {
		if (history.future.length === 0) return

		const [nextChange, ...remainingFuture] = history.future
		setHistory(
			produce((h) => {
				h.past = [nextChange, ...h.past.slice(0, 49)]
				h.future = remainingFuture
			})
		)

		const previusDataClone = cloneDeep(nextChange.previusData)
		const newData = FormEngine.setDeepValue(
			previusDataClone,
			Object.keys(nextChange.changes)[0],
			Object.values(nextChange.changes)[0]
		)

		// ✅ Actualizar el store que se renderiza
		setFormData(reconcile(newData))

		const result = parseSchema(schema, newData)
		if (!result.success) {
			setErrors(reconcile(result.errors))
		} else {
			setErrors({})
		}
	}

	const handleSubmit = () => {
		const result = parseSchema(schema, formData)
		if (!result.success) {
			setErrors(reconcile(result.errors))
			return false
		}

		setErrors({})
		return true
	}

	const syncWithExternalData = (externalData: PageTypeMap[T]) => {
		if (history.past.length === 0) {
			setFormData(reconcile(externalData))
		}
	}

	return {
		errors,
		handleSubmit,
		setErrors,
		formData,
		undo,
		redo,
		canRedo: () => history.future.length > 0,
		canUndo: () => history.past.length > 0,
		onBlurField,
		history,
		syncWithExternalData,
	}
}

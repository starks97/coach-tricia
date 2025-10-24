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

	const [realFormData, setRealFormData] = createStore<PageTypeMap[T]>(initialData)
	const [draftFormData, setDraftFormData] = createStore<PageTypeMap[T]>(initialData)

	const onBlurField = (path: string, value: any) => {
		const newValue = value === "" ? null : value

		const newData = FormEngine.setDeepValue({ ...draftFormData }, path, newValue)

		setHistory(
			produce((h) => {
				h.past = [
					{
						changes: { [path]: newValue },
						timestamp: Date.now(),
						previusData: { ...draftFormData },
					},
					...h.past.slice(0, 49),
				]
				h.future = []
			})
		)

		setDraftFormData(newData)
		setRealFormData(reconcile(newData))
		const result = parseSchema(schema, draftFormData)
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

	const handleSubmit = (formData: Record<string, any>) => {
		let newData = { ...realFormData }

		for (const [path, value] of Object.entries(formData)) {
			newData = FormEngine.setDeepValue(newData, path, value)
		}

		const result = parseSchema(schema, newData)
		if (!result.success) {
			setErrors(reconcile(result.errors))
			return false
		}

		setRealFormData(newData)
		setDraftFormData(newData)
		setErrors({})

		return true
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

		setDraftFormData(lastChange.previusData)
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
		const newData = FormEngine.setDeepValue(
			{ ...nextChange.previusData },
			Object.keys(nextChange.changes)[0],
			Object.values(nextChange.changes)[0]
		)

		setDraftFormData(newData)

		const result = parseSchema(schema, newData)
		if (!result.success) {
			setErrors(reconcile(result.errors))
		} else {
			setErrors({})
		}
	}

	return {
		errors,
		localFormData: draftFormData,
		handleSubmit,
		setLocalFormData: setDraftFormData,
		setErrors,
		undo,
		redo,
		canRedo: () => history.future.length > 0,
		canUndo: () => history.past.length > 0,
		onBlurField,
		history,
		setRealFormData,
	}
}

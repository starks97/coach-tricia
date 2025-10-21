import { createStore, reconcile, produce } from "solid-js/store"
import { createSignal, createEffect } from "solid-js"

import type { FieldErrors, SchemaType } from "../types"
import type { PageTypeMap } from "~/lib/db/types"

import { setDeepValue } from "~/utils/setDeepVal"
import { parseSchema } from "@lib/validator/parsedSchema"

export function useFormState<T extends keyof PageTypeMap>(
	initialData: PageTypeMap[T],
	schema: SchemaType
) {
	const [history, setHistory] = createStore<{
		past: Array<{
			changes: Record<string, any>
			timestamp: number
			previusData: PageTypeMap[T]
		}>
		future: Array<{
			changes: Record<string, any>
			timestamp: number
			previusData: PageTypeMap[T]
		}>
	}>({
		past: [],
		future: [],
	})

	const [errors, setErrors] = createStore<FieldErrors>({})
	const [fieldChanged, setFieldChanged] = createSignal<Record<string, any> | null>(null)
	const [localFormData, setLocalFormData] = createStore<PageTypeMap[T]>(initialData)

	const handleUpdateField = (path: string, value: any) => {
		const newValue = value === "" ? null : value

		//set the field that changed
		setFieldChanged({ [path]: newValue })

		const previousState = { ...localFormData }

		setHistory(
			produce((h) => {
				h.past = [
					{
						changes: { [path]: newValue },
						timestamp: Date.now(),
						previusData: previousState,
					},
					...h.past.slice(0, 49),
				]
				h.future = []
			})
		)

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

	const undo = () => {
		if (history.past.length === 0) return

		const [lastChange, ...remainingPast] = history.past

		setHistory(
			produce((h) => {
				h.future = [lastChange, ...h.future.slice(0, 49)]
				h.past = remainingPast
			})
		)

		setLocalFormData(lastChange.previusData)
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
		const path = Object.keys(nextChange.changes)[0]
		const value = Object.values(nextChange.changes)[0]
		const newData = setDeepValue({ ...localFormData }, path, value)
		setLocalFormData(newData)

		const result = parseSchema(schema, newData)
		if (!result.success) {
			setErrors(reconcile(result.errors))
		} else {
			setErrors({})
		}
	}

	createEffect(() => {
		console.log("field changed:", fieldChanged())
		console.log("history:", history)
	})
	return {
		errors,
		localFormData,
		fieldChanged,
		handleUpdateField,
		setLocalFormData,
		setErrors,
		undo,
		redo,
		canRedo: () => history.future.length > 0,
		canUndo: () => history.past.length > 0,
	}
}

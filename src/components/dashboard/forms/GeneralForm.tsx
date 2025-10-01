import { useMutation } from "@tanstack/solid-query"

import { parseSchema } from "~/utils/parsedSchema"
import { createStore, reconcile, produce } from "solid-js/store"
import type { PageTypeMap, PageTypeKeys } from "~/types"
import { setDeepValue } from "~/utils/setDeepVal"

import type { FieldErrors, GeneralFormProps } from "~/types"
import RenderFields from "./handlers/RenderFields"

export default function GeneralForm<T extends PageTypeKeys>({ ...props }: GeneralFormProps<T>) {
	const [formData, setFormData] = createStore<PageTypeMap[T]>(props.data)
	const [errors, setErrors] = createStore<FieldErrors>({})

	const handleUpdateField = (path: string, value: any) => {
		const newValue = value === "" ? null : value
		//validation on real time
		const newData = setDeepValue(formData, path, newValue)
		const result = parseSchema(props.schema, newData)

		setFormData(newData)

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

	const handleSubmit = (e: Event) => {
		e.preventDefault()

		const result = parseSchema(props.schema, formData)

		if (!result.success) {
			console.log("keys of the errors", Object.entries(result.errors))
			setErrors(result.errors)
		}
	}

	return (
		<div class="p-5">
			<form
				onSubmit={handleSubmit}
				class="general-form border-taupe flex flex-col space-y-10 rounded border p-10"
			>
				<RenderFields
					data={formData}
					errors={errors}
					setFormData={setFormData}
					path=""
					handleUpdateField={handleUpdateField}
				/>

				<div class="form-actions">
					<button
						type="submit"
						class="font-tajawal text-taupe mb-2 border-2 px-5 py-2.5 text-center text-xl font-extrabold tracking-[0.07em] uppercase"
					>
						Save Changes
					</button>
				</div>
			</form>
		</div>
	)
}

import { parseSchema } from "@lib/validator/parsedSchema"
import { reconcile } from "solid-js/store"
import { createEffect } from "solid-js"
import type { PageTypeKeys } from "@lib/db/types"

import type { GeneralFormProps } from "../types"
import RenderFields from "./RenderFields"

import { useFormMutation } from "../handlers/useFormMutation"
import { useFormState } from "../handlers/useFormState"

export default function GeneralForm<T extends PageTypeKeys>({ ...props }: GeneralFormProps<T>) {
	const formState = useFormState(props.data(), props.schema)
	const mutation = useFormMutation();

	createEffect(() => {
		// Sync local form data when props.data changes, unless there are unsaved changes
		if (Object.keys(formState.fieldChanged).length === 0) {
			formState.setLocalFormData(reconcile(props.data()))

		}
	})

	const handleSubmit = (e: Event) => {
		e.preventDefault()

		const result = parseSchema(props.schema, formState.localFormData)

		if (!result.success) {
			formState.setErrors(result.errors)
		}

		result.success && mutation.mutate({
			id: props.currentSection().key,
			page: props.currentSection().value,
			data: formState.fieldChanged() ?? {}
		})
	}

	return (
		<div class="p-5">
			<form
				onSubmit={handleSubmit}
				class="general-form border-taupe flex flex-col space-y-10 rounded border p-10"
			>
				<RenderFields
					data={formState.localFormData}
					errors={formState.errors}
					path=""
					handleUpdateField={formState.handleUpdateField}
				/>


				<div class="flex items-center justify-between w-full">
					<button class="font-tajawal text-taupe mb-2 border-2 px-5 py-2.5 text-center text-xl font-extrabold tracking-[0.07em] uppercase cursor-pointer hover:bg-taupe hover:text-white transition-colors duration-300" onClick={formState.undo} disabled={!formState.canUndo()}>Undo</button>
					<button class="font-tajawal text-taupe mb-2 border-2 px-5 py-2.5 text-center text-xl font-extrabold tracking-[0.07em] uppercase cursor-pointer hover:bg-taupe hover:text-white transition-colors duration-300" onClick={formState.redo} disabled={!formState.canRedo()}>Redo</button>
					<button
						type="submit"
						class="font-tajawal text-taupe mb-2 border-2 px-5 py-2.5 text-center text-xl font-extrabold tracking-[0.07em] uppercase cursor-pointer hover:bg-taupe hover:text-white transition-colors duration-300"
					>
						Save Changes
					</button>
				</div>
			</form>
		</div>
	)
}

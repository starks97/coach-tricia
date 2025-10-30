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
		formState.syncWithExternalData(props.data());
	})

	const handleSubmit = async (e: Event) => {
		e.preventDefault()
		const success = await formState.handleSubmit()

		if (success) {
			mutation.mutate({
				id: props.currentSection().key,
				page: props.currentSection().value,
				data: formState.formData,
			})
		}
	}

	return (
		<div class="p-5">
			<form
				onSubmit={handleSubmit}
				class="general-form border-taupe flex flex-col space-y-10 rounded border p-10"
			>
				<RenderFields
					data={formState.formData}
					errors={formState.errors}
					path=""
					onBlurField={formState.onBlurField}
				/>
				<div class="flex items-center justify-between w-full">
					<button type="button" class="font-tajawal text-taupe mb-2 border-2 px-5 py-2.5 text-center text-xl font-extrabold tracking-[0.07em] uppercase cursor-pointer hover:bg-taupe hover:text-white transition-colors duration-300" onClick={formState.undo} disabled={!formState.canUndo()}>Undo</button>
					<button type="button" class="font-tajawal text-taupe mb-2 border-2 px-5 py-2.5 text-center text-xl font-extrabold tracking-[0.07em] uppercase cursor-pointer hover:bg-taupe hover:text-white transition-colors duration-300" onClick={formState.redo} disabled={!formState.canRedo()}>Redo</button>
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

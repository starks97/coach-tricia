import { useMutation, useQueryClient } from "@tanstack/solid-query"

import { parseSchema } from "~/utils/parsedSchema"
import { createStore, reconcile, produce } from "solid-js/store"
import { createSignal, createEffect } from "solid-js"
import type { PageTypeMap, PageTypeKeys } from "~/types"
import { updateFormField } from "~/utils/setDeepVal"

import type { FieldErrors, GeneralFormProps } from "~/types"
import RenderFields from "./handlers/RenderFields"

import { updateSectionData } from "~/utils/queries"



export default function GeneralForm<T extends PageTypeKeys>({ ...props }: GeneralFormProps<T>) {
	const [errors, setErrors] = createStore<FieldErrors>({})

	const [fieldChanged, setFieldChanged] = createSignal<Record<string, any> | null>(null);

	const [localFormData, setLocalFormData] = createStore<PageTypeMap[T]>(props.data())

	const queryClient = useQueryClient();

	createEffect(() => {
		// Sync local form data when props.data changes, unless there are unsaved changes
		if (Object.keys(fieldChanged).length === 0) {
			setLocalFormData(reconcile(props.data()))
		}
	})


	const handleUpdateField = (path: string, value: any) => {
		const newValue = value === "" ? null : value

		//set the field that changed
		setFieldChanged({ [path]: newValue });

		//validation on real time
		const newData = updateFormField({ ...localFormData }, path, newValue)

		setLocalFormData(newData);

		const result = parseSchema(props.schema, newData)

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

	const mutation = useMutation(() => ({
		mutationFn: async (variables: { id: string; page: keyof PageTypeMap; data: Record<string, any> }) => {
			try {
				const res = await updateSectionData(
					variables.id,
					variables.page,
					variables.data
				)
				if (!res) {
					throw new Error("Failed to update data")
				}

				return res.data!;

			} catch (e) {
				if (e instanceof Error) {
					throw e.message;
				}
				throw "An error occurred during updating the field.";

			}
		},
		onMutate: async (variables,) => {
			setErrors({})

			await queryClient.cancelQueries({ queryKey: ["page", props.currentSection().value] })

			//save the previous data
			const previousData = queryClient.getQueryData([
				"page",
				props.currentSection().value,
			])

			//update cache optimistically
			queryClient.setQueryData(["page", props.currentSection().value],
				(old: any) => {
					if (!old) return old
					const updated = { ...old }
					Object.entries(variables.data).forEach(([path, value]) => {
						updateFormField(updated, path, value)
					})
					return updated
				})

			return { previousData }

		},
		onError: (error, variables,) => {
			console.error("Error updating data:", error)

		},
		onSuccess: (data) => {
			console.log("Data updated successfully:", data)
		},
		onSettled: async (error) => {
			if (error?.error) {
				await queryClient.invalidateQueries({ queryKey: ["page", props.currentSection().value] })
			}
		}
	}))

	const handleSubmit = (e: Event) => {
		e.preventDefault()

		const result = parseSchema(props.schema, localFormData)

		if (!result.success) {
			setErrors(result.errors)
		}

		result.success && mutation.mutate({
			id: props.currentSection().key,
			page: props.currentSection().value,
			data: fieldChanged() ?? {}
		})
	}


	return (
		<div class="p-5">
			<form
				onSubmit={handleSubmit}
				class="general-form border-taupe flex flex-col space-y-10 rounded border p-10"
			>
				<RenderFields
					data={() => localFormData}
					errors={errors}
					path=""
					handleUpdateField={handleUpdateField}
				/>

				<div class="form-actions">
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

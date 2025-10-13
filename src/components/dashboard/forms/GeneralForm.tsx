import { useMutation} from "@tanstack/solid-query"

import { parseSchema } from "~/utils/parsedSchema"
import { createStore, reconcile, produce } from "solid-js/store"
import { createSignal } from "solid-js"
import type { PageTypeMap, PageTypeKeys } from "~/types"
import { setDeepValue } from "~/utils/setDeepVal"

import type { FieldErrors, GeneralFormProps } from "~/types"
import RenderFields from "./handlers/RenderFields"

import { updateSectionData } from "~/utils/queries"
import { set } from "zod"

export default function GeneralForm<T extends PageTypeKeys>({ ...props }: GeneralFormProps<T>) {
	const [formData, setFormData] = createStore<PageTypeMap[T]>(props.data)
	const [errors, setErrors] = createStore<FieldErrors>({})
	const [fieldChanged, setFieldChanged] = createSignal<Record<string, any> | null>(null);


	const handleUpdateField = (path: string, value: any) => {
		const newValue = value === "" ? null : value

		//set the field that changed
		setFieldChanged({ [path]: newValue });

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

	const mutation = useMutation(() => ({
		mutationFn: async (variables: { id: string; page: keyof PageTypeMap; data: Record<string, any> }) => {
			try{
				const res = await updateSectionData(
					variables.id,
					variables.page,
					variables.data
				)
				if (!res){
					throw new Error("Failed to update data")
				}
				console.log("Update successful:", res);

				return res.data!;

			}catch(e){
				if (e instanceof Error) {
		  throw e.message;
		}
		throw "An error occurred during updating the field.";

			}
		},
		onMutate: async (variables) => {
			setErrors({})
			setFormData(reconcile({ ...formData, ...variables.data }))
		},
		onError: (error) => {
			console.error("Error updating data:", error)
		},
		onSuccess: (data) => {
			console.log("Data updated successfully:", data)
		},
		onSettled: async (res, error, variables, result, ctx) => {
			await ctx.client.invalidateQueries({ queryKey: ["page", props.currentSection().value] })
		}
	}))

	const handleSubmit = (e: Event) => {
		e.preventDefault()

		const result = parseSchema(props.schema, formData)

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
					data={formData}
					errors={errors}
					setFormData={setFormData}
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

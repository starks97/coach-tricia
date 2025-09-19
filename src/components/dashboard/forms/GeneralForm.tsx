import { parseSchema, type FieldErrors } from "~/utils/parsedSchema"
import { createSignal, For, Show, createEffect } from "solid-js"
import { createStore } from "solid-js/store"
import type { PageTypeMap, PageTypeKeys } from "~/types"
import z from "zod"

interface GeneralFormProps<T extends PageTypeKeys> {
	data: PageTypeMap[T]
	schema: z.ZodObject<z.ZodRawShape, any>
}

export default function GeneralForm<T extends PageTypeKeys>({ ...props }: GeneralFormProps<T>) {
	const [formData, setFormData] = createStore<PageTypeMap[T]>(props.data)
	const [errors, setErrors] = createStore<FieldErrors>({})

	const setDeepValue = (obj: any, path: string, value: any): any => {
		const newObj = JSON.parse(JSON.stringify(obj))
		const keys = path
			.split(".")
			.flatMap((part) => {
				// Maneja arrays con formato: array[0].prop
				const arrayMatch = part.match(/(\w+)\[(\d+)\]/)
				if (arrayMatch) {
					return [arrayMatch[1], arrayMatch[2]]
				}
				return [part]
			})
			.filter((key) => key !== "")

		let current = newObj

		console.log("keys del objeto", keys)

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
			if (value === null || value === "") {
				// Elimina el elemento del array si el valor está vacío
				current.splice(index, 1)
			} else {
				current[index] = value
			}
		} else {
			current[lastKey] = value
		}

		return newObj
	}

	const updateField = (path: string, value: any) => {
		setFormData((prev) => setDeepValue(prev, path, value))
	}

	const handleSubmit = (e: Event) => {
		e.preventDefault()

		const result = parseSchema(props.schema, formData)
		console.log("Validation result:", result)

		if (!result.success) {
			console.log("Error paths:", Object.keys(result.errors))
			setErrors(result.errors)
		}
	}

	const renderFields = (data: any, path: string = "") => {
		return Object.entries(data).map(([key, value]) => {
			const currentPath = path ? `${path}.${key}` : key

			if (typeof value === "object" && value !== null && !Array.isArray(value)) {
				return (
					<div class="">
						<h3 class="font-prata text-taupe text-size-4">
							{key.replace(/_/g, " ").toUpperCase()}
						</h3>
						<div class="section-fields">{renderFields(value, currentPath)}</div>
						<Show when={errors[currentPath]}>
							<span class="text-red-500">{errors[currentPath]}</span>
						</Show>
					</div>
				)
			} else if (Array.isArray(value)) {
				return (
					<div class="form-section">
						<h3 class="section-title">{key.replace(/_/g, " ").toUpperCase()}</h3>
						<For each={value}>
							{(item, index) => (
								<div class="array-item">
									{typeof item === "object" ? (
										renderFields(item, `${currentPath}[${index()}]`)
									) : (
										<div class="field-group">
											<label
												class="font-tajawal text-size-4 mb-1 block font-medium"
												for={`${currentPath}[${index()}]`}
											>
												{key.replace(/_/g, " ")} #{index() + 1}
											</label>
											<input
												type="text"
												id={`${currentPath}[${index()}]`}
												name={`${currentPath}[${index()}]`}
												value={item}
												onChange={(e) =>
													updateField(`${currentPath}[${index()}]`, e.currentTarget.value)
												}
												class=""
											/>
											<Show when={errors[currentPath]}>
												<span class="text-red-500">{errors[currentPath]}</span>
											</Show>
										</div>
									)}
								</div>
							)}
						</For>
					</div>
				)
			} else {
				return (
					<div class="">
						<label
							class="font-tajawal text-size-3 text-center font-bold text-black"
							for={currentPath}
						>
							{key.replace(/_/g, " ")}
						</label>
						<input
							type={typeof value === "number" ? "number" : "text"}
							value={typeof value === "string" ? value : ""}
							id={currentPath}
							name={currentPath}
							onChange={(e) => updateField(currentPath, e.currentTarget.value)}
							class="w-full rounded border border-gray-300 px-3 py-2"
						/>
						<Show when={errors[currentPath]}>
							<span class="text-red-500">{errors[currentPath]}</span>
						</Show>
					</div>
				)
			}
		})
	}

	return (
		<div class="p-5">
			<form
				onSubmit={handleSubmit}
				class="general-form border-taupe flex flex-col space-y-10 rounded border p-10"
			>
				{renderFields(formData)}

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

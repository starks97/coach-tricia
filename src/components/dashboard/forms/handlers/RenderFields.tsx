import { Show, For } from "solid-js"
import type { SetStoreFunction } from "solid-js/store"

import type { FieldErrors, PageTypeKeys, PageTypeMap } from "~/types"

interface RenderFieldsProps<T extends PageTypeKeys> {
	data: any
	path: string
	errors: FieldErrors
	setFormData: SetStoreFunction<PageTypeMap[T]>
	handleUpdateField: (path: string, value: any) => void
}

// Utilidad para formatear labels
const formatLabel = (key: string): string => {
	return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
}

// Componente para mostrar errores
const ErrorMessage = ({ error }: { error: string }) => (
	<Show when={error}>
		<span class="mt-1 block text-sm text-red-500">{error}</span>
	</Show>
)

// Componente base para inputs
const BaseInput = ({
	path,
	value,
	label,
	onChange,
	error,
}: {
	path: string
	value: any
	label: string
	onChange: (path: string, value: any) => void
	error: string
}) => (
	<div class="field-group mb-4">
		<label class="font-tajawal text-size-3 mb-2 block font-medium text-black" for={path}>
			{label}
		</label>
		<input
			type={typeof value === "number" ? "number" : "text"}
			id={path}
			name={path}
			value={value ?? ""}
			onChange={(e) => onChange(path, e.currentTarget.value)}
			class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
		/>
		<ErrorMessage error={error} />
	</div>
)

export default function RenderFields<T extends PageTypeKeys>({
	data,
	path,
	errors,
	setFormData,
	handleUpdateField,
}: RenderFieldsProps<T>) {
	// Verificación segura de la función updateField

	if (!data || typeof data !== "object") {
		return null
	}

	return (
		<>
			{Object.entries(data).map(([key, value]) => {
				const currentPath = path ? `${path}.${key}` : key
				const error = errors[currentPath]
				const label = formatLabel(key)

				// Caso: objeto anidado
				if (typeof value === "object" && value !== null && !Array.isArray(value)) {
					return (
						<div class="nested-section mb-6 rounded-lg bg-gray-50 p-4">
							<h3 class="font-prata text-taupe text-size-4 mb-3 font-semibold">
								{label.toUpperCase()}
							</h3>
							<div class="section-fields space-y-4">
								<RenderFields
									data={value}
									path={currentPath}
									errors={errors}
									setFormData={setFormData}
									handleUpdateField={handleUpdateField}
								/>
							</div>
						</div>
					)
				}

				// Caso: array
				if (Array.isArray(value)) {
					return (
						<div class="array-section mb-6">
							<h3 class="section-title font-prata text-taupe text-size-4 mb-3 font-semibold">
								{label.toUpperCase()}
							</h3>
							<For each={value}>
								{(item, index) => {
									const arrayPath = `${currentPath}.${index()}`
									const itemError = errors[arrayPath] ? errors[arrayPath] : ""
									const itemLabel = `${label} #${index() + 1}`

									return (
										<div class="array-item mb-4 rounded border border-gray-200 p-3">
											{typeof item === "object" && item !== null ? (
												<RenderFields
													data={item}
													path={arrayPath}
													errors={errors}
													setFormData={setFormData}
													handleUpdateField={handleUpdateField}
												/>
											) : (
												<BaseInput
													path={arrayPath}
													value={item}
													label={itemLabel}
													onChange={handleUpdateField}
													error={itemError}
												/>
											)}
										</div>
									)
								}}
							</For>
						</div>
					)
				}

				// Caso: valor primitivo
				return (
					<BaseInput
						path={currentPath}
						value={value}
						label={label}
						onChange={handleUpdateField}
						error={error}
					/>
				)
			})}
		</>
	)
}

import type { FormProps } from "@types"

export default function DynamicForm<T>({
	formSchema,
	actionData,
	method,
	action,
	submitLabel,
	className,
}: FormProps<T>) {
	return (
		<form method={method} action={action} class={`space-y-4 ${className || ""}`}>
			{actionData.errors?.general && (
				<div class="mb-4 text-sm text-red-500">{actionData.errors.general}</div>
			)}

			{formSchema.map((field) => {
				const fieldError = actionData.errors?.[field.name as keyof T]

				return (
					<div class="mb-4 flex flex-col">
						<label class="block text-sm font-medium text-orange-700" aria-label={field.name}>
							{field.label}
						</label>

						{field.type === "select" ? (
							<select
								name={field.name}
								id={field.name}
								required={field.required}
								class={`mt-1 block w-full rounded-xl ${
									fieldError ? "border-red-500" : "border-gray-300"
								} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
								aria-invalid={!!fieldError}
								aria-describedby={fieldError ? `${field.name}-error` : undefined}
							>
								<option value={field.placeholder} disabled>
									{field.placeholder || "Select an option"}
								</option>
								{field.options?.map((option) => (
									<option value={option.value}>{option.label}</option>
								))}
							</select>
						) : (
							<input
								type={field.type}
								name={field.name}
								id={field.name}
								required={field.required}
								placeholder={field.placeholder}
								autocomplete={field.name}
								class={`mt-1 block w-full rounded-md border px-4 py-2 ${
									fieldError ? "border-red-500" : "border-gray-300"
								} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
								aria-invalid={!!fieldError}
								aria-describedby={fieldError ? `${field.name}-error` : undefined}
							/>
						)}
						{fieldError && (
							<p id={`${field.name}-error`} class="mt-1 text-sm text-red-500">
								{fieldError}
							</p>
						)}
					</div>
				)
			})}
			<button type="submit" class="auth_form_btn__a">
				{submitLabel}
			</button>
		</form>
	)
}

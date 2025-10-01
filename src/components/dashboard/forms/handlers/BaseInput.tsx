import { Show } from "solid-js"

const ErrorMessage = ({ error }: { error: string }) => (
	<Show when={error}>
		<span class="mt-1 block text-sm text-red-500">{error}</span>
	</Show>
)

export const BaseInput = ({
	path,
	value,
	label,
	onChange,
	error,
}: {
	path: string
	value: any
	label?: string
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

import { type JSX, splitProps, createMemo } from "solid-js"
import { InputLabel } from "./InputLabel"

type TextInputProps = {
	ref: (element: HTMLInputElement) => void
	type: "text" | "email" | "tel" | "password" | "url" | "number" | "date"
	name: string
	value: string | number | undefined
	onInput: JSX.EventHandler<HTMLInputElement, InputEvent>
	onChange: JSX.EventHandler<HTMLInputElement, Event>
	onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>
	placeholder?: string
	required?: boolean
	class?: string
	label?: string
	error?: string
	padding?: "none"
}

export function TextInput(props: TextInputProps) {
	const [, inputProps] = splitProps(props, ["class", "value", "label", "error", "padding"])

	const getValue = createMemo<string | number | undefined>(
		(prevValue) =>
			props.value === undefined ? "" : !Number.isNaN(props.value) ? props.value : prevValue,
		""
	)

	return (
		<div>
			<InputLabel name={props.name} label={props.label} required={props.required} />
			<input
				{...inputProps}
				id={props.name}
				value={getValue()}
				aria-invalid={!!props.error}
				aria-errormessage={`${props.name}-error`}
				class="w-full rounded border border-gray-300 px-3 py-2"
			/>
			{props.error && <div id={`${props.name}-error`}>{props.error}</div>}
		</div>
	)
}

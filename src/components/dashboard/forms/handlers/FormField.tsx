import { Field } from "@modular-forms/solid"
import type { FormStore } from "@modular-forms/solid"

import { TextInput } from "./TextInput"

interface FormFieldProps {
	of: FormStore<any, any>
	name: string
	label: string
	type?: "text" | "email" | "tel" | "password" | "url" | "number" | "date"
	required?: boolean
}

export default function FormField(formProps: FormFieldProps) {
	return (
		<Field name={formProps.name} of={formProps.of}>
			{(field, props) => (
				<TextInput
					{...props}
					type={formProps.type || "text"}
					required={formProps.required}
					value={field.value}
					error={field.error || ""}
					label={formProps.label}
				/>
			)}
		</Field>
	)
}

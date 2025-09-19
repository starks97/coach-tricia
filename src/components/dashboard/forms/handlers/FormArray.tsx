import type { FormStore, FieldArrayStore } from "@modular-forms/solid"
import { FieldArray } from "@modular-forms/solid"
import { For } from "solid-js"
import FormField from "./FormField"

interface FormFieldArrayProps {
	of: FormStore<any, any>
	name: string
	label: string
	title?: string
	itemTitle?: string
	arrayType: "strings" | "objects"
}

export default function FormFieldArray(props: FormFieldArrayProps) {
	return (
		<div>
			<h4>{props.title ?? ""}</h4>
			<div class="w-full rounded border border-gray-300 px-3 py-2">
				<FieldArray of={props.of} name={props.name}>
					{(fieldArray) => (
						<For each={fieldArray.items}>
							{(_, index) => (
								<>
									{props.arrayType === "objects" ? (
										<h3>{`${props.itemTitle ?? ""} ${index() + 1}`}</h3>
									) : (
										<></>
									)}
									<FormField
										of={props.of}
										name={`${fieldArray.name}.${index()}`}
										label={`${props.label} ${index() + 1}`}
									/>
								</>
							)}
						</For>
					)}
				</FieldArray>
			</div>
		</div>
	)
}

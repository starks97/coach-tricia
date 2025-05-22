import { createSignal, For, Show } from "solid-js"
import type { ZodSchema } from "zod"
import type { PageTypeMap } from "~/types"

type FormFieldProps<T> = {
	data: any
	schema: ZodSchema<T> // Añade _id al schema
}

export default function EditableForm<T>({ data, schema }: FormFieldProps<T>) {
	const parsedData = schema.parse(data) // Añade _id temporal

	// Ahora puedes acceder a las propiedades correctamente
	console.log(parsedData) // ¡Type-safe!

	return <div>this is the form</div>
}

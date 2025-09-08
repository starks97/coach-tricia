import { createForm, type PartialValues, zodForm } from "@modular-forms/solid"
import { type PageTypeMap, type PageTypeKeys } from "~/types"
import { z, type ZodType } from "zod"
import { schemaRouter } from "~/lib/schemaRouter"

function toPartialValues<T extends Object>(data: T): PartialValues<T> {
	return { ...data } as PartialValues<T>
}

function zodValidator<T>(schema: ZodType<T>): (values: T) => Partial<Record<keyof T, string>> {
	return (values: T) => {
		try {
			schema.parse(values)
			return {} // Sin errores
		} catch (error) {
			if (error instanceof z.ZodError) {
				// Convertir errores de Zod al formato que espera solid-form
				const errors: Partial<Record<keyof T, string>> = {}

				error.errors.forEach((err) => {
					const path = err.path.join(".") as keyof T
					errors[path] = err.message
				})

				return errors
			}
			return {
				__form__: "Error de validación desconocido",
			} as Partial<Record<keyof T, string>>
		}
	}
}

export class FormFactory {
	static createFormComponents<T extends keyof PageTypeMap>(
		type: T,
		data: PageTypeMap[T],
		schema?: (typeof schemaRouter)[T]["schema"]
	) {
		const [formStore, { Form, Field }] = createForm<PageTypeMap[T]>({
			initialValues: toPartialValues(data),
			zodForm: schema,
		})
		return {
			Form,
			Field,
			store: formStore,
			type: type as T,
		}
	}
}

export const formDictionary = {
	home: (data: PageTypeMap["home"], schema: (typeof schemaRouter)["home"]) =>
		FormFactory.createFormComponents("home", data, schema.schema),
	coaching: (data: PageTypeMap["coaching"]) => FormFactory.createFormComponents("coaching", data),
	about: (data: PageTypeMap["about"]) => FormFactory.createFormComponents("about", data),
	contact: (data: PageTypeMap["contact"]) => FormFactory.createFormComponents("contact", data),
	seo: (data: PageTypeMap["seo"]) => FormFactory.createFormComponents("seo", data),
}

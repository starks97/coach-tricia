import type { Accessor } from "solid-js"

import z from "zod"

import type { PageTypeMap, PageTypeKeys } from "@lib/db/types"

export interface FieldErrors {
	[key: string]: string
}

export type SchemaType = z.ZodObject<z.ZodRawShape, any>

export interface GeneralFormProps<T extends PageTypeKeys> {
	data: Accessor<PageTypeMap[T]>
	schema: SchemaType
	currentSection: Accessor<{
		key: string
		value: PageTypeKeys
	}>
}

export interface RenderFieldsProps<T extends PageTypeKeys> {
	data: PageTypeMap[T]
	path: string
	errors: FieldErrors
	handleUpdateField: (path: string, value: any) => void
}

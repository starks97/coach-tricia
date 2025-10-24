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
	onBlurField: (path: string, value: any) => void
}

export interface BaseInputProps {
	path: string
	value: any
	onBlur: (path: string, value: any) => void
	label?: string
	error: string
	isArray?: boolean
}

export interface ArrayInputProps {
	value: any[]
	errors: FieldErrors
	currentPath: string
	label: string
}

export type HistoryType<T extends PageTypeKeys> = {
	past: Array<{
		changes: Record<string, any>
		timestamp: number
		previusData: PageTypeMap[T]
	}>
	future: Array<{
		changes: Record<string, any>
		timestamp: number
		previusData: PageTypeMap[T]
	}>
}

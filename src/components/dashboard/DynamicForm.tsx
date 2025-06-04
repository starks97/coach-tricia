import { createForm, zodForm } from "@modular-forms/solid"
import type { PageTypeMap, PageTypeKeys } from "@types"
import { HomePageSchema, type HomePageZodSchemaType } from "@lib/models/home.ts"
import { ZodSchema } from "zod"

import { type ZodTypeAny, z } from "zod"

interface Props {
	schema: ZodSchema
}

export default function DynamicForm({ schema }: Props) {
	const [form, { Form, Field, FieldArray }] = createForm<HomePageZodSchemaType>()
}

import type { ZodObject, ZodRawShape } from "zod"

// types/update.types.ts
export interface UpdateResult {
	success: boolean
	data?: unknown | null
	error?: string
}

export interface UpdateParams {
	id: string
	collectionName: string
	update: Record<string, any>
	schema?: ZodObject<ZodRawShape, any>
}

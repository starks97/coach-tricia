import type { ZodObject, ZodRawShape } from "zod"

// types/update.types.ts
export interface UpdateResult {
  success: boolean
  data?: {
    _id: string
    updatedFields: Record<string, any>
  }
  error?: string
}

export interface UpdateParams{
  id: string
  collectionName: string
  update: Record<string, any>
  schema?: ZodObject<ZodRawShape, any>
}



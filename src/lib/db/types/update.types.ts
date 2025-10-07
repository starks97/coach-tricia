import type { ZodObject, ZodRawShape } from "zod"

// types/update.types.ts
export interface UpdateResult<T = any> {
  success: boolean
  data?: {
    _id: string
    updatedFields: Partial<T>
    modifiedCount: number
  }
  error?: string
}

export interface UpdateParams<T = any> {
  id: string
  collectionName: string
  update: Partial<T>
  schema?: ZodObject<ZodRawShape, any>
}


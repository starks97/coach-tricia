import { type OptionalUnlessRequiredId, ObjectId, type Filter } from "mongodb"
import type { ZodObject, ZodRawShape } from "zod"

import MongoService from "../mongoService.ts"

export default async function updateSection<T extends { _id: string | ObjectId }>(
	sectionId: string,
	collectionName: string,
	update: Partial<T>,
	schema?: ZodObject<ZodRawShape, any, any, OptionalUnlessRequiredId<T>, any>
): Promise<boolean> {
	try {
		const mongoService = await MongoService.init<T>(collectionName, schema)

		const queryId = sectionId.match(/^[0-9a-fA-F]{24}$/) ? new ObjectId(sectionId) : sectionId

		const updateResult = await mongoService.updateOne({ _id: queryId } as Filter<T>, update)
		return updateResult.modifiedCount > 0
	} catch (error) {
		console.error(`Error updating section ${sectionId}:`, error)
		return false
	}
}

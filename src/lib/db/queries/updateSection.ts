import { ObjectId, type Filter } from "mongodb"

import MongoService from "../mongoService"
import type { UpdateParams, UpdateResult } from "../types"

export async function updateSection<T extends { _id: string | ObjectId }>(
	params: UpdateParams
): Promise<UpdateResult> {
	const { id, update, collectionName, schema } = params
	try {
		const mongoService = await MongoService.init<T>(collectionName, schema)

		const queryId = id.match(/^[0-9a-fA-F]{24}$/) ? new ObjectId(id) : id

		const setObj: Record<string, any> = {}

		for (const [pathKey, value] of Object.entries(update)) {
			if (value !== undefined) {
				const fullPath = pathKey.startsWith("sections.") ? pathKey : `sections.${pathKey}`
				setObj[fullPath] = value
			}
		}

		const result = await mongoService.findOneAndUpdate(
			{ _id: queryId } as Filter<T>,
			setObj as any,
			{ returnDocument: "after" }
		)

		if (!result) {
			return {
				success: false,
				error: "No documents were updated. Please check the provided ID and update data.",
			}
		}

		return {
			success: true,
			data: result,
		}
	} catch (error) {
		console.error(`Error updating section ${id}:`, error)
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		}
	}
}

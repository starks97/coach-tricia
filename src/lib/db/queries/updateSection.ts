import {  ObjectId,type Filter} from "mongodb"

import MongoService from "../mongoService"
import type { UpdateParams, UpdateResult } from "../types/update.types"

export async function updateSection<T extends { _id: string | ObjectId }>(
	params: UpdateParams<T>
): Promise<UpdateResult<T>>{
	const { id, update, collectionName, schema } = params
	try {
		const mongoService = await MongoService.init<T>(collectionName, schema)

		const queryId = id.match(/^[0-9a-fA-F]{24}$/) ? new ObjectId(id) : id
		const updateResult = await mongoService.updateOne({ _id: queryId } as Filter<T>, update)
		return {
      success: true,
      data: {
        _id: id,
        updatedFields: update,
        modifiedCount: updateResult.modifiedCount
      }
    }

	} catch (error) {
		console.error(`Error updating section ${id}:`, error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
	}
}

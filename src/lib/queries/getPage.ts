import { type OptionalUnlessRequiredId, ObjectId, type Filter } from "mongodb"
import type { ZodObject, ZodRawShape } from "zod"

import MongoService from "../mongoService.ts"

export default async function getPage<T extends { _id: string | ObjectId }>(
	id: string,
	collectionName: string,
	schema?: ZodObject<ZodRawShape, any, any, OptionalUnlessRequiredId<T>, any>
): Promise<Omit<T, "_id">> {
	const mongoService = await MongoService.init<T>(collectionName, schema)

	const queryId = id.match(/^[0-9a-fA-F]{24}$/) ? new ObjectId(id) : id

	const page = await mongoService.findOne({ _id: queryId } as Filter<T>)

	if (!page) {
		throw new Error("Page not found")
	}

	const { _id, ...pageWithoutId } = page

	return pageWithoutId as Omit<T, "_id">
}

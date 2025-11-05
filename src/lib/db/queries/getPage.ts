import { ObjectId, type Filter } from "mongodb"
import type { ZodObject, ZodRawShape } from "zod"

import MongoService from "../mongoService"

export default async function getPage<
	T extends { _id: string | ObjectId; page_name: string; sections: any },
>(
	id: string,
	collectionName: string,
	schema?: ZodObject<ZodRawShape, any>
): Promise<T["sections"]> {
	const mongoService = await MongoService.init<T>(collectionName, schema)

	const queryId = id.match(/^[0-9a-fA-F]{24}$/) ? new ObjectId(id) : id

	const page = await mongoService.findOne({ _id: queryId } as Filter<T>)

	if (!page) {
		throw new Error("Page not found")
	}

	return page.sections as T["sections"]
}

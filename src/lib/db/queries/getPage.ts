<<<<<<< HEAD
import { type OptionalUnlessRequiredId, ObjectId, type Filter } from "mongodb"
import type { ZodObject, ZodRawShape } from "zod"

import MongoService from "../mongoService.ts"

export default async function getPage<T extends { _id: string | ObjectId }>(
	id: string,
	collectionName: string,
	schema?: ZodObject<ZodRawShape, any, any, OptionalUnlessRequiredId<T>, any>
): Promise<Omit<T, "_id">> {
=======
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
>>>>>>> 5994448 (custom form from scratch)
	const mongoService = await MongoService.init<T>(collectionName, schema)

	const queryId = id.match(/^[0-9a-fA-F]{24}$/) ? new ObjectId(id) : id

	const page = await mongoService.findOne({ _id: queryId } as Filter<T>)

	if (!page) {
		throw new Error("Page not found")
	}

<<<<<<< HEAD
	const { _id, ...pageWithoutId } = page

	return pageWithoutId as Omit<T, "_id">
=======
	return page.sections as T["sections"]
>>>>>>> 5994448 (custom form from scratch)
}

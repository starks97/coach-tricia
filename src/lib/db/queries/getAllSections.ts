import { type OptionalUnlessRequiredId, type Filter, type FindOptions } from "mongodb"
import type { ZodObject, ZodRawShape } from "zod"

import MongoService from "../mongoService.ts"

export async function getAllSections<T extends { _id: string }>(
	collectionName: string,
	schema?: ZodObject<ZodRawShape, any, any, OptionalUnlessRequiredId<T>, any>,
	options: { query?: Filter<T>; findOptions?: FindOptions<T> } = {}
) {
	const mongoService = await MongoService.init<T>(collectionName, schema)

	const { query = {}, findOptions = {} } = options

	const result = await mongoService.findMany(options)

	return result
}

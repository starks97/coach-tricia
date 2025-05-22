import { type OptionalUnlessRequiredId, ObjectId, type Filter } from "mongodb"
import type { ZodObject, ZodRawShape } from "zod"
import type { SectionSchemaType } from "../models/sections.ts"
import type { SectionKey } from "../../types.ts"

import MongoService from "../mongoService.ts"

export default async function getSection<T extends SectionKey>(
	id: string,
	collectionName: string,
	schema?: ZodObject<ZodRawShape, any, any, OptionalUnlessRequiredId<SectionSchemaType>, any>,
	section?: SectionKey
): Promise<SectionSchemaType[T]> {
	const mongoService = await MongoService.init<SectionSchemaType>(collectionName, schema)

	const queryId = id.match(/^[0-9a-fA-F]{24}$/) ? new ObjectId(id) : id

	const page = await mongoService.findOne({
		_id: queryId,
	} as Filter<SectionSchemaType>)

	if (!page) {
		throw new Error("Page not found")
	}

	if (!section || !page[section]) {
		throw new Error(`Section "${section}" not found`)
	}
	return page[section] as SectionSchemaType[T]
}

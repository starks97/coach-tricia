import { ObjectId, type Filter } from "mongodb"

import { type SeoDocument } from "../models/seo.ts"

import MongoService from "../mongoService.ts"

export default async function getSEO<K extends keyof SeoDocument["sections"]>(
	id: string,
	collectionName: string,
	seoSectionKey: K
): Promise<SeoDocument["sections"][K] | null> {
	try {
		const mongoService = await MongoService.init<SeoDocument>(collectionName)

		const queryId = /^[0-9a-fA-F]{24}$/.test(id) ? new ObjectId(id) : id

		const seoData = await mongoService.findOne({ _id: queryId } as Filter<SeoDocument>)

		if (!seoData) {
			throw new Error(`No document found in "${collectionName}" with id "${id}"`)
		}

		const section = seoData.sections?.[seoSectionKey]

		if (!section) {
			throw new Error(`Section "${seoSectionKey}" not found in SEO document`)
		}

		return section
	} catch (error) {
		console.error(`Error in getSEOSection("${collectionName}", "${seoSectionKey}")`, error)
		throw error
	}
}

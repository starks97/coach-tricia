import { Collection, type Document, type OptionalUnlessRequiredId, type Filter } from "mongodb"

import type { ZodObject, ZodRawShape } from "zod"

import MongoDB from "./database.ts"

export default class MongoService<T extends Document> {
	private collection!: Collection<T>
	schema: ZodObject<ZodRawShape, any, any, OptionalUnlessRequiredId<T>, any>

	constructor(schema?: ZodObject<ZodRawShape, any, any, OptionalUnlessRequiredId<T>, any>) {
		this.schema = schema!
	}

	static async init<T extends Document>(
		collectionName: string,
		schema?: ZodObject<ZodRawShape, any, any, OptionalUnlessRequiredId<T>, any>
	): Promise<MongoService<T>> {
		const service = new MongoService<T>(schema)
		const client = MongoDB.getInstance()
		service.collection = (await client.connect()).collection<T>(collectionName)
		return service
	}

	async insertOne(doc: OptionalUnlessRequiredId<T>) {
		if (this.schema) {
			doc = this.schema.parse(doc)
		}
		return this.collection.insertOne(doc)
	}

	async insertMany(docs: OptionalUnlessRequiredId<T>[]) {
		if (this.schema) {
			docs = docs.map((doc) => this.schema!.parse(doc))
		}
		return this.collection.insertMany(docs)
	}

	async findOne(query: Filter<T> = {}) {
		return this.collection.findOne(query)
	}

	async findMany(
		query: Filter<T> = {},
		options: { sort?: any; limit?: number; skip?: number; projection?: any } = {}
	) {
		return this.collection.find(query, options).toArray()
	}

	async updateOne(query: Filter<T>, update: Partial<T>) {
		if (this.schema) {
			update = this.schema.partial().parse(update) as Partial<T>
		}

		return this.collection.updateOne(query, { $set: update })
	}

	async deleteOne(query: Filter<T>) {
		return this.collection.deleteOne(query)
	}

	async deleteMany(query: Filter<T>) {
		return this.collection.deleteMany(query)
	}

	//getters

	async count(query: Filter<T> = {}) {
		return this.collection.countDocuments(query)
	}

	async exists(query: Filter<T> = {}) {
		const count = await this.count(query)
		return count > 0
	}
}

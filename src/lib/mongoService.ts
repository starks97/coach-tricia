import { Collection, type Document, type WithId, type OptionalUnlessRequiredId } from "mongodb"
import MongoDB from "./database"

export class MongoService<T extends Document> {
	private collection!: Collection<T>
	options: Map<string, any> = new Map<string, any>()

	constructor(options?: Map<string, any>) {
		if (options) {
			this.options = options
		}
	}

	static async init<T extends Document>(collectionName: string): Promise<MongoService<T>> {
		const service = new MongoService<T>()
		const client = MongoDB.getInstance()
		service.collection = (await client.connect()).collection<T>(collectionName)
		return service
	}

	async insertOne(doc: OptionalUnlessRequiredId<T>) {
		return this.collection.insertOne(doc)
	}

	/*async findMany(query: Document = {}) {
		return this.collection.find(query).toArray()
	}*/
}

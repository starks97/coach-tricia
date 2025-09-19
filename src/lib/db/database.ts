import { MongoClient, Db } from "mongodb"

import {
	MONGO_DB_URI as DEFAULT_URI,
	MONGO_NAME_OF_DATABASE as DEFAULT_DATABASE,
} from "astro:env/server"

export default class MongoDB {
	private static instance: MongoDB
	private client: MongoClient
	private db: Db | null = null

	constructor(private uri: string = DEFAULT_URI) {
		if (!this.uri) throw new Error("MONGO_DB_URI is not defined")
		this.client = new MongoClient(uri)
	}

	static getInstance(uri?: string): MongoDB {
		if (!uri || uri.trim() === "") {
			uri = DEFAULT_URI
		}

		if (!MongoDB.instance) {
			MongoDB.instance = new MongoDB(uri)
		}
		return MongoDB.instance
	}

	async connect(): Promise<Db> {
		if (!this.db) {
			await this.client.connect()
			this.db = this.client.db(DEFAULT_DATABASE)
		}
		return this.db!
	}

	async disconnect(): Promise<void> {
		await this.client.close()
		this.db = null
	}
}

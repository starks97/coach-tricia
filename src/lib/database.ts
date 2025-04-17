import { MongoClient, Db } from "mongodb"

import { MONGO_DB_URI } from "astro:env/server"

if (!MONGO_DB_URI) {
	throw new Error("MONGO_DB_URI is not defined")
}

export default class MongoDB {
	private static instance: MongoDB
	private client: MongoClient
	private db: Db | null = null

	constructor() {
		this.client = new MongoClient(MONGO_DB_URI)
	}

	static getInstance(): MongoDB {
		if (!MongoDB.instance) {
			MongoDB.instance = new MongoDB()
		}
		return MongoDB.instance
	}

	async connect(): Promise<Db> {
		if (!this.client.connect()) {
			await this.client.connect()
			this.db = this.client.db("CoachTricia")
		}
		return this.db
	}

	async disconnect(): Promise<void> {
		await this.client.close()
		this.db = null
	}
}

import { describe, test, expect, beforeAll, afterAll } from "vitest"
import { MongoMemoryServer } from "mongodb-memory-server"

import MongoDB from "../src/lib/database.ts"
import MongoService from "../src/lib/mongoService.ts"
import { seoDocumentSchema, type SeoDocument } from "~/lib/models/seo.ts"

let mongoServer: MongoMemoryServer
let uri: string
let service: MongoService<SeoDocument>

describe("check MongoService", () => {
	beforeAll(async () => {
		mongoServer = await MongoMemoryServer.create()
		uri = mongoServer.getUri()
		MongoDB.getInstance(uri)
		service = await MongoService.init<SeoDocument>("seo", seoDocumentSchema)
	})

	afterAll(async () => {
		if (mongoServer) await mongoServer.stop()
	})
})

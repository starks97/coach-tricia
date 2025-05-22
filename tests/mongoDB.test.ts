import { describe, test, expect, beforeAll, afterAll } from "vitest"
import { MongoMemoryServer } from "mongodb-memory-server"

import MongoDB from "../src/lib/database.ts"

let mongoServer: MongoMemoryServer
let uri: string

describe("check MongoDB works perfectly", () => {
	beforeAll(async () => {
		mongoServer = await MongoMemoryServer.create()
		uri = mongoServer.getUri()
	})

	afterAll(async () => {
		if (mongoServer) await mongoServer.stop()
	})

	test("should return the same instance on multiple getInstance() calls", async () => {
		const mongo = MongoDB.getInstance(uri)
		const mongo2 = MongoDB.getInstance(uri)

		expect(mongo).toBe(mongo2)
	})

	test("should create new instance if MongoDB.instance is reset manually", () => {
		const mongo1 = MongoDB.getInstance(uri)

		// reset manual
		// @ts-ignore
		MongoDB["instance"] = undefined

		const mongo2 = MongoDB.getInstance(uri)

		expect(mongo1).not.toBe(mongo2)
	})

	test("should throw error if uri is not provided", () => {
		expect(() => MongoDB.getInstance("")).toThrowError("MONGO_DB_URI is not defined")
	})

	test("should connect and return a valid DB instance", async () => {
		const mongo = MongoDB.getInstance(uri)
		const db = await mongo.connect()

		expect(db).toBeDefined()
		expect(db.databaseName).toBeTruthy()
	})

	test("should not reconnect if already connected", async () => {
		const mongo = MongoDB.getInstance(uri)
		const db1 = await mongo.connect()
		const db2 = await mongo.connect()

		expect(db1).toBe(db2)
	})

	test("should disconnect and reset internal db", async () => {
		const mongo = MongoDB.getInstance(uri)

		await mongo.connect()
		await mongo.disconnect()

		// @ts-ignore
		expect(mongo["db"]).toBe(null)
	})

	test("should reconnect after disconnect", async () => {
		const mongo = MongoDB.getInstance(uri)

		const db1 = await mongo.connect()
		await mongo.disconnect()
		const db2 = await mongo.connect()

		expect(db2).toBeDefined()
		expect(db1).not.toBe(db2)
	})

	test("should handle multiple connect() calls simultaneously", async () => {
		const mongo = MongoDB.getInstance(uri)

		const [db1, db2, db3] = await Promise.all([mongo.connect(), mongo.connect(), mongo.connect()])

		expect(db1).toBe(db2)
		expect(db2).toBe(db3)
	})

	test("should recover if internal db state is lost", async () => {
		const mongo = MongoDB.getInstance(uri)
		await mongo.connect()

		// @ts-ignore
		mongo["db"] = null

		const db = await mongo.connect()
		expect(db).toBeDefined()
	})
})

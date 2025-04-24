import { MongoClient, ObjectId } from 'mongodb';
import { M as MONGO_DB_URI } from './server_B9RNWQyC.mjs';
import { z } from 'zod';

if (!MONGO_DB_URI) {
  throw new Error("MONGO_DB_URI is not defined");
}
class MongoDB {
  static instance;
  client;
  db = null;
  constructor() {
    this.client = new MongoClient(MONGO_DB_URI);
  }
  static getInstance() {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
    }
    return MongoDB.instance;
  }
  async connect() {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db("pages");
    }
    return this.db;
  }
  async disconnect() {
    await this.client.close();
    this.db = null;
  }
}

class MongoService {
  collection;
  schema;
  constructor(schema) {
    this.schema = schema;
  }
  static async init(collectionName, schema) {
    const service = new MongoService(schema);
    const client = MongoDB.getInstance();
    service.collection = (await client.connect()).collection(collectionName);
    return service;
  }
  async insertOne(doc) {
    if (this.schema) {
      doc = this.schema.parse(doc);
    }
    return this.collection.insertOne(doc);
  }
  async insertMany(docs) {
    if (this.schema) {
      docs = docs.map((doc) => this.schema.parse(doc));
    }
    return this.collection.insertMany(docs);
  }
  async findOne(query = {}) {
    return this.collection.findOne(query);
  }
  async findMany(query = {}, options = {}) {
    return this.collection.find(query, options).toArray();
  }
  async updateOne(query, update) {
    if (this.schema) {
      update = this.schema.partial().parse(update);
    }
    return this.collection.updateOne(query, { $set: update });
  }
  async deleteOne(query) {
    return this.collection.deleteOne(query);
  }
  async deleteMany(query) {
    return this.collection.deleteMany(query);
  }
  //getters
  async count(query = {}) {
    return this.collection.countDocuments(query);
  }
  async exists(query = {}) {
    const count = await this.count(query);
    return count > 0;
  }
}

async function getPage(id, collectionName, schema) {
  const mongoService = await MongoService.init(collectionName, schema);
  const queryId = id.match(/^[0-9a-fA-F]{24}$/) ? new ObjectId(id) : id;
  const page = await mongoService.findOne({ _id: queryId });
  if (!page) {
    throw new Error("Page not found");
  }
  const { _id, ...pageWithoutId } = page;
  return pageWithoutId;
}

const reviewSchema = z.object({
  title: z.string().min(1, "The title cannot be empty"),
  quote: z.string().min(1, "The quote cannot be empty"),
  author: z.string().min(1, "The author cannot be empty")
});
const heroSchema = z.object({
  title: z.string().min(1, "The title cannot be empty"),
  subtitle: z.string().min(1, "The subtitle cannot be empty"),
  description: z.string().min(1, "The description cannot be empty"),
  image: z.string().url("The image must be a valid URL")
});
const userPainPointsSchema = z.object({
  title: z.string().min(1, "The title cannot be empty"),
  subtitle: z.string().min(1, "The subtitle cannot be empty"),
  pain_points: z.array(z.string().min(1, "Each pain point must be a non-empty string")),
  reviews: z.array(reviewSchema).min(1, "There must be at least one review")
});
const benefitsSchema = z.object({
  title: z.string().min(1, "The title cannot be empty"),
  benefits: z.array(z.string().min(1, "Each benefit must be a non-empty string"))
});
const coachingInfoSchema = z.object({
  title: z.string().min(1, "The title cannot be empty"),
  subtitle: z.string().min(1, "The subtitle cannot be empty"),
  description: z.string().min(1, "The description cannot be empty"),
  image: z.string().url("The image must be a valid URL")
});
const podcastSchema = z.object({
  title: z.string().min(1, "The title cannot be empty"),
  description: z.string().min(1, "The description cannot be empty"),
  image: z.string().url("The image must be a valid URL")
});
const HomePageSchema = z.object({
  _id: z.string().length(24, "The _id must have 24 characters (valid ObjectId)"),
  // ObjectId de MongoDB
  page_name: z.string().min(1, "The page name cannot be empty"),
  sections: z.object({
    hero: heroSchema,
    user_pain_points: userPainPointsSchema,
    benefits: benefitsSchema,
    coaching_info: coachingInfoSchema,
    podcast: podcastSchema
  })
});

export { HomePageSchema as H, getPage as g };

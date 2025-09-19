import { v2 as cloudinary, type ConfigOptions } from "cloudinary"

import {
	PUBLIC_CLOUDINARY_API_KEY,
	PUBLIC_CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_SECRET,
} from "astro:env/server"

export default class CloudinaryService {
	private client = cloudinary

	constructor() {
		if (!PUBLIC_CLOUDINARY_CLOUD_NAME || !PUBLIC_CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
			throw new Error("Cloudinary configuration is missing")
		}

		const config: ConfigOptions = {
			cloud_name: PUBLIC_CLOUDINARY_CLOUD_NAME,
			api_key: PUBLIC_CLOUDINARY_API_KEY,
			api_secret: CLOUDINARY_API_SECRET,
			secure: true,
		}

		this.client.config(config)
	}

	async uploadImage(filePath: string, options: any = {}) {
		return this.client.uploader.upload(filePath, options)
	}

	async preprocessImage(filePath: string, options: any = {}) {
		return this.client.uploader.explicit(filePath, { type: "upload", eager: options.eager })
	}
}

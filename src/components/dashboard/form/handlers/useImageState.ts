import { createSignal, createEffect } from "solid-js"
import { createStore, reconcile, produce } from "solid-js/store"

import { Cloudinary as cloudOptm } from "@cloudinary/url-gen"
import { scale } from "@cloudinary/url-gen/actions/resize"

import { extractPublicID } from "../helpers/extractID"

const imageCache: Map<string, string> = new Map()
const cldInstance = new cloudOptm({
	cloud: {
		cloudName: "dyrtdhsl0",
	},
})

export function useImageState() {
	const [isEditing, setIsEditing] = createSignal(false)
	const [localValue, setLocalValue] = createSignal<Record<string, string>>({})
	const [uploadProgress, setUploadProgress] = createSignal(0)
	const [dragActive, setDragActive] = createSignal(false)

	const optimizeImageDisplay = (src: string, width: number = 150, height: number = 150) => {
		const cacheKey = `${src}-${width}x${height}`
		if (imageCache.has(cacheKey)) {
			return imageCache.get(cacheKey)!
		}
		const optimizedUrl = cldInstance
			.image(extractPublicID(src))
			.quality("auto")
			.format("auto")
			.resize(scale().width(width).height(height))
			.toURL()

		imageCache.set(cacheKey, optimizedUrl)
		return optimizedUrl
	}

	const handleEditToggle = (src: string, path: string) => {
		setIsEditing(!isEditing())
		setLocalValue(isEditing() ? { [path]: src } : {})
	}

	const closeEditToggle = () => {
		setIsEditing(false)
		setLocalValue({})
	}

	createEffect(() => {})

	return {
		optimizeImageDisplay,
		handleEditToggle,
		isEditing,
		closeEditToggle,
	}
}

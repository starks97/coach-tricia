import { createSignal, createEffect } from "solid-js"
import { createStore, reconcile, produce } from "solid-js/store"

import { Cloudinary as cloudOptm } from "@cloudinary/url-gen"
import { scale } from "@cloudinary/url-gen/actions/resize"

import { extractPublicID } from "../helpers/extractID"

export function useImageState() {
	const [isEditing, setIsEditing] = createSignal(false)
	const [localValue, setLocalValue] = createSignal<string | null>(null)
	const [uploadProgress, setUploadProgress] = createSignal(0)
	const [dragActive, setDragActive] = createSignal(false)

	const cld = new cloudOptm({
		cloud: {
			cloudName: "dyrtdhsl0",
		},
	})

	const optimizeImageDisplay = (src: string, width: number = 100, height: number = 100) => {
		return cld
			.image(extractPublicID(src))
			.quality("auto")
			.format("auto")
			.resize(
				scale()
					.width(width || 100)
					.height(height || 100)
			)
			.toURL()
	}

	const handleEditToggle = (src: string) => {
		setIsEditing(!isEditing())
		setLocalValue(isEditing() ? src : null)
	}

	const closeEditToggle = () => {
		setIsEditing(false)
		setLocalValue(null)
	}

	createEffect(() => {
		console.log("Image State Changed:", {
			isEditing: isEditing(),
			localValue: localValue(),
		})
	})

	return {
		optimizeImageDisplay,
		handleEditToggle,
		isEditing,
		closeEditToggle,
	}
}

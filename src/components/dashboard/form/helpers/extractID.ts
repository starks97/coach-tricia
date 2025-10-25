export const extractPublicID = (url: string) => {
	if (!url.startsWith("http")) return url
	try {
		const urlObj = new URL(url)
		if (!urlObj.hostname.includes("cloudinary.com")) {
			return url
		}

		const pathParts = urlObj.pathname.split("/upload/")
		if (pathParts.length < 2) {
			return url
		}

		const uploadPart = pathParts[1]
		const withoutQuery = uploadPart.split("?")[0]

		const withoutVersion = withoutQuery.replace(/^v\d+\//, "")

		const decodedPublicId = decodeURIComponent(withoutVersion)

		return decodedPublicId
	} catch (e) {
		console.warn("Could not parse URL, using original value:", e)
		return url
	}
}

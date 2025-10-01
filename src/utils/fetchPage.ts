import type { PageTypeMap } from "~/types.ts"

export async function fetchPageData<T extends keyof PageTypeMap>(
	id: string,
	page: T
): Promise<PageTypeMap[T]> {
	try {
		const res = await fetch(`http://localhost:4321/api/page?id=${id}&page=${page}`)
		const json = await res.json()
		return json as PageTypeMap[T]
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function updateSectionData<T extends keyof PageTypeMap>(
	id: string,
	page: T,
	data: Partial<any>
): Promise<boolean> {
	try {
		const res = await fetch(`http://localhost:4321/api/update?id=${id}&page=${page}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})

		if (!res.ok) {
			throw new Error(`Failed to update section: ${res.statusText}`)
		}

		const json = await res.json()
		return json as boolean
	} catch (error) {
		console.error(error)
		throw error
	}
}

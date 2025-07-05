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

export function getDeepValue(obj: any, path: string): any {
	const keys = path.split(".").filter((key) => key !== "")
	let current = obj
	for (const key of keys) {
		if (current === undefined || current === null) return undefined
		current = current[key]
	}

	return current
}

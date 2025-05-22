export function cloneDeepPlain<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj))
}

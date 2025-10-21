import { cloneDeepPlain } from "@utils/cloneDeepPlain"

export class FormEngine {
	static setDeepValue(obj: any, path: string, value: any): any {
		const newObj = cloneDeepPlain(obj)
		const keys = path.split(".").filter((key) => key !== "")

		let current: any = newObj

		for (let i = 0; i < keys.length - 1; i++) {
			const key = keys[i]
			const nextKey = keys[i + 1]

			if (current[key] === undefined || current[key] === null) {
				current[key] = !isNaN(Number(nextKey)) ? [] : {}
			}
			current = current[key]
		}
		const lastKey = keys[keys.length - 1]

		if (Array.isArray(current) && !isNaN(Number(lastKey))) {
			const index = parseInt(lastKey)
			current[index] = value

			//add elements to array
		} else {
			current[lastKey] = value
		}

		return newObj
	}
}

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

	static addArrayItem(obj: any, path: string, value: any): any {
		const newObj = cloneDeepPlain(obj)
		const keys = path.split(".").filter((key) => key !== "")

		let current = newObj

		for (let i = 0; i < keys.length; i++) {
			const key = keys[i]
			if (current[key] === undefined || current[key] === null) {
				current[key] = i === keys.length - 1 ? [] : {}
			}
			current = current[key]
		}

		if (!Array.isArray(current)) {
			console.warn(`The value at path "${path}" is not an array.`)
			return newObj
		}

		const newElem = value ? (typeof value === "object" ? { ...value } : value) : null

		current.push(newElem)

		return newObj
	}

	static removeArrayItemByIndex(obj: any, path: string, index: number): any {
		const newObj = cloneDeepPlain(obj)
		const keys = path.split(".").filter((key) => key !== "")
		let current = newObj

		for (let i = 0; i < keys.length; i++) {
			const key = keys[i]
			if (current[key] === undefined || current[key] === null) {
				return newObj
			}
			current = current[key]
		}

		if (!Array.isArray(current) || index < 0 || index >= current.length) {
			return newObj
		}

		current.splice(index, 1)

		return newObj
	}
}

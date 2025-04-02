export default function replacePattern(target: string, str: string): string {
	let pattern = new RegExp(target, "g")

	return str.replace(pattern, `<b>${target}</b>`)
}

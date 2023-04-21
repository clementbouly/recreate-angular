export class Formatter {
	constructor(name: string) {}
	formatNumber(value: string, willHaveSpaces: boolean = true, length: number, groupLength: number): string {
		// replace all non-numeric characters with empty string
		value = value.replace(/[^\d]/g, "").substring(0, length)

		// insert space every ${groupLength} characters expect the last one
		if (willHaveSpaces) {
			value = value.replace(new RegExp(`(\\d{${groupLength}})(?=\\d)`, "g"), "$1 ")
		}

		return value
	}
}

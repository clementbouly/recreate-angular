import { Formatter } from "../services/formatter"

export class PhoneNumberDirective {
	static providers = [
		{
			provide: "formatter",
			constructor: () => new Formatter("phone-number"),
		},
	]
	static selector = "phone-number"
	private willHaveSpaces = true

	constructor(public element: HTMLInputElement, private formatter: Formatter) {
		this.element.addEventListener("input", () => this.formatPhoneNumber())
		if (this.element.hasAttribute("with-spaces")) {
			this.willHaveSpaces = this.element.getAttribute("with-spaces") === "true"
		}
	}

	formatPhoneNumber() {
		const value = this.formatter.formatNumber(this.element.value, this.willHaveSpaces, 10, 2)
		this.element.value = value
	}
}

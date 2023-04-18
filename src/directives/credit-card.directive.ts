import { Formatter } from "../services/formatter"
import { Verifier } from "../services/verifier"

export class CreditCardDirective {
	static selector = "credit-card"

	constructor(public element: HTMLInputElement, private formatter: Formatter, private verifier: Verifier) {
		this.element.addEventListener("input", () => this.formatCreditCard())
	}

	formatCreditCard() {
		const value = this.formatter.formatNumber(this.element.value, true, 16, 4)
		this.element.value = value
	}
}

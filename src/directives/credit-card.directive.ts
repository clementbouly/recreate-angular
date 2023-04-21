import { Directive } from "../decorators/directive"
import { HostBinding } from "../decorators/host-binding"
import { HostListener } from "../decorators/host-listener"
import { Input } from "../decorators/input"
import { Formatter } from "../services/formatter"
import { Verifier } from "../services/verifier"

@Directive({
	selector: "credit-card",
})
export class CreditCardDirective {
	@Input("border-color")
	@HostBinding("style.borderColor")
	borderColor = "blue"

	constructor(public element: HTMLInputElement, private formatter: Formatter, private verifier: Verifier) {}

	@HostListener("input", ["event.target"])
	formatCreditCard() {
		const value = this.formatter.formatNumber(this.element.value, true, 16, 4)
		this.element.value = value
	}
}

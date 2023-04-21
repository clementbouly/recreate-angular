import { Directive } from "../decorators/directive"
import { HostBinding } from "../decorators/host-binding"
import { HostListener } from "../decorators/host-listener"
import { Input } from "../decorators/input"
import { Formatter } from "../services/formatter"

@Directive({
	selector: "phone-number",
	providers: [
		{
			provide: "formatter",
			constructor: () => new Formatter("phone-number"),
		},
	],
})
export class PhoneNumberDirective {
	static bindings = [
		{ propName: "borderColor", attrName: "style.borderColor" },
		{ propName: "placeHolderText", attrName: "placeholder" },
	]

	@Input("with-spaces")
	private willHaveSpaces = true

	@Input("border-color")
	@HostBinding("style.borderColor")
	borderColor = "red"

	@HostBinding("placeholder")
	placeHolderText = "Phone number"

	constructor(public element: HTMLInputElement, private formatter: Formatter) {}

	@HostListener("click")
	onFocus() {
		this.placeHolderText = ""
		this.element.style.borderColor = "purple"
	}

	@HostListener("input", ["event.target"])
	formatPhoneNumber(element: HTMLInputElement) {
		element.value = this.formatter.formatNumber(element.value, this.willHaveSpaces, 10, 2)
	}

	@HostListener("click", ["event.clientX", 20])
	onClick(coordX: number, age: number) {
		console.log("click", coordX, age)
	}
}

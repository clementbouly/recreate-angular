import { CreditCardDirective } from "./directives/credit-card.directive"
import { PhoneNumberDirective } from "./directives/phone-number.directive"
import { Formatter } from "./services/formatter"
import { Verifier } from "./services/verifier"

const directives = [PhoneNumberDirective, CreditCardDirective]

const formatter = new Formatter()

const verifier = new Verifier()

directives.forEach((directive) => {
	const elements = document.querySelectorAll<HTMLInputElement>(`[${directive.selector}]`)
	elements.forEach((element) => {
		const parameters = analyseDirectiveConstructor(directive, element)
		Reflect.construct(directive, parameters)
	})
})

function analyseDirectiveConstructor(directive: any, element: HTMLInputElement) {
	const hasConstructor = directive.toString().includes("constructor")

	if (!hasConstructor) {
		return []
	}

	const paramsNames = extractParamNamesFromDirective(directive)

	const params = paramsNames.map((paramName) => {
		switch (paramName) {
			case "element":
				return element
			case "formatter":
				return formatter
			case "verifier":
				return verifier
			default:
				throw new Error(`Unknown parameter ${paramName}`)
		}
	})

	console.log(params)

	return params
}

function extractParamNamesFromDirective(directive: any) {
	// The regex will match the first line of the constructor
	const constructorParams = directive.toString().match(/constructor\((.*?)\)/)[1]

	if (!constructorParams) {
		return []
	}

	const paramNames = constructorParams.split(",").map((param) => param.trim())
	return paramNames
}

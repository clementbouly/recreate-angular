import { CreditCardDirective } from "./directives/credit-card.directive"
import { PhoneNumberDirective } from "./directives/phone-number.directive"
import { Angular } from "./framework/framework"
import { Formatter } from "./services/formatter"
import { Verifier } from "./services/verifier"
import { ProvidersMetadata } from "./types/types"

const declarations = [PhoneNumberDirective, CreditCardDirective]

const providers: ProvidersMetadata = [
	{
		provide: "formatter",
		constructor: () => new Formatter("global"),
	},
	{
		provide: "verifier",
		constructor: () => new Verifier(),
	},
]

Angular.bootstrapApplication({ declarations, providers })

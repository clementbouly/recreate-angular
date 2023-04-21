export type ProviderMetadata = {
	/**
	 * The name of the provider
	 * @example "formatter"
	 */
	provide: string
	/**
	 * The constructor of the provider
	 * @example () => new Formatter("credit-card")
	 */
	constructor: Function
}

export type ProvidersMetadata = ProviderMetadata[]

export type ServiceInstance = {
	/**
	 * The name of the service
	 * @example "formatter"
	 *
	 */
	name: string
	/**
	 * The instance of the service
	 * @example new Formatter("credit-card")
	 */
	instance: any
}

export type ServiceInstances = ServiceInstance[]

export type Module = {
	/**
	 * Le tableau qui doit contenir les classes des directives
	 * @example [PhoneNumberDirective, CreditCardDirective]
	 *
	 */
	declarations: any[]
	/**
	 * Le tableau qui doit contenir les classes des providers
	 * @example [
	 * {
	 * provide: "formatter",
	 * constructor: () => new Formatter("credit-card"),
	 * },
	 * ]
	 * @see ProviderMetadata
	 */
	providers?: ProvidersMetadata
}

export type DirectiveMetadata = {
	/**
	 * Le sélecteur css qui explique sur quel élément HTML la directive doit être appliquée
	 */
	selector: string
	/**
	 * The providers of the directive (the services that the directive needs)
	 */
	providers?: ProvidersMetadata
}

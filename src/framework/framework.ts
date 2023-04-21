import { Module, ProvidersMetadata, ServiceInstances } from "../types/types"

export class Framework {
	/**
	 *  le tableau qui contient les directives à charger
	 */
	directives: any[]
	/**
	 * le tableau qui contient les services à charger
	 */
	services: ServiceInstances = []
	/**
	 * le tableau qui contient les providers à charger
	 */
	providers: ProvidersMetadata

	/**
	 * Cette méthode va parcourir le tableau des directives et va instancier chaque directive
	 *
	 */
	bootstrapApplication(metadata: Module) {
		this.directives = metadata.declarations
		this.providers = metadata.providers!

		this.directives.forEach((directive) => {
			const elements = document.querySelectorAll<HTMLInputElement>(`[${directive.selector}]`)
			elements.forEach((element) => {
				const parameters = this.analyseDirectiveConstructor(directive, element)
				const directiveInstance: any = Reflect.construct(directive, parameters)

				const proxy = new Proxy(directiveInstance, {
					set(target, property, value) {
						target[property] = value
						if (!directive.bindings) {
							return true
						}

						const binding = directive.bindings.find((binding) => binding.propName === property)

						if (!binding) {
							return true
						}
						element.setAttribute(binding.attrName, value)

						return true
					},
				})

				proxy.init()
			})
		})
	}

	/**
	 * Permet d'analyser le constructeur d'une directive et de retourner un tableau de paramètres à passer au constructeur
	 * @param directive  la directive à analyser
	 * @param element  l'élément HTML sur lequel la directive est appliquée
	 * @returns un tableau de paramètres à passer au constructeur de la directive
	 */
	private analyseDirectiveConstructor(directive: any, element: HTMLInputElement) {
		const hasConstructor = directive.toString().includes("constructor")

		if (!hasConstructor) {
			return []
		}

		const paramsNames = this.extractParamNamesFromDirective(directive)

		const params = paramsNames.map((name) => {
			if (name === "element") {
				return element
			}

			const directiveProviders = directive.providers || []
			const directiveProvider = directiveProviders.find((provider) => provider.provide === name)

			if (directiveProvider) {
				return directiveProvider.constructor()
			}

			const service = this.services.find((service) => service.name === name)

			if (service) {
				return service.instance
			}

			const provider = this.providers.find((provider) => provider.provide === name)

			if (!provider) {
				throw new Error(`No provider found for ${name}`)
			}

			const instance = provider.constructor()

			this.services.push({
				name,
				instance,
			})

			return instance
		})

		return params
	}

	/**
	 *
	 * @param directive la directive à analyser
	 * @returns un tableau contenant les noms des paramètres du constructeur de la directive
	 */
	private extractParamNamesFromDirective(directive: any) {
		// The regex will match the first line of the constructor
		const constructorParams = directive.toString().match(/constructor\((.*?)\)/)[1]

		if (!constructorParams) {
			return []
		}

		const paramNames = constructorParams.split(",").map((param) => param.trim())
		return paramNames
	}
}

export const Angular = new Framework()

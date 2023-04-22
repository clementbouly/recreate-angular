import { ComponentMetadata } from "../framework/types"

export function Component(metadata: ComponentMetadata) {
	return function (decoratedClass) {
		decoratedClass["selector"] = metadata.selector
		decoratedClass["providers"] = metadata.providers || []

		decoratedClass.prototype.render = function () {
			let renderedTemplate = metadata.template

			const matches = renderedTemplate.match(/{{.*?}}/g)
			matches.forEach((match) => {
				const property = match.replace(/{{|}}/g, "").trim()
				renderedTemplate = renderedTemplate.replace(match, this[property])
			})

			const eventsToBind: { elementId: string; eventName: string; functionName: string }[] = []

			// get all the elements opening tags with events () in it
			const regex = /<(\w+)\s+(?=[^>]*(\(\w+\)))[^>]*>/g
			const matches2 = renderedTemplate.match(regex)

			matches2.forEach((match) => {
				// get the element name just after the opening tag
				const elementName = match.match(/<(\w+)\s+/)[1]

				// get the events name between parenthesis and the function after the equal sign
				const events = match.match(/<.*? \(.*?\)=".*?\".*?>/g)
				// generate randomId for the element
				const randomId = "event-listener-" + Math.random().toString(36).substr(2, 9)

				// replace the opening tag with a new one with a randomId
				renderedTemplate = renderedTemplate.replace(match, `<${elementName} id="${randomId}">`)

				events.forEach((event) => {
					// get the event name between parenthesis
					const eventName = event.match(/\(.*?\)/)[0].replace(/\(|\)/g, "")
					// get the function name after the equal sign
					const functionName = event
						.match(/\".*?\"/)[0]
						.replace(/\"/g, "")
						.replace(/\(|\)/g, "")
					//  add the event to the eventsToBind array
					eventsToBind.push({ elementId: randomId, eventName, functionName })
				})
			})

			this.element.innerHTML = renderedTemplate

			eventsToBind.forEach((eventToBind) => {
				const element = this.element.querySelector(`#${eventToBind.elementId}`)

				element.addEventListener(eventToBind.eventName, () => {
					this[eventToBind.functionName]()
					this.render()
				})
			})
		}

		const originalInitFunction = decoratedClass.prototype.init || function () {}

		decoratedClass.prototype.init = function () {
			originalInitFunction.call(this)
			this.render()
		}

		return decoratedClass
	}
}

import { Component } from "../decorators/component"
import { Input } from "../decorators/input"

@Component({
	selector: "counter",
	template: `
		<h1>Counter</h1>

		<button (click)="(decrement)">-</button>
		<span>{{ count }}</span>
		<button (click)="(increment)">+</button>
	`,
})
export class CounterComponent {
	@Input("initial-value")
	count = 0

	@Input("step")
	step = 1

	constructor(public element: HTMLElement) {}

	increment() {
		this.count = +this.count + +this.step
	}

	decrement() {
		this.count -= this.step
	}
}

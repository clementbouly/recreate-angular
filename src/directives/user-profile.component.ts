import { Component } from "../decorators/component"

import { Input } from "../decorators/input"

@Component({
	selector: "user-profile",
	template: `
		<article>
			<h3 (click)="(onH3Click)">Profil de {{ firstName }} {{ lastName }}</h3>
			<h3 (click)="(onClickButton)">Deuxieme h3</h3>
			<strong (mouseenter)="(onMouseEnter)">Job: {{ job }}</strong>
			<button (click)="(onClickButton)" (dblclick)="(onDblClickButton)">Modifier</button>
		</article>
	`,
})
export class UserProfileComponent {
	@Input("first-name")
	firstName: string = "firstName"

	@Input("last-name")
	lastName: string = "lastName"

	@Input("job")
	job: string = "Job"

	constructor(public element: HTMLElement) {}

    // init() {
    //     this.render()
    // }

	onMouseEnter() {
		console.log("onMouseEnter")
	}

	onClickButton() {
		this.firstName = "Jean"
		this.lastName = "Dupont"
		this.job = "Développeur"
	}

	onDblClickButton() {
		console.log("onDblClickButton")
		this.firstName = "Maurice"
	}

	onH3Click() {
		console.log("onH3Click")
	}

	
}

export type Review = {
	title: string
	quote: string
	author: string
}

export type Story = {
	first: {
		title: string
		content: {
			first: string
			second: string
			third: string
		}
		image: string
	}
	second: {
		title: string
		description: string
		content: string
		image: string
	}
}

export type FunFact = {
	title: string
	id: number
}

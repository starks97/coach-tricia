export const menuPath = [
	["/", "Home"],
	["/about", "About"],
	["/coaching", "Coaching"],
	["/contact", "Contact"],
] as const

export const colorAsigment: Record<number, string> = {
	1: "#eee1e0",
	2: "#eaeaea",
	3: "#f1d9d5",
}

export const colorBtnAssigment: Record<number, string> = {
	1: "#c39e99",
	2: "#bbbbbb",
	3: "#ce7c75",
}

export const resources = [
	{ name: "Home", href: "/" },
	{ name: "Coaching", href: "/coaching" },
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
]

export const socialLinks = [
	{ name: "Facebook", icon: "/icons/facebook.svg", href: "https://facebook.com/tricia.rago" },
	{
		name: "Instagram",
		icon: "/icons/instagram.svg",
		href: "https://www.instagram.com/coachtriciarago",
	},
	{
		name: "LinkedIn",
		icon: "/icons/linkedin.svg",
		href: "https://www.linkedin.com/in/tricia-rago-781216388/",
	},
]

export const subDomain: string = "<form@notifications.coachtriciarago.com>"
export const myEmail: string = "patricia@coachtriciarago.com"

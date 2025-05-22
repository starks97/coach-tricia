const pageStore = {
	home_page_id: "home",
	coaching_page_id: "coaching",
	about_page_id: "about",
	contact_page_id: "contact",
	seo_id: "seo",
} as const

interface Props {
	onSelect: (page: { key: string; value: string }) => void
}

export default function SectionSelector(props: Props) {
	return (
		<div class="flex gap-2">
			{Object.entries(pageStore).map(([key, value]) => (
				<button onClick={() => props.onSelect({ key, value })} class="btn">
					{value}
				</button>
			))}
		</div>
	)
}

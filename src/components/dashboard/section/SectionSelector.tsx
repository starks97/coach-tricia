import { pageStoreID } from "~/consts"

interface Props {
	onSelect: (page: { key: string; value: string }) => void
}

export default function SectionSelector(props: Props) {
	return (
		<div class="flex gap-2">
			{Object.entries(pageStoreID).map(([key, value]) => (
				<button onClick={() => props.onSelect({ key, value })} class="btn">
					{value}
				</button>
			))}
		</div>
	)
}

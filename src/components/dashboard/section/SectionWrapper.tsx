import { createSignal, Show, createEffect } from "solid-js"
import { useQuery } from "@tanstack/solid-query"

import { fetchSectionPageData } from "@utils/fetchSection.ts"

import SectionSelector from "./SectionSelector.tsx"
import DynamicSectionCard from "./SectionCard.tsx"
import type { PageTypeKeys } from "~/types.ts"

export default function SectionWrapper() {
	const defaultSection: { key: string; value: PageTypeKeys } = {
		key: "home_page_id",
		value: "home" as PageTypeKeys,
	}
	const [currentSection, setCurrentSection] = createSignal<{
		key: string
		value: PageTypeKeys
	}>(defaultSection)

	const sectionQuery = useQuery(() => {
		const { key, value } = currentSection()
		return {
			queryKey: ["page", value],
			queryFn: async () => await fetchSectionPageData(key, value),
		}
	})

	createEffect(() => {
		console.log("Current data:", sectionQuery.data)
		console.log("current section:", currentSection())
	})

	return (
		<div class="w-full">
			<SectionSelector onSelect={setCurrentSection} />
			<Show when={sectionQuery.data} fallback={<div>Loading...</div>}>
				{(data) => <DynamicSectionCard data={data()} sectionType={currentSection().value} />}
			</Show>
		</div>
	)
}

import { createSignal, Show } from "solid-js"
import { useQuery } from "@tanstack/solid-query"

import { fetchPageData } from "~/utils/fetchPage.ts"

import SectionSelector from "./SectionSelector.tsx"
import DynamicSectionCard from "./SectionCard.tsx"
import type { PageTypeKeys } from "~/types.ts"

import { FormProvider } from "../FormProvider.tsx"

export default function SectionWrapper() {
	const defaultSection: { key: string; value: PageTypeKeys } = {
		key: "home_page_id",
		value: "home",
	}
	const [currentSection, setCurrentSection] = createSignal<{
		key: string
		value: PageTypeKeys
	}>(defaultSection)

	const sectionQuery = useQuery(() => {
		const { key, value } = currentSection()
		return {
			queryKey: ["page", value],
			queryFn: async () => await fetchPageData(key, value),
		}
	})

	return (
		<div class="w-full">
			<SectionSelector onSelect={setCurrentSection} />
			<Show when={sectionQuery.data} fallback={<div>Loading...</div>}>
				{(data) => (
					<FormProvider>
						<DynamicSectionCard data={data} sectionPage={currentSection} />
					</FormProvider>
				)}
			</Show>
		</div>
	)
}

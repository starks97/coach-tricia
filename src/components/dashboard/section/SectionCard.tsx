import type { PageTypeMap, PageTypeKeys } from "@types"

import { type Accessor, Show } from "solid-js"
import GeneralForm from "../forms/GeneralForm"
import { HomePageSchema } from "~/lib/db/models/home"
import { CoachingPageSchema } from "~/lib/db/models/coaching"
import { AboutPageSchema } from "~/lib/db/models/about"
import { ContactPageSchema } from "~/lib/db/models/contact"
import { SEODocumentSchema } from "~/lib/db/models/seo"

type DynamicFormProps<T extends PageTypeKeys> = {
	data: Accessor<PageTypeMap[T]>
	sectionPage: Accessor<{
		key: string
		value: T
	}>
}

export default function DynamicSectionCard<T extends PageTypeKeys>({
	data,
	sectionPage,
}: DynamicFormProps<T>) {
	return (
		<div>
			<Show when={sectionPage().value === "home"} keyed={true}>
				{(data() as PageTypeMap["home"]) && (
					<GeneralForm
						data={data() as PageTypeMap["home"]}
						schema={HomePageSchema}
						currentSection={sectionPage().value}
						currentSectionId={sectionPage().key}
					/>
				)}
			</Show>

			<Show when={sectionPage().value === "coaching"} keyed={true}>
				{(data() as PageTypeMap["coaching"]) && (
					<GeneralForm
						data={data() as PageTypeMap["coaching"]}
						schema={CoachingPageSchema}
						currentSection={sectionPage().value}
						currentSectionId={sectionPage().key}
					/>
				)}
			</Show>

			<Show when={sectionPage().value === "about"} keyed={true}>
				<div>
					{(data() as PageTypeMap["about"]) && (
						<GeneralForm
							data={data() as PageTypeMap["about"]}
							schema={AboutPageSchema}
							currentSection={sectionPage().value}
							currentSectionId={sectionPage().key}
						/>
					)}
				</div>
			</Show>

			<Show when={sectionPage().value === "contact"} keyed={true}>
				<div>
					{(data() as PageTypeMap["contact"]) && (
						<GeneralForm
							data={data() as PageTypeMap["contact"]}
							schema={ContactPageSchema}
							currentSection={sectionPage().value}
							currentSectionId={sectionPage().key}
						/>
					)}
				</div>
			</Show>

			<Show when={sectionPage().value === "seo"} keyed={true}>
				<div>
					{(data() as PageTypeMap["seo"]) && (
						<GeneralForm
							data={data() as PageTypeMap["seo"]}
							schema={SEODocumentSchema}
							currentSection={sectionPage().value}
							currentSectionId={sectionPage().key}
						/>
					)}
				</div>
			</Show>
		</div>
	)
}

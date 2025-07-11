import type { PageTypeMap, PageTypeKeys } from "@types"

import { type Accessor, Show, For } from "solid-js"

import { useForm } from "../FormProvider";
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

  const {homeForm } = useForm()
	return (
		<div>
			<Show when={sectionPage().value === "home"} keyed={true}>
				<div>
					{(data() as PageTypeMap["home"]).sections.benefits && (
						<h2>{(data() as PageTypeMap["home"]).sections.benefits.title}</h2>
					)}
					<homeForm[0].
				</div>
			</Show>

			<Show when={sectionPage().value === "coaching"} keyed={true}>
				{(data() as PageTypeMap["coaching"]).sections.guide && (
					<h2>{(data() as PageTypeMap["coaching"]).sections.guide.title}</h2>
				)}
			</Show>

			<Show when={sectionPage().value === "about"} keyed={true}>
				<div>
					{(data() as PageTypeMap["about"]).sections.enough && (
						<h2>{(data() as PageTypeMap["about"]).sections.enough.title}</h2>
					)}
				</div>
			</Show>

			<Show when={sectionPage().value === "contact"} keyed={true}>
				<div>
					{(data() as PageTypeMap["contact"]).sections.hero && (
						<h2>{(data() as PageTypeMap["contact"]).sections.hero.title}</h2>
					)}
				</div>
			</Show>

			<Show when={sectionPage().value === "seo"} keyed={true}>
				<div>
					{(data() as PageTypeMap["seo"]).sections.about && (
						<h2>{(data() as PageTypeMap["seo"]).sections.about.keywords}</h2>
					)}
				</div>
			</Show>
		</div>
	)
}

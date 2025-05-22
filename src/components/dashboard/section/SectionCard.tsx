import { Switch, Match, For, Show, createSignal } from "solid-js"
import type { Page, PageTypeMap, PageTypeKeys } from "@types"
import { type HomePageZodSchemaType, HomePageSchema } from "~/lib/models/home"
import { type CoachingPageZodSchemaType, CoachingPageSchema } from "~/lib/models/coaching"

import EditableForm from "./EditableForm"

export default function DynamicSectionCard<T extends PageTypeKeys>({
	data,
	sectionType,
}: {
	data: PageTypeMap[T]
	sectionType: T
}) {
	const schemas = {
		home: HomePageSchema,
		coaching: CoachingPageSchema,
		// ... otros esquemas
	} as const

	return (
		<Switch>
			<Match when={sectionType === "home"}>
				<HomePageContent data={data as PageTypeMap["home"]} />
			</Match>
		</Switch>
	)
}

interface HomePageProps {
	data: PageTypeMap["home"]
}

export function HomePageContent({ data }: HomePageProps) {
	const [editing, setEditing] = createSignal(false)

	const sections = data.sections

	const handleChange = () => {}

	const handleSave = () => setEditing(false)
	const handleCancel = () => {
		setEditing(false)
	}
	return (
		<div class="space-y-4">
			<Show when={editing()}>
				<form class="">
					<h2 class="text-4xl">Hero section</h2>
					<div class="">
						<label for="title" class="font-tajawal text-size-4 mb-1 block font-medium">
							title
						</label>
						<input
							class="w-full"
							value={sections.hero.title}
							placeholder="title"
							type={"text"}
							name={"title"}
						/>
						<input value={sections.hero.description} />
					</div>
				</form>
			</Show>

			<Show
				when={editing()}
				fallback={
					<button onClick={() => setEditing(true)} class="text-blue-600">
						✏️ Edit
					</button>
				}
			>
				<div class="flex gap-2">
					<button onClick={handleSave} class="text-green-600">
						💾 Save
					</button>
					<button onClick={handleCancel} class="text-red-600">
						✖️ Cancel
					</button>
				</div>
			</Show>
		</div>
	)
}

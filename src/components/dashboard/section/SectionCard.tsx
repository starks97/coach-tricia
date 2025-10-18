import type { PageTypeMap, PageTypeKeys } from "@types"

import { type Accessor, Show, createMemo } from "solid-js"
import GeneralForm from "../forms/GeneralForm"
import { schemaRouter } from "~/lib/db/schemaRouter"

type DynamicFormProps<T extends PageTypeKeys> = {
	data: Accessor<PageTypeMap[T]>
	sectionPage: Accessor<{
		key: string
		value: T
	}>
	key: string
}

export default function DynamicSectionCard<T extends PageTypeKeys>({
	data,
	sectionPage,
}: DynamicFormProps<T>) {

	const schema = createMemo(() => schemaRouter[sectionPage().value].schema)

	return (
		<div>
			<Show when={schema()} keyed={true}>
				{(currentSchema) => (<GeneralForm
					data={data}
					schema={currentSchema}
					currentSection={sectionPage}
				/>)}
			</Show>
		</div>
	)
}

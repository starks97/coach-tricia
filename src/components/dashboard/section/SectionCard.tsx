import type { PageTypeMap, PageTypeKeys } from "@lib/db/types"

import { type Accessor, Show, createMemo } from "solid-js"
import GeneralForm from "../form/form-component/GeneralForm"
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
			<Show when={schema()}>
				{(currentSchema) => (<GeneralForm
					data={data}
					schema={currentSchema()}
					currentSection={sectionPage}
				/>)}
			</Show>
		</div>
	)
}

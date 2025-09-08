import {
	createForm,
	type PartialValues,
	zodForm,
	Field,
	type FieldPath,
	type FieldPathValue,
} from "@modular-forms/solid"
import { HomePageSchema } from "~/lib/models/home"
import type { PageTypeMap } from "~/types"
import { TextInput } from "./handlers/TextInput"

interface HomeFormProps {
	data: PageTypeMap["home"]
}

interface AutoFieldProps<T> {
	name: FieldPath<T>
	label: string
	type?: string
}

function AutoField<T>({ ...props }: AutoFieldProps<T>) {
	return (
		<Field<T, FieldPathValue<T, typeof name>> name={name}>
			{(field, props) => (
				<TextInput
					{...props}
					type={type}
					required
					value={field.value || ""}
					error={field.error || ""}
					label={label}
				/>
			)}
		</Field>
	)
}

export default function HomeForm({ data }: HomeFormProps) {
	const [form, { Form, Field }] = createForm<PageTypeMap["home"]>({
		validate: zodForm(HomePageSchema),
		initialValues: data,
	})

	return (
		<Form class="w-full p-14">
			<div class="flex flex-col gap-2">
				<Field name="sections.hero.title">
					{(field, props) => (
						<TextInput
							{...props}
							type="text"
							required
							value={field.value}
							error={field.error || ""}
							label="Hero Title"
						/>
					)}
				</Field>
				<Field name="sections.hero.subtitle">
					{(field, props) => (
						<TextInput
							{...props}
							type="text"
							required
							value={field.value}
							error={field.error || ""}
							label="Hero Subtitle"
						/>
					)}
				</Field>
				<Field name="sections.hero.description">
					{(field, props) => (
						<TextInput
							{...props}
							type="text"
							required
							value={field.value}
							error={field.error || ""}
							label="Hero Description"
						/>
					)}
				</Field>

				<Field name="sections.podcast.image">
					{(field, props) => (
						<TextInput
							{...props}
							type="text"
							required
							value={field.value}
							error={field.error || ""}
							label="Hero Image URL"
						/>
					)}
				</Field>
			</div>
		</Form>
	)
}

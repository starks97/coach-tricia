import { Show, createSignal } from "solid-js"
import Accordion from "@corvu/accordion";

import type { BaseInputProps } from "../types"

import WidgetImage from "./WidgetImage";

const ErrorMessage = ({ error }: { error: string }) => (
	<Show when={error}>
		<span class="mt-1 block text-sm text-red-500">{error}</span>
	</Show>
)

export function BaseInput({ error, onBlur, path, value, isArray, label }: BaseInputProps) {
	const [localValue, setLocalValue] = createSignal(value);

	const isImage = path.toLowerCase().includes("image") || path.toLowerCase().includes("img");

	return (
		<div class="field-group mb-4">
			{isArray === true ? (
				<>
					<Accordion collapseBehavior="hide">
						<Accordion.Item>
							<label class="font-tajawal text-size-3  block font-medium text-black" for={path}>
								<Accordion.Trigger class="w-full border-b border-corvu-300 bg-corvu-100 px-4 py-3 text-left font-medium transition-all duration-100 hover:bg-corvu-200 focus-visible:bg-corvu-200 focus-visible:outline-hidden">{label}</Accordion.Trigger>
							</label>
							<Accordion.Content>
								<input
									type={typeof localValue() === "number" ? "number" : "text"}
									id={path}
									name={path}
									value={localValue() ?? ""}
									onInput={(e) => setLocalValue(e.currentTarget.value)}
									onBlur={() => onBlur(path, localValue())}
									class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
								/>

							</Accordion.Content>
						</Accordion.Item>
					</Accordion>
					<ErrorMessage error={error} />
				</>) : (
				<>
					<label class="font-tajawal text-size-3 mb-2 block font-medium text-black" for={path}>
						{label}
					</label>
					{
						isImage ? (
							<WidgetImage src={localValue() as string} />
						) : (
							<input
								type={typeof localValue() === "number" ? "number" : "text"}
								id={path}
								name={path}
								value={localValue() ?? ""}
								onInput={(e) => setLocalValue(e.currentTarget.value)}
								onBlur={() => onBlur(path, localValue())}
								class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
							/>
						)
					}
					<ErrorMessage error={error} />
				</>
			)}
		</div>

	)
}

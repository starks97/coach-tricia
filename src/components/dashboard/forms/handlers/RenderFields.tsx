import { For } from "solid-js"

import type { PageTypeKeys, RenderFieldsProps } from "~/types"

import { BaseInput } from "./BaseInput"

import { formatLabel } from "~/utils/formatLabel"

import Accordion from "@corvu/accordion";
export default function RenderFields<T extends PageTypeKeys>({
	data,
	path,
	errors,
	handleUpdateField,
}: RenderFieldsProps<T>) {
	if (!data || typeof data !== "object") {
		return null
	}

	return (
		<>
			{Object.entries(data).map(([key, value]) => {
				const currentPath = path ? `${path}.${key}` : key
				const error = errors[currentPath]
				const label = formatLabel(key)

				// Caso: objeto anidado
				if (typeof value === "object" && value !== null && !Array.isArray(value)) {
					return (
						<div class="nested-section mb-6 rounded-lg bg-gray-50 p-4">
							<h3 class="font-prata text-taupe text-size-4 mb-3 font-semibold">
								{label.toUpperCase()}
							</h3>
							<div class="section-fields space-y-4">
								<RenderFields
									data={value}
									path={currentPath}
									errors={errors}
									handleUpdateField={handleUpdateField}
								/>
							</div>
						</div>
					)
				}

				// Caso: array
				if (Array.isArray(value)) {
					const errorIndexs = Object.keys(errors)
						.filter((path) => path.startsWith(`${currentPath}.`))
						.map((path) => {
							const parts = path.split(".")
							return parseInt(parts[parts.length - 1])
						})
						.filter((num) => !isNaN(num))

					const allIndexes = [...new Set([...value.keys(), ...errorIndexs])].sort()

					const containsObjects = value.some(item =>
						item && typeof item === "object" && !Array.isArray(item)
					)

					return (
						<div class="array-section ">
							<h3 class="section-title font-prata text-taupe text-size-4  font-semibold">
								{label.toUpperCase()}
							</h3>
							{containsObjects ? (
								// Array de objetos - usar acordeón
								<Accordion collapseBehavior="hide">
									<For each={allIndexes}>
										{(arrayIndex) => {
											const arrayPath = `${currentPath}.${arrayIndex}`
											const itemError = errors[arrayPath] || ""
											const itemValue = value[arrayIndex] !== undefined ? value[arrayIndex] : ""
											const itemLabel = `${label} ${arrayIndex + 1}`

											const { id, ...restValues } = itemValue;


											return (
												<Accordion.Item>
													<Accordion.Trigger class="flex w-full justify-between border-b border-corvu-300 bg-corvu-100 px-4 py-3 text-left font-medium transition-all duration-100 hover:bg-corvu-200 focus-visible:bg-corvu-200 focus-visible:outline-hidden">
														{itemLabel}
													</Accordion.Trigger>
													<Accordion.Content>
														<div class="array-item p-4 flex flex-col">
															{typeof itemValue === "object" && itemValue !== null ? (
																<RenderFields
																	data={restValues}
																	path={arrayPath}
																	errors={errors}
																	handleUpdateField={handleUpdateField}
																/>
															) : (
																<BaseInput
																	path={arrayPath}
																	value={restValues}
																	label={itemLabel}
																	onChange={handleUpdateField}
																	error={itemError}
																	isArray={true}
																/>
															)}
														</div>
													</Accordion.Content>
												</Accordion.Item>
											)
										}}
									</For>
								</Accordion>
							) : (
								// Array de valores primitivos - comportamiento original
								<For each={allIndexes}>
									{(arrayIndex) => {
										const arrayPath = `${currentPath}.${arrayIndex}`
										const itemError = errors[arrayPath] || ""
										const itemValue = value[arrayIndex] !== undefined ? value[arrayIndex] : ""
										const itemLabel = `${label} ${arrayIndex + 1}`

										return (
											<div class="array-item">
												{typeof itemValue === "object" && itemValue !== null ? (
													<RenderFields
														data={itemValue}
														path={arrayPath}
														errors={errors}

														handleUpdateField={handleUpdateField}
													/>
												) : (
													<BaseInput
														path={arrayPath}
														value={itemValue}
														label={itemLabel}
														onChange={handleUpdateField}
														error={itemError}
														isArray={true}
													/>
												)}
											</div>
										)
									}}
								</For>
							)}
						</div>
					)

				}

				// Caso: valor primitivo
				return (
					<BaseInput
						path={currentPath}
						value={value}
						label={label}
						onChange={handleUpdateField}
						error={error}
					/>
				)
			})}
		</>
	)
}

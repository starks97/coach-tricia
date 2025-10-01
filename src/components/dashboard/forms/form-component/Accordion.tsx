import { For, Show, createSignal } from "solid-js"
import type { JSX } from "solid-js"

export interface AccordionItem {
	id: string
	title: string
	content: any
}

export interface AccordionProps {
	items?: AccordionItem[]
	multiple?: boolean
	variant?: "chevron" | "plus" | "bordered" | "filled"
	defaultOpenItems?: string[]
	class?: string
	children?: JSX.Element
}

export interface AccordionItemProps {
	item: AccordionItem
	isOpen: boolean
	onToggle: () => void
	variant?: AccordionProps["variant"]
	children?: JSX.Element
}

export default function Accordion(props: AccordionProps) {
	const [openItems, setOpenItems] = createSignal<string[]>(props.defaultOpenItems || [])

	const toggleItem = (itemId: string) => {
		if (props.multiple) {
			setOpenItems((prev) =>
				prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
			)
		} else {
			setOpenItems((prev) => (prev.includes(itemId) ? [] : [itemId]))
		}
	}

	const isItemOpen = (itemId: string) => openItems().includes(itemId)

	return (
		<div class="accordion" classList={{ [props.class!]: !!props.class }}>
			{props.children ? (
				props.children
			) : (
				<For each={props.items}>
					{(item) => (
						<AccordionItem
							item={item}
							isOpen={isItemOpen(item.id)}
							onToggle={() => toggleItem(item.id)}
							variant={props.variant}
						/>
					)}
				</For>
			)}
		</div>
	)
}

const AccordionItem = (props: AccordionItemProps) => {
	return (
		<div
			class="accordion-item"
			classList={{
				"accordion-item--open": props.isOpen,
				[`accordion-item--${props.variant}`]: !!props.variant,
			}}
		>
			<button class="accordion-header" onClick={props.onToggle} aria-expanded={props.isOpen}>
				<span class="accordion-title">{props.item.title}</span>
				<span class="accordion-icon">
					{props.variant === "plus" ? (
						<PlusMinusIcon isOpen={props.isOpen} />
					) : (
						<ChevronIcon isOpen={props.isOpen} />
					)}
				</span>
			</button>
			<div class="accordion-content" classList={{ "accordion-content--open": props.isOpen }}>
				<div class="accordion-content-inner">{props.children || props.item?.content}</div>
			</div>
		</div>
	)
}

interface IconProps {
	isOpen: boolean
}

const ChevronIcon = (props: IconProps) => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		classList={{ "accordion-icon--rotated": props.isOpen }}
	>
		<path
			d="M4 6L8 10L12 6"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

const PlusMinusIcon = (props: IconProps) => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<Show
			when={props.isOpen}
			fallback={
				<path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			}
		>
			<path d="M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
		</Show>
	</svg>
)

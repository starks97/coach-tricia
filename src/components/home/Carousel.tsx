import { createSignal, onCleanup, onMount, Show } from "solid-js"

import type { Review } from "../../types"

export default function Carousel({ reviews }: { reviews: Review[] }) {
	const [index, setIndex] = createSignal<number>(0)
	const [fade, setFade] = createSignal<boolean>(true)
	const [isPaused, setIsPaused] = createSignal<boolean>(false)
	const [isMounted, setIsMounted] = createSignal<boolean>(false)

	let interval: number | undefined
	let timeoutId: number | undefined
	let resumeTimeout: number | undefined

	const startInterval = () => {
		clearExistingIntervals()

		interval = window.setInterval(() => {
			if (!isPaused()) {
				setFade(false)
				timeoutId = window.setTimeout(() => {
					setIndex((i) => (i + 1) % reviews.length)
					setFade(true)
				}, 2000)
			}
		}, 8000)
	}

	const clearExistingIntervals = () => {
		if (interval !== undefined) window.clearInterval(interval)
		if (timeoutId !== undefined) window.clearTimeout(timeoutId)
		if (resumeTimeout !== undefined) window.clearTimeout(resumeTimeout)
	}

	onMount(() => {
		setIsMounted(true)
		if (typeof window !== "undefined") {
			startInterval()
		}
		onCleanup(clearExistingIntervals)
	})

	const handleMouseEnter = () => {
		setIsPaused(true)
		if (interval !== undefined) {
			window.clearInterval(interval)
		}
	}

	const handleMouseLeave = () => {
		setIsPaused(false)
		startInterval()
	}

	const handleTouchStart = () => {
		setIsPaused(true)
		if (interval !== undefined) {
			window.clearInterval(interval)
		}
	}

	const handleTouchEnd = () => {
		window.setTimeout(() => {
			setIsPaused(false)
			startInterval()
		}, 1000)
	}

	const current = () => reviews[index()]

	return (
		<div
			class="fade-in-out bg-soft-beige mx-auto flex h-112.5 w-full max-w-lg flex-col rounded-lg p-8 opacity-100 shadow-md"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			<Show when={isMounted()}>
				<div
					class={`flex-1 overflow-y-auto transition-opacity duration-2000 ${fade() ? "opacity-100" : "opacity-0"}`}
				>
					<p class="font-prata mobile:text-2xl tablet:text-size-4 laptop:text-size-5 tablet:leading-8 laptop:leading-10 mb-2 text-center text-lg font-bold text-black">
						{current().title}
					</p>
					<p class="font-tajawal mobile:text-lg tablet:text-size-2 laptop:text-size-3 mb-1.5 text-justify text-base text-black">
						{current().quote}
					</p>
					<p class="font-prata mobile:text-lg tablet:text-size-2 text-center text-base font-semibold text-black">
						{current().author}
					</p>
				</div>
			</Show>
			<div class="flex shrink-0 justify-evenly gap-4 pt-6">
				<button
					aria-label="Previous review"
					onClick={() => {
						setIndex((i) => (i - 1 + reviews.length) % reviews.length)
						if (interval !== undefined) window.clearInterval(interval)
						startInterval()
					}}
					class="cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						fill="#000000"
						viewBox="0 0 256 256"
					>
						<path d="M205.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L131.31,128ZM51.31,128l74.35-74.34a8,8,0,0,0-11.32-11.32l-80,80a8,8,0,0,0,0,11.32l80,80a8,8,0,0,0,11.32-11.32Z"></path>
					</svg>
					Prev
				</button>
				<button
					aria-label="Next review"
					onClick={() => {
						setIndex((i) => (i + 1) % reviews.length)
						if (interval !== undefined) window.clearInterval(interval)
						startInterval()
					}}
					class="cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						fill="#000000"
						viewBox="0 0 256 256"
					>
						<path d="M141.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L124.69,128,50.34,53.66A8,8,0,0,1,61.66,42.34l80,80A8,8,0,0,1,141.66,133.66Zm80-11.32-80-80a8,8,0,0,0-11.32,11.32L204.69,128l-74.35,74.34a8,8,0,0,0,11.32,11.32l80-80A8,8,0,0,0,221.66,122.34Z"></path>
					</svg>
					Next
				</button>
			</div>
		</div>
	)
}

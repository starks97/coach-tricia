import { createSignal, onCleanup, onMount } from "solid-js"

import type { Review } from "../../types"

export default function Carousel({ reviews }: { reviews: Review[] }) {
	const [index, setIndex] = createSignal<number>(0)
	const [fade, setFade] = createSignal<boolean>(true)
	const [isPaused, setIsPaused] = createSignal<boolean>(false)

	// Use the correct type for browser intervals
	let interval: number | undefined

	const startInterval = () => {
		// Clear any existing interval first
		if (interval !== undefined) {
			window.clearInterval(interval)
		}

		interval = window.setInterval(() => {
			if (!isPaused()) {
				setFade(false) // Start fade out
				const timeoutId = window.setTimeout(() => {
					setIndex((i) => (i + 1) % reviews.length)
					setFade(true) // Fade in new content
				}, 2000) // matches fade-out duration

				// Store timeout ID if you need to clear it later
				// You would need another variable for this
			}
		}, 6000)
	}

	onMount(() => {
		// Ensure we're in browser environment
		if (typeof window !== "undefined") {
			startInterval()
		}

		onCleanup(() => {
			if (interval !== undefined) {
				window.clearInterval(interval)
			}
		})
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
		const resumeTimeout = window.setTimeout(() => {
			setIsPaused(false)
			startInterval()
		}, 1000)
	}

	const current = () => reviews[index()]

	return (
		<div
			class="fade-in-out bg-soft-beige mx-auto flex min-h-[400px] w-full max-w-lg flex-col rounded-lg p-8 opacity-100 shadow-md"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			<div class={`transition-opacity duration-2000 ${fade() ? "opacity-100" : "opacity-0"}`}>
				<h3 class="font-prata mobile:text-2xl tablet:text-size-4 laptop:text-size-5 tablet:leading-8 laptop:leading-10 mb-2 text-center text-lg font-bold text-black">
					{current().title}
				</h3>
				<p class="font-tajawal mobile:text-lg tablet:text-size-2 laptop:text-size-3 mb-1.5 text-justify text-base text-black">
					{current().quote}
				</p>
				<p class="font-prata mobile:text-lg tablet:text-size-2 text-center text-base font-semibold text-black">
					{current().author}
				</p>
			</div>

			<div class="mt-auto flex justify-center gap-4 pt-6">
				<button
					onClick={() => {
						setIndex((i) => (i - 1 + reviews.length) % reviews.length)
						if (interval !== undefined) window.clearInterval(interval)
						startInterval()
					}}
				>
					Prev
				</button>
				<button
					onClick={() => {
						setIndex((i) => (i + 1) % reviews.length)
						if (interval !== undefined) window.clearInterval(interval)
						startInterval()
					}}
				>
					Next
				</button>
			</div>
		</div>
	)
}

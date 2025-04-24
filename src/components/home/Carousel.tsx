import { createSignal, onCleanup, onMount } from "solid-js"

import type { Review } from "../../types"

export default function Carousel({ reviews }: { reviews: Review[] }) {
	const [index, setIndex] = createSignal(0)
	const [fade, setFade] = createSignal(true)

	let interval: ReturnType<typeof setInterval>

	onMount(() => {
		interval = setInterval(() => {
			setFade(false) // Start fade out
			setTimeout(() => {
				setIndex((i) => (i + 1) % reviews.length)
				setFade(true) // Fade in new content
			}, 2000) // matches fade-out duration
		}, 4000)

		onCleanup(() => clearInterval(interval))
	})

	const current = () => reviews[index()]
	return (
		<div class="fade-in-out bg-soft-beige mx-auto flex min-h-[400px] w-full max-w-lg flex-col rounded-lg p-8 opacity-100 shadow-md">
			<div class={`transition-opacity duration-2000 ${fade() ? "opacity-100" : "opacity-0"}`}>
				<h3 class="font-prata mobile:text-2xl tablet:text-size-4 laptop:text-size-5 tablet:leading-8 laptop:leading-10 text-center text-lg font-semibold text-black">
					{current().title}
				</h3>
				<p class="font-tajawal mobile:text-lg tablet:text-size-2 laptop:text-size-3 text-justify text-base text-black">
					{current().quote}
				</p>
				<p class="font-tajawal mobile:text-lg tablet:text-xl text-center text-base text-black">
					{current().author}
				</p>
			</div>

			<div class="mt-auto flex justify-center gap-4 pt-6">
				<button onClick={() => setIndex((i) => (i - 1 + reviews.length) % reviews.length)}>
					Prev
				</button>
				<button onClick={() => setIndex((i) => (i + 1) % reviews.length)}>Next</button>
			</div>
		</div>
	)
}

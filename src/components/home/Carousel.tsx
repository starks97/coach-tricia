import { createSignal, onCleanup, onMount } from "solid-js"
import { Show } from "solid-js/web"

import type { Review } from "../../types"

import data from "../../data.json"

export default function Carousel() {
	const reviews: Review[] = data.home["user_pain_points"].reviews

	const [index, setIndex] = createSignal(0)
	const [fade, setFade] = createSignal(true)

	let interval: ReturnType<typeof setInterval>

	onMount(() => {
		interval = setInterval(() => {
			setFade(false) // Start fade out
			setTimeout(() => {
				setIndex((i) => (i + 1) % reviews.length)
				setFade(true) // Fade in new content
			}, 1000) // matches fade-out duration
		}, 3000)

		onCleanup(() => clearInterval(interval))
	})

	const current = () => reviews[index()]
	return (
		<div class="fade-in-out bg-soft-beige mx-auto flex h-auto w-full max-w-lg flex-col items-center justify-center gap-6 rounded-lg p-8 opacity-100 shadow-md">
			<div class={`transition-opacity duration-1000 ${fade() ? "opacity-100" : "opacity-0"}`}>
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

			<div class="mt-4 flex gap-4">
				<button onClick={() => setIndex((i) => (i - 1 + reviews.length) % reviews.length)}>
					Prev
				</button>
				<button onClick={() => setIndex((i) => (i + 1) % reviews.length)}>Next</button>
			</div>
		</div>
	)
}

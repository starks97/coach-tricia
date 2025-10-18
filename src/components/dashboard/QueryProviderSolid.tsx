// src/components/QueryProvider.tsx
import { QueryClientProvider } from "@tanstack/solid-query"

import { Suspense, lazy } from "solid-js"

import SectionWrapper from "./section/SectionWrapper.tsx"
import { createQueryClient } from "./QueryClient.tsx"

const queryClient = createQueryClient()

const LazyDevtools = lazy(async () => {
	if (import.meta.env.SSR || !import.meta.env.DEV) {
		// Return a no-op component for SSR or production
		return { default: () => null }
	}
	
	try {
		const { SolidQueryDevtools } = await import('@tanstack/solid-query-devtools')
		return { default: SolidQueryDevtools }
	} catch (error) {
		console.warn('Query devtools failed to load:', error)
		return { default: () => null }
	}
})


export default function QueryProviderSolid() {
	return (
		<QueryClientProvider client={queryClient}>
			<LazyDevtools />
			<Suspense fallback={<div>Loading...</div>}>
				<SectionWrapper />
			</Suspense>
		</QueryClientProvider>
	)
}

// src/components/QueryProvider.tsx
import { QueryClientProvider } from "@tanstack/solid-query"

import { Suspense } from "solid-js"
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools"

import SectionWrapper from "./section/SectionWrapper.tsx"
import { createQueryClient } from "./QueryClient.tsx"

const queryClient = createQueryClient()

export default function QueryProviderSolid() {
	return (
		<QueryClientProvider client={queryClient}>
			<SolidQueryDevtools />
			<Suspense fallback={<div>Loading...</div>}>
				<SectionWrapper />
			</Suspense>
		</QueryClientProvider>
	)
}

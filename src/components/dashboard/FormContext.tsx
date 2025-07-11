import { createForm } from "@modular-forms/solid"
import { createContext } from "solid-js"
import type { PageTypeMap } from "~/types"

export type FormContextType = {
	homeForm: ReturnType<typeof createForm<PageTypeMap["home"]>>
	coachingForm: ReturnType<typeof createForm<PageTypeMap["coaching"]>>
	contactForm: ReturnType<typeof createForm<PageTypeMap["contact"]>>
	seoForm: ReturnType<typeof createForm<PageTypeMap["seo"]>>
	aboutForm: ReturnType<typeof createForm<PageTypeMap["about"]>>
}

export const FormContext = createContext<FormContextType>()

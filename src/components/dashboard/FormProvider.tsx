import { FormContext, type FormContextType } from "./FormContext"
import { useContext, type ParentProps } from "solid-js"
import type { PageTypeMap } from "~/types"
import { createForm } from "@modular-forms/solid"

export function FormProvider(props: ParentProps) {
	const [_, homeForm] = createForm<PageTypeMap["home"]>({ initialValues: {} })
	const coachingForm = createForm<PageTypeMap["coaching"]>({ initialValues: {} })
	const contactForm = createForm<PageTypeMap["contact"]>({ initialValues: {} })
	const seoForm = createForm<PageTypeMap["seo"]>({ initialValues: {} })
	const aboutForm = createForm<PageTypeMap["about"]>({ initialValues: {} })

	// Valor del contexto que se proveerá
	const value: FormContextType = {
		homeForm,
		coachingForm,
		contactForm,
		seoForm,
		aboutForm,
	}

	return <FormContext.Provider value={value}>{props.children}</FormContext.Provider>
}

//custom hook to use the form context

export function useForm() {
	const context = useContext(FormContext)
	if (!context) {
		throw new Error("useFormContext must be used within a FormProvider")
	}
	return context
}

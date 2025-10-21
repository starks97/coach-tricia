import { useMutation, useQueryClient } from "@tanstack/solid-query"
import { updateSectionData } from "@lib/api/client/document/queries"
import type { PageTypeMap } from "@lib/db/types"
import { updateFormField } from "@utils/setDeepVal"

export function useFormMutation() {
	const queryClient = useQueryClient()

	return useMutation(() => ({
		mutationFn: async (variables: {
			id: string
			page: keyof PageTypeMap
			data: Record<string, any>
		}) => {
			const res = await updateSectionData(variables.id, variables.page, variables.data)
			if (!res) throw new Error("Failed to update data")
			return res.data!
		},

		onMutate: async (variables) => {
			await queryClient.cancelQueries({
				queryKey: ["page", variables.page],
			})

			const previousData = queryClient.getQueryData(["page", variables.page])

			// Update cache optimistically
			queryClient.setQueryData(["page", variables.page], (old: any) => {
				if (!old) return old
				const updated = { ...old }
				Object.entries(variables.data).forEach(([path, value]) => {
					updateFormField(updated, path, value)
				})
				return updated
			})

			return { previousData }
		},

		onError: (error, variables, context) => {
			console.error("Error updating data:", error)

			// Revert optimistic update
			/*if (context?.previousData) {
				queryClient.setQueryData(["page", variables.page], context.previousData)
			}*/
		},

		onSuccess: (data) => {
			console.log("Data updated successfully:", data)
		},
	}))
}

export default function CoachingForm() {
	const simpleSubmit = (event: Event) => {
		event.preventDefault()
		console.log("✅ SIMPLE FORM SUBMITTED!")
	}

	return (
		<div>
			{/* Formulario de prueba MUY simple */}
			<form onSubmit={simpleSubmit} class="mb-4 border border-red-500 p-4">
				<input type="text" value="test value" />
				<button type="submit">Test Simple Form</button>
			</form>
		</div>
	)
}

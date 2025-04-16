declare module "astro:actions" {
	type Actions = typeof import("/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/actions")["server"];

	export const actions: Actions;
}
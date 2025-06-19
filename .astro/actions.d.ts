declare module "astro:actions" {
	type Actions = typeof import("/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/actions/index.ts")["server"];

	export const actions: Actions;
}
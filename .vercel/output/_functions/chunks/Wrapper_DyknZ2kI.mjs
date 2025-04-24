import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, d as renderSlot, r as renderTemplate } from './astro/server_KiOKMxD_.mjs';

const $$Astro = createAstro();
const $$Wrapper = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Wrapper;
  const { class: customClass = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`tablet:p-10 laptop:p-14 mx-auto p-5 ${customClass}`, "class")} x-data="{ intersect: false }" x-intersect:enter="intersect = true" x-intersect:leave="intersect = false"> ${renderSlot($$result, $$slots["default"])} </section>`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/Wrapper.astro", void 0);

export { $$Wrapper as $ };

import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, d as renderSlot, r as renderTemplate } from './astro/server_KiOKMxD_.mjs';

const $$Astro = createAstro();
const $$CallToAction = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CallToAction;
  const { href, slot } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(slot, "slot")}${addAttribute(href, "href")} class="font-tajawal text-taupe mb-2 border-2 px-5 py-2.5 text-center text-xl font-extrabold tracking-[0.07em] uppercase">${renderSlot($$result, $$slots["default"])}</a>`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/CallToAction.astro", void 0);

export { $$CallToAction as $ };

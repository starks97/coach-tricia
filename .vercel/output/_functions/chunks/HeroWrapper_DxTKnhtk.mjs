import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, d as renderSlot, r as renderTemplate } from './astro/server_KiOKMxD_.mjs';

const $$Astro = createAstro();
const $$HeroWrapper = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HeroWrapper;
  const { img, class: customClass = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`section mx-auto my-10 w-full space-y-5`, "class")} x-data="{ intersect: false }" x-intersect:enter="intersect = true" x-intersect:leave="intersect = false"> <div${addAttribute(`mx-auto grid h-auto grid-cols-1 justify-items-center p-10`, "class")}> <div${addAttribute(`tablet:flex-row flex flex-col items-center justify-center space-x-0 gap-10 ${customClass}`, "class")}> <img${addAttribute(img, "src")} alt="hero image" class="tablet:h-[300px] tablet:w-[300px] laptop:h-[550px] laptop:w-[470px] h-64 w-full object-cover opacity-0" :class="intersect ? 'animate-fade animate-ease-in  animate-delay-100 ' : 'opacity-0'"> <div${addAttribute(`tablet:max-w-xl mx-auto w-full flex-1 items-center justify-center space-y-5 `, "class")}> ${renderSlot($$result, $$slots["default"])} </div> </div> </div> </section>`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/HeroWrapper.astro", void 0);

export { $$HeroWrapper as $ };

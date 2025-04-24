import { c as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_KiOKMxD_.mjs';
import { d as data, $ as $$Layout } from '../chunks/Layout_D_i44ZvS.mjs';
import { $ as $$CallToAction } from '../chunks/CallToAction_Bz830Fhy.mjs';
import { $ as $$Wrapper } from '../chunks/Wrapper_DyknZ2kI.mjs';
/* empty css                                 */
import { $ as $$HeroWrapper } from '../chunks/HeroWrapper_DxTKnhtk.mjs';
import { $ as $$ReplaceTarget } from '../chunks/ReplaceTarget_DN-xBlM3.mjs';
export { renderers } from '../renderers.mjs';

const $$AboutCourse = createComponent(($$result, $$props, $$slots) => {
  const aboutCourse = data["about"]["enough"];
  const paragraph = aboutCourse.about_course.split("\n\n");
  return renderTemplate`${renderComponent($$result, "Wrapper", $$Wrapper, { "class": "container mt-10 flex w-full flex-col items-center justify-center space-y-10 px-5" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="laptop:grid-cols-2 grid grid-cols-1 items-center justify-center justify-items-center gap-2"> <!-- Image Section --> <img src="/images/hero.jpg" alt="hero" class="laptop:h-[550px] laptop:w-[470px] object-coverp h-96 w-[400px]"> <!-- Text Section --> <div class="tablet:max-w-lg laptop:max-w-full w-full space-y-4 px-5"> <h3 class="font-prata tablet:text-[2.3rem] laptop:text-left text-justify text-[1.85rem] opacity-0" :class="intersect ? 'animate-fade-up animate-ease-in-out  animate-delay-100 ' : 'opacity-0'"> ${aboutCourse.title} </h3> ${paragraph.map((paragraph2) => renderTemplate`<p class="font-tajawal text-justify text-lg text-[16px] opacity-0" :class="intersect ? 'animate-fade animate-ease-in  animate-delay-300 ' : 'opacity-0'">${paragraph2}</p>`)} <div class="flex justify-center gap-5 opacity-0" :class="intersect ? 'animate-fade-up animate-ease-in  animate-delay-300 ' : 'opacity-0'"> ${renderComponent($$result2, "CallToAction", $$CallToAction, { "href": "/contact" }, { "default": ($$result3) => renderTemplate`Book a Consultation` })} </div> </div> </div> ` })}`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/about/AboutCourse.astro", void 0);

const $$Gallery = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex w-full flex-col gap-4"> <div class="tablet:flex-row flex w-full items-end gap-4"> <div class="tablet:w-1/3"> <img src="/images/coffee.jpg" alt="gallery image" class="tablet:h-[200px] laptop:h-[300px] w-full object-cover"> </div> <div class="tablet:w-3/6"> <img src="/images/travel.jpg" alt="gallery image" class="tablet:h-[300px] laptop:h-[400px] w-full object-cover"> </div> </div> <div class="w-5/6"> <img src="/images/beach.jpg" alt="gallery image" class="h-64 w-full object-cover"> </div> </div>`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/about/Gallery.astro", void 0);

const $$FunFacts = createComponent(($$result, $$props, $$slots) => {
  const funFacts = data["about"]["fun-facts"];
  return renderTemplate`${maybeRenderHead()}<div class="box mx-auto mt-20 h-auto p-10" x-data="{ intersect: false }" x-intersect:enter="intersect = true" x-intersect:leave="intersect = false" data-astro-cid-35rm572q> <div class="tablet:grid-cols-2 grid h-auto grid-cols-1 justify-center justify-items-center opacity-0" :class="intersect ? 'animate-fade-up animate-ease-in-out  animate-delay-400 ' : 'opacity-0'" data-astro-cid-35rm572q> <div class="justify-self-end" data-astro-cid-35rm572q> <h1 class="font-blackstone tablet:text-start text-size-7 tablet:text-size-6 laptop:text-[4rem] tablet:hidden text-taupe mb-10 w-full text-center font-bold" data-astro-cid-35rm572q>
fun facts about me!
</h1> ${renderComponent($$result, "Gallery", $$Gallery, { "data-astro-cid-35rm572q": true })} </div> <div class="mt-5 flex w-full flex-col" data-astro-cid-35rm572q> <h1 class="font-blackstone tablet:text-start text-size-6 tablet:text-size-6 laptop:text-[3.5rem] tablet:[display:flex] text-taupe mb-10 hidden w-full text-center font-bold" data-astro-cid-35rm572q>
fun facts about me!
</h1> <ul class="laptop:max-w-xl w-full space-y-10" data-astro-cid-35rm572q> ${funFacts.map((item, index) => renderTemplate`<div class="border-taupe flex flex-row items-center justify-center gap-5 border-b-2 last:border-0" data-astro-cid-35rm572q> <span class="text-size-7 font-prata w-2/12 font-bold text-[#e6dbd4]" data-astro-cid-35rm572q>
0${index + 1} </span> <li${addAttribute(index + 1, "value")} class="font-tajawal text-size-3 tablet:text-size-3 laptop:text-[22px] w-full text-start text-black" data-astro-cid-35rm572q> ${item.title} </li> </div>`)} </ul> </div> </div> </div> `;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/about/FunFacts.astro", void 0);

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const { title, description, image, paragraph } = data["about"].hero;
  return renderTemplate`${renderComponent($$result, "HeroWrapper", $$HeroWrapper, { "img": image, "class": "tablet:flex-row-reverse" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="font-blackstone tablet:text-left tablet:text-size-8 laptop:text-[4rem] text-light-rose text-center text-[3rem] font-light opacity-0" :class="intersect ? 'animate-fade-up animate-ease-in-out  animate-delay-200 ' : 'opacity-0'"> ${title} </h1> <h2 class="font-prata laptop:text-left tablet:text-size-5 laptop:text-size-6 text-justify text-[2rem] opacity-0" :class="intersect ? 'animate-fade-left animate-ease-in-out  animate-delay-300 ' : 'opacity-0'"> <i class="font-italic">${description}</i> </h2> <p class="font-tajawal tablet:text-left text-justify text-[20px] opacity-0" :class="intersect ? 'animate-fade-left animate-ease-in-out  animate-delay-300 ' : 'opacity-0'"> ${paragraph} </p> ` })}`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/about/Hero.astro", void 0);

const $$Story = createComponent(($$result, $$props, $$slots) => {
  const story = data["about"].story;
  return renderTemplate`${maybeRenderHead()}<section class="container mx-auto mt-10 px-5" x-data="{ intersect: false }" x-intersect:enter="intersect = true" x-intersect:leave="intersect = false"> <div class="laptop:grid-cols-2 laptop:grid-rows-2 grid h-full grid-cols-1 grid-rows-1 items-center justify-items-center gap-5"> <div> <img${addAttribute(story["first"].image, "src")} alt="hero" class="laptop:h-[450px] laptop:w-[400px] h-96 w-[400px] object-cover opacity-0" :class="intersect ? 'animate-fade-right animate-ease-in  animate-delay-200 ' : 'opacity-0'"> </div> <div class="tablet:max-w-lg w-full space-y-5 px-5"> <h1 class="font-prata laptop:text-left text-size-6 tablet:text-size-7 text-center opacity-0" :class="intersect ? 'animate-fade-left animate-ease-in  animate-delay-200 ' : 'opacity-0'"> <i class="font-italic">${story["first"].title}</i> </h1> <p class="font-tajawal text-size-2 text-justify text-[#515151] opacity-0" :class="intersect ? 'animate-fade animate-ease-in animate-delay-400 ' : 'opacity-0'"> ${renderComponent($$result, "ReplaceTarget", $$ReplaceTarget, { "target": "Conscious Uncoupling: 5 Steps to Living Happily Even After", "str": story["first"].content.first, "className": "font-bold" })} </p> <p class="font-tajawal text-size-2 text-justify text-[#515151] opacity-0" :class="intersect ? 'animate-fade animate-ease-in-out  animate-delay-400 ' : 'opacity-0'"> ${story["first"].content.second} </p> <p class="font-tajawal text-taupe text-size-2 text-justify font-bold tracking-widest uppercase opacity-0" :class="intersect ? 'animate-fade animate-ease-in-out  animate-delay-400 ' : 'opacity-0'"> ${story["first"].content.third} </p> </div> <div class="tablet:max-w-lg laptop:order-1 order-2 space-y-5 px-5"> <h1 class="font-tajawal text-taupe text-size-5 text-center font-normal uppercase"> ${story["second"].title} </h1> <h4 class="font-prata text-size-6 tablet:text-size-7 text-center"> <i class="font-italic text-justify">${story["second"].description}</i> </h4> <p class="font-tajawal tablet:text-left text-justify text-[16px] text-[#515151]"> ${story["second"].content} </p> </div> <div class="laptop:order-2 order-1"> <img${addAttribute(story["second"].image, "src")} alt="hero" class="laptop:h-[450px] laptop:w-[400px] h-96 w-[400px] object-cover" :class="intersect ? 'animate-fade-left animate-ease-in-out  animate-delay-400 ' : 'opacity-0'"> </div> </div> </section>`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/about/Story.astro", void 0);

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About | Tricia Rago Coaching", "description": "about tricia rago", "image": "example.jpg" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "Story", $$Story, {})} ${renderComponent($$result2, "FunFacts", $$FunFacts, {})} ${renderComponent($$result2, "AboutCourse", $$AboutCourse, {})} ` })}`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/pages/about.astro", void 0);

const $$file = "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$About,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

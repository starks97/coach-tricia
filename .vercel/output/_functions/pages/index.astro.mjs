import { c as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead, a as createAstro, b as addAttribute, d as renderSlot } from '../chunks/astro/server_KiOKMxD_.mjs';
import { d as data, a as $$Icon, $ as $$Layout } from '../chunks/Layout_D_i44ZvS.mjs';
import { $ as $$CallToAction } from '../chunks/CallToAction_Bz830Fhy.mjs';
import { $ as $$Wrapper } from '../chunks/Wrapper_DyknZ2kI.mjs';
import { ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { createSignal, onMount, onCleanup } from 'solid-js';
import { g as getPage, H as HomePageSchema } from '../chunks/home_BbGsPBpe.mjs';
export { renderers } from '../renderers.mjs';

const $$Benefits = createComponent(($$result, $$props, $$slots) => {
  const { title, benefits } = data.home["benefits"];
  return renderTemplate`${renderComponent($$result, "Wrapper", $$Wrapper, { "class": "container flex flex-col items-center justify-center space-y-10" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h3 class="font-prata text-taupe text-size-6 tablet:text-size-7 laptop:text-[3rem] tablet:w-8/12 w-full text-center leading-13 opacity-0" :class="intersect ? 'animate-fade-up  animate-delay-200 ' : 'opacity-0'"> ${title} </h3> <div class="tablet:grid-cols-[var(--grid-40-60)] grid grid-cols-1 items-center justify-center gap-5"> <img src="/images/hero.jpg" alt="hero" class="tablet:h-[400px] tablet:w-[300px] laptop:h-[400px] laptop:w-[400px] tablet:block hidden h-64 w-full object-cover"> <div class="border-btn_bg tablet:hidden w-full border-2 border-solid"></div> <div class="bg-cream tablet:h-[400px] tablet:p-2 laptop:h-[400px] laptop:p-7 flex h-full flex-col justify-center p-5"> <ul class="flex h-full list-none flex-col justify-evenly space-y-4"> ${benefits.map(
    (benefit, index) => renderTemplate`<li class="flex items-center gap-3"> <div class="flex h-[2em] items-center"> ${renderComponent($$result2, "Icon", $$Icon, { "icon": "check", "size": "2em", "color": "#e89faa" })} </div> <p class="font-tajawal text-dark-gray text-size-1 tablet:my-0 laptop:text-size-1 laptop:leading-6 my-2 leading-5 font-semibold tracking-[.156em] uppercase"> ${benefit} </p> </li>`
  )} </ul> </div> </div> <div class="my-5 flex justify-center opacity-0" :class="intersect ? 'animate-fade animate-delay-700 ' : 'opacity-0'"> ${renderComponent($$result2, "CallToAction", $$CallToAction, { "href": "/contact" }, { "default": ($$result3) => renderTemplate`Book Free Consultation` })} </div> ` })}`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/home/Benefits.astro", void 0);

const $$Astro$3 = createAstro();
const $$CoachingInfo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$CoachingInfo;
  const { title, subtitle, image, description } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Wrapper", $$Wrapper, { "class": "tablet:grid-cols-2 laptop:gap-5 grid grid-cols-1 items-center gap-11 bg-[#fbf4f2]" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="tablet:items-start mx-auto w-full max-w-lg space-y-5"> <h3 class="font-prata text-taupe text-size-6 tablet:text-left tablet:text-size-7 laptop:text-[3rem] text-center font-bold opacity-0" :class="intersect ? 'animate-fade-right  animate-delay-0 ' : 'opacity-0'"> ${title} </h3> <p class="font-tajawal tablet:text-left text-center leading-7 font-semibold tracking-[.156em] uppercase opacity-0" :class="intersect ? 'animate-fade  animate-delay-400 ' : 'opacity-0'"> ${subtitle} </p> <p class="font-tajawal text-justify text-lg opacity-0" :class="intersect ? 'animate-fade  animate-delay-400 ' : 'opacity-0'"> ${description} </p> <div class="tablet:justify-start flex justify-center"> ${renderComponent($$result2, "CallToAction", $$CallToAction, { "href": "/coaching" }, { "default": ($$result3) => renderTemplate`Learn More` })} </div> </div> <figure class="flex flex-col items-center justify-center px-5"> <img${addAttribute(image, "src")} alt="foots images" class="tablet:h-96 tablet:w-96 h-96 w-auto object-cover"> </figure> ` })}`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/home/CoachingInfo.astro", void 0);

const $$Astro$2 = createAstro();
const $$HomeHero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$HomeHero;
  const { image, class: customClass = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`grid w-full h-auto tablet:grid-cols-2 tablet:h-auto laptop:h-auto desktop:h-screen ${customClass}`, "class")} x-data="{ intersect: false }" x-intersect:enter="intersect = true" x-intersect:leave="intersect = false"> ${image && renderTemplate`<figure class="flex max-h-full w-full items-center justify-center opacity-0" :class="intersect ? 'animate-fade animate-ease-in animate-duration-1000 ' : 'opacity-0'"> <img${addAttribute(image, "src")} alt="Hero Image" class="h-full w-full object-cover object-top"> </figure>`} <div class="tablet:mt-0 tablet:w-full tablet:py-5 tablet:justify-center laptop:w-3/4 desktop:w-3/4 laptop:space-y-20 desktop:space-y-0 mt-5 flex w-full flex-col items-center justify-start space-y-2 text-left"> <div class="tablet:-translate-x-16 tablet:translate-y-10 tablet:items-start tablet:px-0 laptop:translate-y-20 desktop:translate-y-0 flex w-full -translate-y-0 flex-col items-center px-10"> ${renderSlot($$result, $$slots["title"])} ${renderSlot($$result, $$slots["subtitle"])} </div> <div class="tablet:px-10 my-10 flex w-full flex-col items-center gap-5 px-20 opacity-0" :class="intersect ? 'animate-fade-up animate-ease-in-out animate-duration-1000 animate-delay-700 ':'opacity-0'"> ${renderSlot($$result, $$slots["description"])} ${renderSlot($$result, $$slots["cta"])} </div> </div> </section>`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/HomeHero.astro", void 0);

const $$Astro$1 = createAstro();
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Hero;
  const { title, subtitle, description, image } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "HomeHero", $$HomeHero, { "image": image }, { "cta": ($$result2) => renderTemplate`${renderComponent($$result2, "CallToAction", $$CallToAction, { "href": "/about", "slot": "cta" }, { "default": ($$result3) => renderTemplate` About Me ` })}`, "description": ($$result2) => renderTemplate`${maybeRenderHead()}<h3 class="hero_description"> ${description} </h3>`, "subtitle": ($$result2) => renderTemplate`<h5 class="hero_subtitle opacity-0" :class="intersect ? 'animate-fade-left animate-ease-in-out  animate-delay-700 ' : 'opacity-0'"> ${subtitle} </h5>`, "title": ($$result2) => renderTemplate`<h1 class="hero_title opacity-0" :class="intersect ? 'animate-fade-left animate-ease-in-out  animate-delay-300 ' : 'opacity-0'"> ${title} </h1>` })}`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/home/Hero.astro", void 0);

var _tmpl$ = ["<div", ' class="fade-in-out bg-soft-beige mx-auto flex min-h-[400px] w-full max-w-lg flex-col rounded-lg p-8 opacity-100 shadow-md"><div class="', '"><h3 class="font-prata mobile:text-2xl tablet:text-size-4 laptop:text-size-5 tablet:leading-8 laptop:leading-10 text-center text-lg font-semibold text-black">', '</h3><p class="font-tajawal mobile:text-lg tablet:text-size-2 laptop:text-size-3 text-justify text-base text-black">', '</p><p class="font-tajawal mobile:text-lg tablet:text-xl text-center text-base text-black">', '</p></div><div class="mt-auto flex justify-center gap-4 pt-6"><button>Prev</button><button>Next</button></div></div>'];
function Carousel() {
  const reviews = data.home["user_pain_points"].reviews;
  const [index, setIndex] = createSignal(0);
  const [fade, setFade] = createSignal(true);
  let interval;
  onMount(() => {
    interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % reviews.length);
        setFade(true);
      }, 2e3);
    }, 4e3);
    onCleanup(() => clearInterval(interval));
  });
  const current = () => reviews[index()];
  return ssr(_tmpl$, ssrHydrationKey(), `transition-opacity duration-2000 ${fade() ? "opacity-100" : "opacity-0"}`, escape(current().title), escape(current().quote), escape(current().author));
}

const $$UserPainPoints = createComponent(($$result, $$props, $$slots) => {
  const { title, subtitle, pain_points } = data.home["user_pain_points"];
  return renderTemplate`${renderComponent($$result, "Wrapper", $$Wrapper, { "class": "bg-light-gray tablet:grid-cols-2 grid grid-cols-1 items-center gap-5" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="tablet:items-start mx-auto w-full max-w-lg space-y-7"> <h2 class="font-prata text-size-5 tablet:text-left tablet:text-[2rem] laptop:text-size-6 text-center text-black opacity-0" :class="intersect ? 'animate-fade-up animate-ease-in  ' : 'opacity-0'"> ${title} </h2> <h3 class="font-prata text-taupe tablet:text-3xl tablet:text-left text-center text-2xl opacity-0" :class="intersect ? 'animate-fade-left animate-ease-in  animate-delay-200 ' : 'opacity-0'"> ${subtitle} </h3> <ul class="flex flex-col space-y-2 opacity-0" :class="intersect ? 'animate-fade-left animate-ease-in  animate-delay-200 ' : 'opacity-0'"> ${pain_points.map((item) => renderTemplate`<li class="flex items-center gap-3"> <div class="flex h-[2em] items-center"> ${renderComponent($$result2, "Icon", $$Icon, { "icon": "x-mark", "size": "2em", "color": "#e89faa" })} </div> <span class="font-tajawal text-dark-gray text-size-1 tablet:my-2 laptop:my-4 my-2 leading-7 font-semibold tracking-[.156em] uppercase"> ${item} </span> </li>`)} </ul> </div> <aside class="tablet:justify-start flex justify-center"> ${renderComponent($$result2, "Carousel", Carousel, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/home/Carousel", "client:component-export": "default" })} </aside> ` })}`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/home/UserPainPoints.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const data = await getPage("home_page_id", "home", HomePageSchema);
  const heroPage = data.sections.hero;
  const coachingData = data.sections.coaching_info;
  Astro2.response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=3600");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Tricia Rago Coaching", "description": "hello to tricia coaching", "image": heroPage.image }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "Hero", $$Hero, { "image": heroPage.image, "description": heroPage.description, "title": heroPage.title, "subtitle": heroPage.subtitle })} ${renderComponent($$result2, "UserPainPoints", $$UserPainPoints, {})} ${renderComponent($$result2, "Benefits", $$Benefits, {})} ${renderComponent($$result2, "CoachingInfo", $$CoachingInfo, { "image": coachingData.image, "title": coachingData.title, "subtitle": coachingData.subtitle, "description": coachingData.description })} </main> ` })}`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/pages/index.astro", void 0);

const $$file = "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

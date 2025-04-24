import { c as createComponent, m as maybeRenderHead, f as renderComponent, r as renderTemplate, b as addAttribute } from '../chunks/astro/server_KiOKMxD_.mjs';
import { d as data, $ as $$Layout } from '../chunks/Layout_D_i44ZvS.mjs';
import { $ as $$CallToAction } from '../chunks/CallToAction_Bz830Fhy.mjs';
import { $ as $$HeroWrapper } from '../chunks/HeroWrapper_DxTKnhtk.mjs';
import { $ as $$ReplaceTarget } from '../chunks/ReplaceTarget_DN-xBlM3.mjs';
export { renderers } from '../renderers.mjs';

const $$Connect = createComponent(($$result, $$props, $$slots) => {
  const { title, description, subtitle } = data.coaching["connect"];
  return renderTemplate`${maybeRenderHead()}<section class="section mx-auto w-full space-y-10 bg-[#fbf4f2] p-10" x-data="{ intersect: false }" x-intersect:enter="intersect = true" x-intersect:leave="intersect = false"> <div class="h-auto w-full opacity-0" :class="intersect ? 'animate-fade-up animate-ease-in  animate-delay-200 ' : 'opacity-0'"> <h1 class="font-prata tablet:text-size-7 laptop:text-[3rem] text-size-5 w-full text-center leading-14 font-light">
Free Consultation
</h1> </div> <div class="mx-auto grid h-auto grid-cols-1 justify-items-center opacity-0" :class="intersect ? 'animate-fade-left animate-ease-in-out  animate-delay-400 ' : 'opacity-0'"> <div class="tablet:flex-row tablet:space-y-0 flex scale-100 flex-col items-center justify-center space-y-10"> <div class="tablet:max-w-sm tablet:translate-x-5 tablet:p-5 laptop:max-w-lg laptop:p-11 z-40 mx-auto flex w-full translate-x-0 flex-col space-y-3 bg-[#fcfdf8] p-10"> <h5 class="font-prata text-size-5 tablet:text-size-6 laptop:text-size-7 tablet:text-left text-center text-3xl"> ${title} </h5> <p class="font-tajawal text-light-rose tablet:text-size-5 laptop:text-3xl text-xl"> ${subtitle} </p> <span class="font-tajawal tablet:text-lg text-size-3"> ${description} </span> ${renderComponent($$result, "CallToAction", $$CallToAction, { "href": "/contact", "slot": "cta" }, { "default": ($$result2) => renderTemplate`30-minutes Free Consultation` })} </div> <img src="/images/girl.jpg" alt="hero image" class="tablet:h-[400px] tablet:w-[400px] tablet:-translate-x-5 laptop:h-[500px] laptop:w-[500px] h-64 w-full translate-x-0 object-cover"> </div> </div> </section>`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/coaching/Connect.astro", void 0);

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const { title, subtitle, image, description } = data.coaching["hero"];
  return renderTemplate`${renderComponent($$result, "HeroWrapper", $$HeroWrapper, { "img": image }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="font-blackstone tablet:text-left tablet:text-size-8 laptop:text-[4rem] text-light-rose text-center text-[3rem] font-light opacity-0" :class="intersect ? 'animate-fade-up animate-ease-in-out  animate-delay-200 ' : 'opacity-0'"> ${title} </h1> <h2 class="font-prata tablet:text-left text-size-6 tablet:text-size-5 laptop:text-size-6 text-center opacity-0" :class="intersect ? 'animate-fade-left animate-ease-in-out  animate-delay-300 ' : 'opacity-0'"> <i class="font-italic">${subtitle}</i> </h2> <p class="font-tajawal tablet:text-left laptop:text-2xl text-size-3 text-justify opacity-0" :class="intersect ? 'animate-fade-left animate-ease-in-out  animate-delay-300 ' : 'opacity-0'"> ${renderComponent($$result2, "ReplaceTarget", $$ReplaceTarget, { "target": "even", "str": description, "className": "font-tajawal text-light-rose font-bold" })} </p> ` })}`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/coaching/Hero.astro", void 0);

const $$PaymentPlan = createComponent(($$result, $$props, $$slots) => {
  const paymentPlan = data.coaching["payment_plan"];
  const heroImg = data.home["hero"].image;
  return renderTemplate`${maybeRenderHead()}<section class="section tablet:max-w-5xl mx-auto my-[7rem] h-auto w-full space-y-20 px-10" x-data="{ intersect: false }" x-intersect:enter="intersect = true" x-intersect:leave="intersect = false"> <div class="h-auto w-full space-y-5" :class="intersect ? 'animate-fade-up animate-ease-in  animate-delay-200 ' : 'opacity-0'"> <h1 class="font-tajawal text-light-rose tablet:text-2xl ml-4 w-full text-center text-xl leading-14 font-semibold">
Lets Work Together!
</h1> <h5 class="tablet:text-left; font-prata tablet:text-size-7 laptop:text-[3rem] text-size-5 text-center">
Choose Your Experience
</h5> </div> <div${addAttribute(`mx-auto grid h-auto grid-cols-1 justify-items-center gap-0 tablet:gap-10 `, "class")}> ${paymentPlan.map((item) => {
    let isPair = item.id % 2 === 0;
    return renderTemplate`<div${addAttribute(`tablet:flex-row flex flex-col items-stretch justify-center space-x-0 ${isPair ? "tablet:flex-row-reverse" : ""}`, "class")}> <img${addAttribute(heroImg, "src")} alt="hero image" class="tablet:h-full tablet:w-[342px] laptop:h-[500px] laptop:w-[470px] h-64 w-full object-cover"> <div${addAttribute(`tablet:p-15 w-full flex-1 p-7 ${isPair ? "bg-light-gray" : "bg-[#fbf4f2]"}`, "class")}> <div class="flex h-full w-full flex-col justify-center space-y-[10px]"> <h3 class="text-size-5 tablet:text-size-4 laptop:text-[30px] w-full text-center"> ${item.title} </h3> <p class="text-justify">${item.description}</p> <i class="text-size-3 text-center font-bold">Cost: ${item.price}</i> <div class="tablet:justify-center flex w-full justify-center gap-5"> ${renderComponent($$result, "CallToAction", $$CallToAction, { "href": "/contact" }, { "default": ($$result2) => renderTemplate`Enroll Now` })} </div> <p class="mt-2 text-center text-[13px] text-gray-600 italic">
*Individualized Payment Plan available upon request.
</p> </div> </div> </div>`;
  })} </div> </section>`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/coaching/PaymentPlan.astro", void 0);

const $$Steps = createComponent(($$result, $$props, $$slots) => {
  const guide = data.coaching["guide"];
  return renderTemplate`${maybeRenderHead()}<div class="section mx-auto w-full px-10" x-data="{ intersect: false }" x-intersect:enter="intersect = true" x-intersect:leave="intersect = false"> <!-- Section Title --> <div class="h-auto w-full space-y-5"> <h1 class="tablet:text-left; text-center font-prata text-size-7 text-light-rose tablet:text-size-7 laptop:text-size-8"> ${guide.title} </h1> <h5 class="ml-4 w-full text-center font-tajawal text-xl font-semibold leading-14 tablet:text-2xl"> ${guide.subtitle}<span class="font-bold text-light-rose">Even</span> After
</h5> </div> <div class="mx-auto w-full tablet:max-w-lg laptop:max-w-3xl opacity-0" :class="intersect ? 'animate-fade-up animate-ease-in-out  animate-delay-200 ' : 'opacity-0'"> <h5 class="text-justify font-tajawal text-size-2 font-thin leading-9 tablet:text-size-3"> ${guide.description} </h5> </div> <h3 class="text-center font-prata text-size-6 laptop:text-size-7 font-light leading-[4rem] mt-[4rem] w-full text-light-rose">Take a peek inside...</h3> <span class="hidden laptop:flex mx-auto max-w-5xl laptop:flex-col px-20 font-blackstone text-7xl laptop:-rotate-[25deg] laptop:-translate-y-32 laptop:-translate-x-20">the goods</span> <!-- Steps Grid --> <div class="grid h-auto grid-cols-1 justify-items-center"> ${guide.steps.map((item) => {
    const isPair = item.id % 2 === 0;
    return renderTemplate`<div${addAttribute(`flex flex-col px-0 tablet:px-5 laptop:px-10 items-center gap-2 tablet:flex-row ${isPair ? "tablet:flex-row-reverse" : ""}`, "class")} x-data="{ visible: false }" x-intersect:enter.once="visible = true" :class="{ 'opacity-100': visible }"${addAttribute(`${item.id}`, "id")}>  <div class="flex-1 space-y-2"${addAttribute(`${item.id}`, "id")}> <p${addAttribute(`w-full font-bonVivant text-[1.5rem] text-light-rose text-center tablet:text-left`, "class")}> ${`Step ${item.id}`} </p> <h3${addAttribute(`font-prata text-[18px] tablet:text-[20px] laptop:text-[22px] font-semibold text-center tablet:text-left`, "class")}> ${item.title} </h3> <p class="text-gray-700 text-[16px] tablet:text-[1.20rem] leading-[22px] laptop:text-size-2 tablet:max-w-sm text-justify font-tajawal tablet:text-left"> ${item.description} </p> </div>  <div class="z-10"> <div class="relative w-[300px] h-[300px] tablet:w-[350px] tablet:h-[350px] laptop:w-[450px] laptop:h-[450px] bg-[url('/images/tablet.png')] bg-contain bg-no-repeat"> <img${addAttribute(item.image, "src")} class="absolute w-[162px] h-[215px] top-[34px] left-[52px] tablet:w-[190px] tablet:h-[253px] tablet:top-[39px] tablet:left-[60px] laptop:top-[50px] laptop:right-[0px] laptop:left-[78px] laptop:w-[243px] laptop:h-[325px] object-cover rounded-md"> </div> </div> </div>
					<div class="border-terracotta border-[1px] border-hero_color2 mx-auto max-w-5xl w-full translate-y-0 tablet:-translate-y-[60px] laptop:-translate-y-[80px]"></div>`;
  })} </div> </div>`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/coaching/Steps.astro", void 0);

const $$Coaching = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Coaching | Tricia Rago Coaching", "description": "Coaching Tricia Rago", "image": "example.jpg" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "Steps", $$Steps, {})} ${renderComponent($$result2, "Connect", $$Connect, {})} ${renderComponent($$result2, "PaymentPlan", $$PaymentPlan, {})} </main> ` })}`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/pages/coaching.astro", void 0);

const $$file = "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/pages/coaching.astro";
const $$url = "/coaching";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Coaching,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

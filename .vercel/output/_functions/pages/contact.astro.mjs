import { c as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead, g as renderScript } from '../chunks/astro/server_KiOKMxD_.mjs';
import { d as data, $ as $$Layout } from '../chunks/Layout_D_i44ZvS.mjs';
import { $ as $$HeroWrapper } from '../chunks/HeroWrapper_DxTKnhtk.mjs';
export { renderers } from '../renderers.mjs';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const image = data["home"].coaching_info.image;
  const { title, description, subtitle } = data.contact["hero"];
  return renderTemplate`${renderComponent($$result, "HeroWrapper", $$HeroWrapper, { "img": image }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="font-blackstone tablet:text-left tablet:text-size-8 laptop:text-[6rem] text-light-rose text-center text-[3rem] font-light opacity-0" :class="intersect ? 'animate-fade-up animate-ease-in-out  animate-delay-200 ' : 'opacity-0'"> ${title} </h1> <h2 class="font-prata laptop:text-left tablet:text-size-5 laptop:text-size-6 text-justify text-[2rem] opacity-0" :class="intersect ? 'animate-fade-left animate-ease-in-out  animate-delay-300 ' : 'opacity-0'"> <i class="font-italic">${subtitle} </i> <p class="font-tajawal tablet:text-left text-justify text-[20px] opacity-0" :class="intersect ? 'animate-fade-left animate-ease-in-out  animate-delay-300 ' : 'opacity-0'"> ${description} </p> </h2> ` })}`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/contact/Hero.astro", void 0);

const $$Form = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<!-- This example is a static form. If you want to process the form on submission, you’ll need a server endpoint or a third-party service. -->${maybeRenderHead()}<form class="laptop:w-5/12 tablet:w-[400px] tablet:p-5 laptop:p-10 w-full rounded bg-zinc-100 p-5 shadow-md"> <div id="form-error"></div> <h2 class="tablet:text-size-5 laptop:text-size-6 font-prata mb-4 text-[23px] font-semibold">
Contact Me
</h2> <div class="mb-4"> <label for="name" class="font-tajawal text-size-4 mb-1 block font-medium">Name</label> <input type="text" id="name" name="name" required class="w-full rounded border border-gray-300 px-3 py-2" placeholder="Enter your first name"> </div> <div class="mb-4"> <label for="lastname" class="font-tajawal text-size-4 mb-1 block font-medium">Last Name</label> <input type="text" id="lastName" name="lastName" required class="w-full rounded border border-gray-300 px-3 py-2" placeholder="Enter your last name"> </div> <div class="mb-4"> <label for="email" class="font-tajawal text-size-4 mb-1 block font-medium">Email</label> <input type="email" id="email" name="email" required class="w-full rounded border border-gray-300 px-3 py-2" placeholder="Enter your email address"> </div> <div class="mb-4"> <label for="help" class="font-tajawal text-size-4 mb-1 block font-medium">How can I help you?</label> <textarea id="message" name="message" required class="h-24 w-full rounded border border-gray-300 px-3 py-2" placeholder="Sign up for your free consultation or
address any questions about enrollment"></textarea> </div> <button type="submit" class="font-tajawal text-taupe mb-2 w-full border-2 px-5 py-2.5 text-center text-xl font-extrabold tracking-[0.07em] uppercase">
Send a message
</button> </form> ${renderScript($$result, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/contact/Form.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/contact/Form.astro", void 0);

const $$ContactLayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="section mx-auto w-full space-y-10 p-10" x-data="{ intersect: false }" x-intersect:enter="intersect = true" x-intersect:leave="intersect = false"> <div class="mx-auto grid h-auto grid-cols-1 justify-items-center opacity-0" :class="intersect ? 'animate-fade-left animate-ease-in-out  animate-delay-400 ' : 'opacity-0'"> <div class="tablet:flex-row flex w-full flex-col items-center justify-center gap-10"> ${renderComponent($$result, "Form", $$Form, {})} <img src="/images/girl.jpg" alt="hero image" class="tablet:h-[400px] tablet:w-[400px] laptop:h-auto laptop:w-[500px] h-64 w-full object-cover"> </div> </div> </section>`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/contact/ContactLayout.astro", void 0);

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact | Tricia Rago Coaching", "description": "contact to Tricia Rago", "image": "example.jpg" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "ContactLayout", $$ContactLayout, {})} ` })}`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/pages/contact.astro", void 0);

const $$file = "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Contact,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

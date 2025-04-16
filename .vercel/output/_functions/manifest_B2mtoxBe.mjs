import { e as decodeKey } from './chunks/astro/server_BY7VTwKf.mjs';
import './chunks/astro-designed-error-pages_DGPa-Ohd.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_DzEQtshd.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/jeffersonespinoza/Desktop/projects/coach-tricia/","cacheDir":"file:///Users/jeffersonespinoza/Desktop/projects/coach-tricia/node_modules/.astro/","outDir":"file:///Users/jeffersonespinoza/Desktop/projects/coach-tricia/dist/","srcDir":"file:///Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/","publicDir":"file:///Users/jeffersonespinoza/Desktop/projects/coach-tricia/public/","buildClientDir":"file:///Users/jeffersonespinoza/Desktop/projects/coach-tricia/dist/client/","buildServerDir":"file:///Users/jeffersonespinoza/Desktop/projects/coach-tricia/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"coaching/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/coaching","isIndex":false,"type":"page","pattern":"^\\/coaching\\/?$","segments":[[{"content":"coaching","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/coaching.astro","pathname":"/coaching","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.7.0_@types+node@22.14.1_jiti@2.4.2_lightningcss@1.29.2_rollup@4.40.0_typescript@5.8.3_yaml@2.7.1/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_actions/[...path]","pattern":"^\\/_actions(?:\\/(.*?))?\\/?$","segments":[[{"content":"_actions","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"node_modules/.pnpm/astro@5.7.0_@types+node@22.14.1_jiti@2.4.2_lightningcss@1.29.2_rollup@4.40.0_typescript@5.8.3_yaml@2.7.1/node_modules/astro/dist/actions/runtime/route.js","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/pages/coaching.astro",{"propagation":"none","containsHead":true}],["/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.7.0_@types+node@22.14.1_jiti@2.4.2_lightningcss@1.29.2_rollup@4.40.0_typescript@5.8.3_yaml@2.7.1/node_modules/astro/dist/actions/runtime/route@_@js":"pages/_actions/_---path_.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000astro-internal:actions":"_astro-internal_actions.mjs","\u0000@astro-page:src/pages/coaching@_@astro":"pages/coaching.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.7.0_@types+node@22.14.1_jiti@2.4.2_lightningcss@1.29.2_rollup@4.40.0_typescript@5.8.3_yaml@2.7.1/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/jeffersonespinoza/Desktop/projects/coach-tricia/node_modules/.pnpm/astro@5.7.0_@types+node@22.14.1_jiti@2.4.2_lightningcss@1.29.2_rollup@4.40.0_typescript@5.8.3_yaml@2.7.1/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp__nIxJg1F.mjs","\u0000@astrojs-manifest":"manifest_B2mtoxBe.mjs","/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/contact/Form.astro?astro&type=script&index=0&lang.ts":"_astro/Form.astro_astro_type_script_index_0_lang.l0sNRNKZ.js","/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.DNk0oWyK.js","/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.BJmaYZpL.js","/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/home/Carousel":"_astro/Carousel.dhhNEQKo.js","@astrojs/solid-js/client.js":"_astro/client.D9VTLiZ4.js","astro:scripts/page.js":"_astro/page.BvKxy2Uc.js","/Users/jeffersonespinoza/Desktop/projects/coach-tricia/node_modules/.pnpm/astro@5.7.0_@types+node@22.14.1_jiti@2.4.2_lightningcss@1.29.2_rollup@4.40.0_typescript@5.8.3_yaml@2.7.1/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.BZs-2RF_.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/contact/Form.astro?astro&type=script&index=0&lang.ts",""],["/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.getElementById(\"menu\");e&&!e.classList.contains(\"hidden\")&&e.classList.add(\"hidden\")});"],["/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/Header.astro?astro&type=script&index=0&lang.ts","class i extends HTMLElement{constructor(){super(),this.appendChild(this.querySelector(\"template\").content.cloneNode(!0));const t=this.querySelector(\"button\"),n=document.getElementById(\"menu-content\");n.classList.add(\"hidden\");const s=e=>{t.setAttribute(\"aria-expanded\",e?\"true\":\"false\"),n.classList.toggle(\"hidden\",!e)};t.addEventListener(\"click\",()=>s(n.classList.contains(\"hidden\")));const d=e=>{s(e.matches),t.hidden=e.matches},c=window.matchMedia(\"(min-width: 50em)\");d(c),c.addEventListener(\"change\",d)}}customElements.define(\"menu-button\",i);"]],"assets":["/_astro/about.rrSIRFRf.css","/_astro/Carousel.dhhNEQKo.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.BZs-2RF_.js","/_astro/client.D9VTLiZ4.js","/_astro/page.BvKxy2Uc.js","/_astro/web.C60ncb2n.js","/fonts/BlackStone.otf","/fonts/BonVivant-Regular.ttf","/fonts/BonVivantSerif.ttf","/fonts/BonVivantSerifBold.ttf","/icons/facebook.svg","/icons/instagram.svg","/icons/linkedin.svg","/images/about-tricia.jpg","/images/about.jpg","/images/beach.jpg","/images/coach_hero.jpg","/images/coaching.jpg","/images/coffee.jpg","/images/girl.jpg","/images/hero.jpg","/images/hero_podcast.jpg","/images/hero_podcast2.jpg","/images/home.jpg","/images/ipad.png","/images/step1.jpg","/images/step2.jpg","/images/step3.jpg","/images/step4.jpg","/images/story1.jpg","/images/story2.jpg","/images/tablet.png","/images/testimonial.jpg","/images/travel.jpg","/images/tricia-hero.webp","/images/tricia-hero2.webp","/images/tricia-hero3.webp","/images/tricia.webp","/_astro/page.BvKxy2Uc.js","/about/index.html","/coaching/index.html","/contact/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"qQSY7Uz7h8W49J2FNdnhid0/vYc7A6HmReT+steLhUA="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };

import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CpnDoEEh.mjs';
import { manifest } from './manifest_DqCH2Av1.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/page.astro.mjs');
const _page4 = () => import('./pages/coaching.astro.mjs');
const _page5 = () => import('./pages/contact.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.7.5_@types+node@22.14.1_jiti@2.4.2_lightningcss@1.29.2_rollup@4.40.0_typescript@5.8.3_yaml@2.7.1/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/.pnpm/astro@5.7.5_@types+node@22.14.1_jiti@2.4.2_lightningcss@1.29.2_rollup@4.40.0_typescript@5.8.3_yaml@2.7.1/node_modules/astro/dist/actions/runtime/route.js", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/page.ts", _page3],
    ["src/pages/coaching.astro", _page4],
    ["src/pages/contact.astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_astro-internal_actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "8477d206-77b5-4e31-a1b4-b720c0895529",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };

import { c as createComponent, a as createAstro, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_KiOKMxD_.mjs';

const $$Astro = createAstro();
const $$ReplaceTarget = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ReplaceTarget;
  const { target, str, className } = Astro2.props;
  const replaceTarget = ({ target: target2, str: str2, className: className2 }) => {
    let pattern = new RegExp(target2, "g");
    return str2.replace(pattern, `<b class="${className2}">${target2}</b>`);
  };
  const newText = replaceTarget({ target, str, className });
  return renderTemplate`${maybeRenderHead()}<i>${unescapeHTML(newText)}</i>`;
}, "/Users/jeffersonespinoza/Desktop/projects/coach-tricia/src/components/ReplaceTarget.astro", void 0);

export { $$ReplaceTarget as $ };

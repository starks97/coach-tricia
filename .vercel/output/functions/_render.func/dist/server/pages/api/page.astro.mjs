import { H as HomePageSchema, g as getPage } from '../../chunks/home_BbGsPBpe.mjs';
export { renderers } from '../../renderers.mjs';

function defineSchemaRouter(config) {
  return {
    schema: config.schema,
    collection: config.collection,
    schemaType: void 0
  };
}
const schemaRouter = {
  home: defineSchemaRouter({ schema: HomePageSchema, collection: "home" })
};

const GET = async ({ request }) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const page = searchParams.get("page");
    if (!id || !page || typeof page !== "string" || !(page in schemaRouter)) {
      return new Response("Bad Request", { status: 400 });
    }
    const route = schemaRouter[page];
    if (!route) {
      return new Response("Page not found", { status: 404 });
    }
    const result = await getPage(id, route.collection, route.schema);
    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

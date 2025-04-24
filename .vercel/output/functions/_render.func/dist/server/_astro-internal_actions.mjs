import './chunks/astro/server_KiOKMxD_.mjs';
import { g as getActionQueryString, a as astroCalledServerError, A as ActionError, d as deserializeActionResult, b as ACTION_QUERY_PARAMS, c as appendForwardSlash } from './chunks/astro-designed-error-pages_C8vUmduy.mjs';
import * as z from 'zod';
import { createTransport } from 'nodemailer';
import { R as RESEND_API_KEY } from './chunks/server_B9RNWQyC.mjs';
import { d as defineAction } from './chunks/server_CH2xrBx5.mjs';

const apiContextRoutesSymbol = Symbol.for("context.routes");
const ENCODED_DOT = "%2E";
function toActionProxy(actionCallback = {}, aggregatedPath = "") {
  return new Proxy(actionCallback, {
    get(target, objKey) {
      if (objKey in target || typeof objKey === "symbol") {
        return target[objKey];
      }
      const path = aggregatedPath + encodeURIComponent(objKey.toString()).replaceAll(".", ENCODED_DOT);
      function action(param) {
        return handleAction(param, path, this);
      }
      Object.assign(action, {
        queryString: getActionQueryString(path),
        toString: () => action.queryString,
        // Progressive enhancement info for React.
        $$FORM_ACTION: function() {
          const searchParams = new URLSearchParams(action.toString());
          return {
            method: "POST",
            // `name` creates a hidden input.
            // It's unused by Astro, but we can't turn this off.
            // At least use a name that won't conflict with a user's formData.
            name: "_astroAction",
            action: "?" + searchParams.toString()
          };
        },
        // Note: `orThrow` does not have progressive enhancement info.
        // If you want to throw exceptions,
        //  you must handle those exceptions with client JS.
        async orThrow(param) {
          const { data, error } = await handleAction(param, path, this);
          if (error) throw error;
          return data;
        }
      });
      return toActionProxy(action, path + ".");
    }
  });
}
function getActionPath(action) {
  let path = `${"/".replace(/\/$/, "")}/_actions/${new URLSearchParams(action.toString()).get(ACTION_QUERY_PARAMS.actionName)}`;
  {
    path = appendForwardSlash(path);
  }
  return path;
}
async function handleAction(param, path, context) {
  if (context) {
    const pipeline = Reflect.get(context, apiContextRoutesSymbol);
    if (!pipeline) {
      throw astroCalledServerError();
    }
    const action = await pipeline.getAction(path);
    if (!action) throw new Error(`Action not found: ${path}`);
    return action.bind(context)(param);
  }
  const headers = new Headers();
  headers.set("Accept", "application/json");
  let body = param;
  if (!(body instanceof FormData)) {
    try {
      body = JSON.stringify(param);
    } catch (e) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: `Failed to serialize request body to JSON. Full error: ${e.message}`
      });
    }
    if (body) {
      headers.set("Content-Type", "application/json");
    } else {
      headers.set("Content-Length", "0");
    }
  }
  const rawResult = await fetch(
    getActionPath({
      toString() {
        return getActionQueryString(path);
      }
    }),
    {
      method: "POST",
      body,
      headers
    }
  );
  if (rawResult.status === 204) {
    return deserializeActionResult({ type: "empty", status: 204 });
  }
  return deserializeActionResult({
    type: rawResult.ok ? "data" : "error",
    body: await rawResult.text()
  });
}
toActionProxy();

async function sendEmail(options) {
  const transporter = await getEmailTransporter();
  return new Promise(async (resolve, reject) => {
    const { to, subject, html, from } = options;
    const message = {
      from,
      to,
      subject,
      html
    };
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
}
async function getEmailTransporter() {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Promise((resolve, reject) => {
    const transporter = createTransport({
      host: "smtp.resend.com",
      secure: true,
      port: 465,
      auth: { user: "resend", pass: RESEND_API_KEY }
    });
    resolve(transporter);
  });
}

const server = {
  sendEmail: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(2).max(100),
      lastName: z.string().min(2).max(100),
      email: z.string().email(),
      message: z.string().min(10).max(500)
    }),
    handler: async (input, context) => {
      console.log("Received input:", input);
      try {
        const html = `<p>Name: ${input.name}</p><p>Last Name: ${input.lastName}</p><p>Email: ${input.email}</p><p>Message: ${input.message}</p>`;
        await sendEmail({
          to: "cazcodavid@gmail.com",
          subject: "New message from your website",
          from: input.email,
          html
        });
        console.log("Email sent successfully!");
      } catch (error) {
        console.error("Error while sending email:", error);
      }
    }
  })
};

export { server };

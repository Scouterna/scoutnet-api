import type {
  Client,
  ClientOptions as OpenApiClientOptions,
} from "openapi-fetch";
import openApiCreateClient from "openapi-fetch";

import type { paths } from "./generated/api-types.js";

export type APICredentials = {
  resourceId: number | string;
  key: string;
};

export type ClientOptions = OpenApiClientOptions;

export type ScoutnetClient = Client<paths, `application/json`>;

export const createClient = ({
  baseUrl = "https://scoutnet.se/api",
  ...clientOptions
}: ClientOptions): ScoutnetClient => {
  const client = openApiCreateClient<paths>({
    baseUrl,
    ...clientOptions,
  });

  client.use({
    async onResponse({ response }) {
      console.log('res', response.ok, response.headers.get('content-length'))
      // Scoutnet returns an empty body on for example 401 errors. This causes
      // openapi-fetch to return the error as `undefined` which is hard to
      // handle. To work around this, we check if the response is not ok and has
      // an empty body, and if so, we return an empty JSON object instead.
      if (!response.ok && response.headers.get("content-length") === "0") {
        const body = "{}";
        const headers = new Headers(response.headers);
        headers.set("content-length", String(body.length));
        return new Response(body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      }
    },
  });

  return client;
};

const base64encode = (data: string) => btoa(data);

/**
 * Creates an authorization header for the Scoutnet API.
 */
export const createAuthorizationHeader = ({
  resourceId,
  key: token,
}: APICredentials) => {
  const authString = `${resourceId}:${token}`;
  const encoded = base64encode(authString);
  return `Basic ${encoded}`;
};

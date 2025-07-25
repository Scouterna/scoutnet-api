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

  return client;
};

const base64encode = (data: string) => {
  if (typeof window === "undefined") {
    return Buffer.from(data).toString("base64");
  }

  return window.btoa(data);
};

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

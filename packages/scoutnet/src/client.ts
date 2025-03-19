import type { ClientOptions as OpenApiClientOptions } from "openapi-fetch";
import openApiCreateClient from "openapi-fetch";

import type { paths } from "./generated/api-types.js";

export type APICredentials = {
  resourceId: number | string;
  key: string;
};

export type ClientOptions = OpenApiClientOptions;

export const createClient = ({
  baseUrl = "https://scoutnet.se/api",
  ...clientOptions
}: ClientOptions) => {
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

export const createAuthorizationHeader = ({
  resourceId,
  key: token,
}: APICredentials) => {
  const authString = `${resourceId}:${token}`;
  const encoded = base64encode(authString);
  return `Basic ${encoded}`;
};

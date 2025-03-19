import { createAuthorizationHeader, createClient } from "@scouterna/scoutnet";

if (!process.env.LIST_BODIES_ID) throw new Error("Missing LIST_BODIES_ID");
if (!process.env.LIST_BODIES_KEY) throw new Error("Missing LIST_BODIES_KEY");

// const listBodiesClient = createClient({
//   baseUrl: 'https://scoutnet.se/api',
//   apiCredentials: {
//     resourceId: process.env.LIST_BODIES_ID,
//     key: process.env.LIST_BODIES_KEY
//   }
// })

// const { error, data } = await listBodiesClient.GET('/body_key_list')

// if (error) {
//   console.error('Error fetching body key list', error)
//   throw new Error('Error fetching body key list')
// }

// console.log(data)

const client = createClient({
  // baseUrl: "https://scoutnet.se/api",
});

const result = await client.GET("/project/get/participants", {
  headers: {
    Authorization: createAuthorizationHeader({
      resourceId: process.env.LIST_BODIES_ID,
      key: process.env.LIST_BODIES_KEY,
    }),
  },
});

if ("error" in result) {
  console.error("Error fetching body key list", result.error);
  throw new Error("Error fetching body key list");
}

console.log(result.data);

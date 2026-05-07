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
  baseUrl: "https://s1.test.custard.no/api",
});

// const result = await client.GET("/project/get/participants", {
//   headers: {
//     Authorization: createAuthorizationHeader({
//       resourceId: process.env.LIST_BODIES_ID,
//       key: process.env.LIST_BODIES_KEY,
//     }),
//   },
// });

// console.log(result);

// if (result.error) {
//   console.error("Error fetching body key list", result.error);
//   throw new Error("Error fetching body key list");
// }

// console.log(result.data);

// const result = await client.POST("/organisation/register/member", {
//   headers: {
//     Authorization: createAuthorizationHeader({
//       resourceId: process.env.REGISTER_MEMBER_ID,
//       key: process.env.REGISTER_MEMBER_KEY,
//     }),
//   },
//   body: {
//     profile: {
//       first_name: "Test",
//       last_name: "Testsson",
//       ssno: "9901",
//       sex: 0,
//       date_of_birth: "1890-01-01"
//     }
//   }
// });

// console.log(result);

// if (result.error) {
//   console.error("Error registering member", result.error);
//   throw new Error("Error registering member");
// }

// console.log(result.data);


// const result = await client.POST("/organisation/update/membership", {
//   headers: {
//     Authorization: createAuthorizationHeader({
//       resourceId: process.env.UPDATE_MEMBERSHIP_ID,
//       key: process.env.UPDATE_MEMBERSHIP_KEY,
//     }),
//   },
//   body: {
//     3438640: {
//       status: 'cancelled'
//     }
//   }
// });

// console.log(result);

// if (result.error) {
//   console.error("Error updating membership", result.error);
//   throw new Error("Error updating membership");
// }

// console.log(result.data);



// const result = await client.GET("/organisation/group", {
//   headers: {
//     Authorization: createAuthorizationHeader({
//       resourceId: process.env.GET_GROUP_ID,
//       key: process.env.GET_GROUP_KEY,
//     }),
//   }
// });

// console.log(result);

// if (result.error) {
//   console.error("Error fetching group information", result.error);
//   throw new Error("Error fetching group information");
// }

// console.log(result.data);




const result = await client.GET("/group/memberlist", {
  headers: {
    Authorization: createAuthorizationHeader({
      resourceId: process.env.GET_GROUP_MEMBERLIST_ID,
      key: process.env.GET_GROUP_MEMBERLIST_KEY,
    }),
  }
});

console.log(result);

if (result.error) {
  console.error("Error fetching group member list", result.error);
  throw new Error("Error fetching group member list");
}

console.log(result.data);



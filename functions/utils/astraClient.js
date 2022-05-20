const { createClient } = require("@astrajs/collections");

let astraClient = null;

const getAstraClient = async () => {
  if (astraClient === null) {
    astraClient = await createClient(
      {
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
        baseUrl: 'https://4f4b2e1a-960b-40a7-a7b1-4a2aa91f4383-asia-south1.apps.astra.datastax.com'
      },
      30000
    );
  }
  return astraClient;
};

// const userCollection = async () => {
//   const documentClient = await getAstraClient();
//   return documentClient
//     .namespace(process.env.ASTRA_DB_KEYSPACE)
//     .collection("users");
// };

const postsCollection = async () => {
  const documentClient = await getAstraClient();
  return documentClient
    .namespace(process.env.ASTRA_DB_KEYSPACE)
    .collection("posts");
};

// const postsPageSize = async (pageSize, pageState) => {
//   // a = '1';
//   // b= 'JDUwZTY5ZmQ3LWIzNDAtNDBmMS1hMDhjLWI4N2QzZjRmYjJkNwDwf_____B_____'
//   const documentClient = await getAstraClient();
//   if(pageState == "" || pageState == null){
//     return documentClient
//     .namespace(process.env.ASTRA_DB_KEYSPACE)
//     .collection("posts?page-size=" + pageSize)
//   } else {
//     return documentClient
//     .namespace(process.env.ASTRA_DB_KEYSPACE)
//     .collection("posts?page-size=" + pageSize + "&page-state=" + pageState)
//   }
//     // .collection("posts?page-size=2&page-state=JGRjNWEzODAxLWQ5M2MtNDRkYi05OTkyLWYzMjY3ZTY5OWJkYgDwf_____B_____")
//     // .url("/api/rest/v2/namespaces/foodies/collections/posts?page-size=1");
// };

module.exports = { getAstraClient, postsCollection };

// const faker = require("faker");
const { postsCollection } = require("./utils/astraClient");

let id = "00000000-0000-0000-0000-000000000001"

// let body = {
//   name: "nooras",
//   username:"noousername2",
//   email:"email@abcd.com",
//   password:"abcd",
//   bio:"avcc",
// }

exports.handler = async function (event) {
  const posts = await postsCollection();
  
  try {
    const post = await posts.delete("a2105512-0264-4120-bb39-5d62270a3e3a");
    return {
      statusCode: 200,
      body: JSON.stringify(post.data),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};

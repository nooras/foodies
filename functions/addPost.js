const faker = require("faker");
const { postsCollection } = require("./utils/astraClient");

let id = faker.random.uuid();
// let id = "00000000-0000-0000-0000-000000000001";

exports.handler = async function (event) {
  const posts = await postsCollection();
  const body = JSON.parse(event.body);
  
  try {
    const user = await posts.create(id, body.data);
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};

const faker = require("faker");
const { userCollection } = require("./utils/astraClient");

// let id = "00000000-0000-0000-0000-000000005501"
let id = faker.random.uuid();
// let body = {
//   name: "noorasx",
//   username:"noousername2x",
//   email:"email@abcd.comx",
//   password:"abcdx",
//   bio:"avccx",
// }
console.log(id)
exports.handler = async function (event) {
  const users = await userCollection();
  
  try {
    const user = await users.create(id, event.body);
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

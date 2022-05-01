// const faker = require("faker");
const { userCollection } = require("./utils/astraClient");

let id = "00000000-0000-0000-0000-000000000001"

// let body = {
//   name: "nooras",
//   username:"noousername2",
//   email:"email@abcd.com",
//   password:"abcd",
//   bio:"avcc",
// }

exports.handler = async function (event) {
  const users = await userCollection();
  
  try {
    const user = await users.delete("00000000-0000-0000-0000-000000000001");
    return {
      statusCode: 200,
      body: JSON.stringify(user.data),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};

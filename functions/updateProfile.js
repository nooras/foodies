const { userCollection } = require("./utils/astraClient");

exports.handler = async function (event) {
  const users = await userCollection();
  const body = JSON.parse(event.body);

  try {
    const updateUser = users.update(body.id, body.data);
    return {
      statusCode: 200,
      body: JSON.stringify(updateUser),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};

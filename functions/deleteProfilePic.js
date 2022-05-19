const { userCollection } = require("./utils/astraClient");

exports.handler = async function (event) {
  const users = await userCollection();
  const body = JSON.parse(event.body);
  data = {
    profilePicUrl: ""
  }

  try {
    const updateUser = users.update(body.id, data);
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

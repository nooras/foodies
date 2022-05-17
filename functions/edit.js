const { postsCollection } = require("./utils/astraClient");

exports.handler = async function (event) {
  const users = await postsCollection();
  const d = new Date();
  let time = d.toLocaleString();
  const body = {
    username: "noousername",
  }

  try {
    users.update("73b506f2-626e-4849-9b65-ac279e134407", body);
    return {
      statusCode: 200,
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};

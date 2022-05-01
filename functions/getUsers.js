const { userCollection } = require("./utils/astraClient");

exports.handler = async function () {
  const users = await userCollection();
  try {
    const res = await users.find({});
    const posts = res.data;
    return {
      statusCode: 200,
      body: JSON.stringify(posts),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};

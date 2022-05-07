const { postsCollection } = require("./utils/astraClient");

exports.handler = async function () {
  const allPosts = await postsCollection();
  try {
    const res = await allPosts.find({});
    const posts = res.data;
    return {
      statusCode: 200,
      body: JSON.stringify(posts),
      // body: JSON.stringify(Object.keys(posts).map((i) => posts[i] )),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};

const { postsPageSize } = require("./utils/astraClient");

exports.handler = async function (event) {

  // const body = JSON.parse(event.body)
  // console.log(event)
  const body = JSON.parse(event.body);
  // const body = {
  //   pageSize: '1',
  //   pageState: 'JGRjNWEzODAxLWQ5M2MtNDRkYi05OTkyLWYzMjY3ZTY5OWJkYgDwf_____B_____'
  // }
  const allPosts = await postsPageSize(body.pageSize, body.pageState);
  console.log(allPosts , "In getPostPageSize")
  try {
    const res = await allPosts.find({});
    const posts = {
     data: res.data,
     pageState: res.pageState,
    };
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

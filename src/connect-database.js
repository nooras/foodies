// const { Client } = require("cassandra-driver");

// async function run() {
//     const client = new Client({
//       cloud: {
//         secureConnectBundle: "<<PATH/TO/>>secure-connect-mydb.zip",
//       },
//       credentials: {
//         username: "<<CLIENT ID>>",
//         password: "<<CLIENT SECRET>>",
//       },
//     });
  
//     await client.connect();
  
//     // Execute a query
//     const rs = await client.execute("SELECT * FROM system.local");
//     console.log(`Your cluster returned ${rs.rowLength} row(s)`);
  
//     await client.shutdown();
//   }
  
//   // Run the async function
//   run();
// import {connect} from "../db/db-connection";
// import {app} from "../app";
// import * as http from "http";
// import {startApolloServer} from "../graphql";
//
// const port = 3001;
//
// const init = async () => {
//     await connect();
//     const httpServer = http.createServer();
//     await startApolloServer(httpServer, app);
//     httpServer.on('request', app);
//     await httpServer.listen(port, () => console.log(`server running in port ${port}`));
// }
//
// init();

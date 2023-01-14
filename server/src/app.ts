import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {connect} from "./db/db-connection";
import * as http from "http";
import {startApolloServer} from "./graphql";

export const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = 3001;

const init = async () => {
    await connect();
    const httpServer = http.createServer();
    await startApolloServer(httpServer, app);
    httpServer.on('request', app);
    await httpServer.listen(port, () => console.log(`server running in port ${port}`));
}

init();
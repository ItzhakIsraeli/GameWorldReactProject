import {PubSub} from "graphql-subscriptions";
import { Server } from "http";
import {Express} from "express";
import {ApolloServer} from "apollo-server-express";
import {typeDefs} from "./schema/schema";
import {resolvers} from "./resolvers/resolver";
import {createUserCart, releaseUserCart} from "./cart";

export const pubsub = new PubSub();


export const startApolloServer = async (httpServer: Server, app: Express): Promise<ApolloServer> => {
    const apolloServer = new ApolloServer({
        typeDefs,
        // resolvers,
        context: async ({req, connection}) => {
            if (connection) {
                return connection.context
            }
            if (req.headers["id_token"]) {
                return {userId: req.headers["id_token"]};
            }
        },
        subscriptions: {
            onConnect: (connectionParams, webSocket) => {
                if (hasIdToken(connectionParams)) {
                    const userId = connectionParams.id_token;
                    createUserCart(userId);
                    return {userId};
                }
                throw new Error(" user without id_token tries to open connection");
            },
            onDisconnect: (websocket, context) => {
                context.initPromise?.then(value => {
                    const cartUpdate = releaseUserCart(value.userId);
                    pubsub.publish("CART_UPDATE", {cartUpdate});
                }).catch(error => console.log(`Error in Promise ${error}`))
            },
        },
        playground: {
            subscriptionEndpoint: `/graphql`,
            settings: {
                "request.credentials": "include",
            }
        }
        // context: async (ctx: any, msg: any, args: any) => {
        //     return getDynamicContext(ctx, msg, args);
        // },

    });
    await apolloServer.start();
    apolloServer.applyMiddleware({app});
    apolloServer.installSubscriptionHandlers(httpServer);
    return apolloServer;

}

const hasIdToken = (object: Object): object is Object & {id_token: string} =>
    object.hasOwnProperty("id_token");

// const getDynamicContext = async (ctx: any, msg: any, args: any) => {
//     // ctx is the graphql-ws Context where connectionParams live
//     if (ctx.connectionParams.authentication) {
//         // const currentUser = await findUser(ctx.connectionParams.authentication);
//         // change
//         return { currentUser: 1 };
//     }
//     // Otherwise let our resolvers know we don't have a current user
//     return { currentUser: null };
// };

import {PubSub} from "graphql-subscriptions";
import {Server} from "http";
import {Express} from "express";
import {ApolloServer} from "apollo-server-express";
import {typeDefs} from "./schema/schema";
import {resolvers} from "./resolvers/resolver";
import {createUserCart, releaseUserCart} from "./cart";

export const pubsub = new PubSub();

export const startApolloServer = async (httpServer: Server, app: Express): Promise<ApolloServer> => {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({res, req, connection}) => {
            if (connection) {
                return connection.context
            }
        },
        subscriptions: {
            onConnect: (connectionParams: any, webSocket, context) => {
                if (connectionParams?.userId) {
                    const userId = connectionParams.userId;
                    createUserCart(userId);
                    return {userId};
                } else {
                    createUserCart("GraphqlUser");
                }
            },
            onDisconnect: (websocket, context) => {
                context.initPromise?.then(value => {
                    const cartUpdate = releaseUserCart(value.userId);
                    pubsub.publish("CART_UPDATE", {cartUpdate});
                }).catch(error => console.log(`Error in Promise ${error}`));
            },
        },
        playground: {
            subscriptionEndpoint: `/graphql`,
            settings: {
                "request.credentials": "include",
            }
        }

    });
    await apolloServer.start();
    apolloServer.applyMiddleware({app});
    apolloServer.installSubscriptionHandlers(httpServer);
    return apolloServer;

}
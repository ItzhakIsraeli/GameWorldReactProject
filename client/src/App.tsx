import React from 'react';
import Main from "./Main/Main";
import {ApolloClient, HttpLink, InMemoryCache, split} from "@apollo/client";
import {getMainDefinition} from "@apollo/client/utilities";
import {typeDefs} from "./GraphQl/Schema";
import {WebSocketLink} from "@apollo/client/link/ws";
import {ApolloProvider} from "@apollo/react-hooks";

const httpLink = new HttpLink({
    uri: 'http://localhost:3001/graphql'
});

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:3001/graphql',
    options: {
        reconnect: true
    }
})

const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

export const client = new ApolloClient({
    // uri: 'http://localhost:3001/graphql',
    typeDefs: typeDefs,
    link: splitLink,
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Main/>
        </ApolloProvider>
    );
}

export default App;

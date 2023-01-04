import {gql} from "apollo-server-express";

export const typeDefs = gql`
    type Product {
        id: ID!
        name: String!
        description: String!
        price: Int!
        image: String!
        market: String!
        limit: Int
    }
    type Order {
        firstName: String,
        lastName: String,
        phone: String,
        products: [CartProduct]
    }
    type CartProduct {
        id: ID!
        amount: Int!
    }
    type CartUpdate {
        user: String!
        cartProducts: [CartProduct]!
    }
    type Query {
        getProducts: [Product]
        getProduct(id: ID): Product
    }
    input AddProductInput {
        name: String!
        description: String!
        price: Int!
        image: String!
        image2: String!
        market: String!
        limit: Int    
    }
    input UpdateProductInput {
        name: String
        description: String
        price: Int
        image: String
        image2: String
        market: String
        limit: Int    
    }
    type Mutation {
        addProduct(body: AddProductInput!): Product
        removeProduct(id: ID!): Product
        updateProduct(productId: ID!, body: UpdateProductInput!): Product
        updateCart(productId: ID!, amount: Int!): CartProduct
        checkout: [Product]
    }
    type Subscription {
        cartUpdate(userId: String): CartUpdate
    }
`;
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
    input CartProductInput {
        id: ID!
        amount: Int!
    }
    type CartUpdate {
        user: String!
        cartProducts: [CartProduct]!
    }
    type Query {
        getProducts(userId: String): [Product]
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
    input OrderInput {
        firstName: String!,
        lastName: String!,
        phone: String!,
        products: [CartProductInput]!
    }
    type Mutation {
        addProduct(body: AddProductInput!): Product
        removeProduct(id: ID!): Product
        updateProduct(productId: ID!, body: UpdateProductInput!): Product
        updateCart(userId: String!, productId: ID!, amount: Int!): CartProduct
        checkout(userId: String!, order: OrderInput!): [Product]
    }
    type Subscription {
        cartUpdate(userId: String): CartUpdate
    }
`;
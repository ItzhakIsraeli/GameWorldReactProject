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
        date: String,
        userId: String,
        phone: String,
        totalPrice: Number,
        products: [CartProduct]
    }
    type User {
        firstName: String,
        lastName: String,
        userId: String,
        phone: String,
        age: String,
        state: String,
        address: String,
        email: String,
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
        getMyOrders(userId: String): [Order]
        getUser(userId: String): User
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
        firstName: String!
        lastName: String!
        userId: String!
        date: String!
        phone: String!
        totalPrice: Number!
        products: [CartProductInput]!
    }
    input AddUserInput {
        firstName: String!,
        lastName: String!,
        userId: String!,
        phone: String!,
        age: String!,
        state: String!,
        address: String!,
        email: String!,
    }
    input UpdateUserInput {
        firstName: String,
        lastName: String,
        userId: String,
        phone: String,
        age: String,
        state: String,
        address: String,
        email: String,
    }
    type Mutation {
        addProduct(body: AddProductInput!): Product
        removeProduct(id: ID!): Product
        updateProduct(productId: ID!, body: UpdateProductInput!): Product
        updateCart(userId: String!, productId: ID!, amount: Int!): CartProduct
        checkout(userId: String!, order: OrderInput!): [Product]
        addOrder(body: OrderInput!): Order
        addUser(body: AddUserInput!): User
        removeUser(userId: String!): User
        updateUser(userId: String!, body: UpdateUserInput!): User
    }
    type Subscription {
        cartUpdate(userId: String): CartUpdate
    }
`;
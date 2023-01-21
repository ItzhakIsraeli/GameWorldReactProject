import {gql} from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
    query GetAllProducts($userId: String) {
        getProducts(userId: $userId){
            id
            name
            rate
            userRate
            platform
            releaseDate
            description
            price
            image
            limit
        }
    }
`;

export const GET_USER = gql`
    query GetUser($userId: String) {
        getUser(userId: $userId){
            firstName
            lastName
            userId
            phone
            phone
            age
            state
            address
            email
        }
    }
`;

export const GET_ORDER_TOTAL_PRICE_BY_DATE = gql`
    query getOrderTotalPriceByDate($email: String) {
        getOrderTotalPriceByDate(email: $email){
            date
            totalPrice
        }
    }
`;

export const UPDATE_CART = gql`
    mutation UpdateCart($userId: String!, $productId: ID!, $amount: Int!){
        updateCart(userId: $userId, productId: $productId, amount: $amount){
            id
            amount
        }
    }
`;

export const typeDefs = gql`
    type Product {
        id: ID!
        name: String!
        rate: Int!
        userRate: String!
        platform: String!
        releaseDate: String!
        description: String!
        price: Int!
        image: String!
        limit: Int!
    }
    type Order {
        firstName: String,
        lastName: String,
        email: String,
        date: String,
        phone: String,
        totalPrice: Int,
        products: [CartProduct]
    }
    input OrderInput {
        firstName: String!,
        lastName: String!,
        email: String!,
        date: String!
        phone: String!,
        totalPrice: Int!
        products: [CartProductInput]!
    }
    type CartProduct {
        id: ID!
        amount: Int!
    }
    input CartProductInput {
        id: ID!
        amount: Int!
    }
    type OrderByDate {
        date: String
        totalPrice: Int
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
`;

export const CHECKOUT = gql`
    mutation checkout($userId: String!, $order: OrderInput!){
        checkout(userId: $userId, order: $order){
            id
            name
            rate
            userRate
            platform
            releaseDate
            description
            price
            image
            limit
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($body: AddUserInput!){
        addUser(body: $body){
            firstName
            lastName
            userId
            phone
            age
            state
            address
            email
        }
    }
`;

export const REMOVE_USER = gql`
    mutation removeUser($userId: String!){
        removeUser(userId: $userId){
            firstName
            lastName
            userId
            phone
            age
            state
            address
            email
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($userId: String!, $body: UpdateUserInput!){
        updateUser(userId: $userId, body: $body){
            firstName
            lastName
            userId
            phone
            age
            state
            address
            email
        }
    }
`;

export const SUBSCRIPTION_QUERY = gql`
  subscription cartUpdate ($userId: String){
    cartUpdate(userId:$userId) {
      user
      cartProducts {
        id
        amount
      }
    }
  }
`;

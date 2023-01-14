import {gql} from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
    query GetAllProducts($userId: String) {
        getProducts(userId: $userId){
            id
            name
            description
            price
            image
            limit
        }
    }
`;

export const GET_MY_ORDERS = gql`
    query GetMyOrders($userId: String) {
        getMyOrders(userId: $userId){
           firstName
            lastName
            date
            userId
            phone
            products {
                id
                amount
            }
        }
    }
`;

export const GET_PRODUCT = gql`
    query GetProduct($id: ID) {
        getProduct(id: $id){
            id
            name
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
            age
            state
            address
            email
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
        phone: String,
        products: [CartProduct]
    }
    input OrderInput {
        firstName: String!,
        lastName: String!,
        userId: String!,
        data: String!
        phone: String!,
        products: [CartProductInput]!
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
    mutation checkout($userId: String!, $order: Order!){
        checkout(userId: $userId, order: $order){
            id
            name
            description
            price
            image
            limit
        }
    }
`;

export const ADD_ORDER = gql`
    mutation addOrder($body: OrderInput!){
        addOrder(body: $body){
            firstName
            lastName
            date
            userId
            phone
            products {
                id
                amount
            }
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

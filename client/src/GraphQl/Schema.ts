import {gql, useQuery} from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
    query GetAllProducts($userId: String!) {
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

export const UPDATE_CART = gql`
    mutation UpdateCart($userId: String!, $productId: ID!, $amount: Int!){
        updateCart(userId: $userId, productId: $productId, amount: $amount){
            id
            amount
        }
    }
`;

export const CART_UPDATE = gql`
    subscription cartUpdate($userId: String){
        cartUpdate(userId: $userId){
            user
            cartProduct {
                id
                amount
            }
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
        phone: String,
        products: [CartProduct]
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

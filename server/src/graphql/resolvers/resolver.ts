let id;
let getProducts;
let getProduct;
let addProduct;
let removeProduct;
let updateProduct;
let updateCart;
let checkout;
let cartUpdate;
export const resolvers = {
    CartProduct: {
        id
    },
    Query: {
        getProducts,
        getProduct
    },
    Mutation: {
        addProduct,
        removeProduct,
        updateProduct,
        updateCart,
        checkout
    },
    Subscription: {
        cartUpdate
    }
}
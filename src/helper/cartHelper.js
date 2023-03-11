
// export const cartaddQuantity = (List, payload) =>{
//         if(List.length > 0) {
//            return List.map(item => {
//                 if (item._id === payload._id) {
//                     debugger
//                     item.quantity = item.quantity + payload.quantity
//                 }
//                 return item
//             })
//         }
//         return payload
//
// }
export const cartaddQuantity = (cartItems, cartItemtoAdd) => {

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem._id === cartItemtoAdd._id
    );
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem._id === cartItemtoAdd._id
                ? {
                    ...cartItem,
                    quantity: cartItem?.quantity + cartItemtoAdd.quantity,
                }
                : cartItem
        );
    }
    return [...cartItems, { ...cartItemtoAdd }];
};


export const addItemOnly = (cartItems, cartItemtoAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem._id === cartItemtoAdd._id
    );
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem._id === cartItemtoAdd._id
                ? {
                    ...cartItem,
                    quantity: cartItem?.quantity + 1,
                }
                : cartItem
        );
    }

    return [...cartItems, { ...cartItemtoAdd, quantity: 1 }];
};

export const removeCart = (cartItems, id) => {
    return cartItems.filter((cartItem) => cartItem._id !== id);
};

export const updateQuantity = (cartItems, data) => {

    const { id, quantity } = data;
    cartItems.map((cartItem) => {
        if (cartItem._id == id) {
            cartItem.quantity = Number(quantity);
        }
    });

    return cartItems;
};
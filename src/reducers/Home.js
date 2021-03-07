const ADD_CART = 'e-commerce-game/home/ADD_CART';
const ALTER_QUANTITY = 'e-commerce-game/home/ALTER_QUANTITY';
const CALCULATE_PRICE = 'e-commerce-game/home/CALCULATE_PRICE';
const CLEAR_CART = 'e-commerce-game/home/CLEAR_CART';
const CALCULATE_SHIPPING = 'e-commerce-game/home/CALCULATE_SHIPPING';

export function addCart(value) {
    return {
        type: ADD_CART,
        productAdd: value,
    };
}

export function alterQuantity(product, action) {
    return {
        type: ALTER_QUANTITY,
        product: product,
        action: action
    }
}

export function calculatePrice(){
    return {
        type: CALCULATE_PRICE,
    };
}

export function clearCart(){
    return {
        type: CLEAR_CART
    };
}

export function calculateShipping(){
    return {
        type: CALCULATE_SHIPPING
    };
}

const INITIAL_STATE = { cart: [],total:0,shipping:0, discount: 0};

export default function Home(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_CART:
            var newCart = []
            var contains = false;
            state.cart.forEach((item) => {
                newCart.push(item)
            })
            newCart.forEach((item) => {
                if (item.id === action.productAdd.id) {
                    item.quantity++
                    contains = true;
                }
            })
            if (contains == false) {
                var newItem = action.productAdd
                newItem.quantity = 1
                newCart.push(newItem)
            }
            return {
                ...state,
                cart: newCart
            };
        case ALTER_QUANTITY:
            var newCart = []
            state.cart.forEach((item) => {
                newCart.push(item)
            })
            if (action.action == "add") {
                newCart.forEach((item) => {
                    if (item.id === action.product.id) {
                        item.quantity++;
                    }
                })

            }else{
                newCart.forEach((item,index) => {
                    if (item.id === action.product.id) {
                        item.quantity--;
                        if(item.quantity === 0){
                            newCart.splice(index,1)
                        }
                    }
                })
            }
            return {
                ...state,
                cart: newCart
            };
        case CALCULATE_PRICE:
            var newCart = []
            var newTotal = 0;
            state.cart.forEach((item) => {
                newCart.push(item)
            })
            state.cart.forEach((item) => {
                newTotal += (item.quantity*item.price)
            })
            return {
                ...state,
                cart: newCart,
                total: newTotal
            };
        case CLEAR_CART:
            var newCart = []
            return {
                ...state,
                cart: newCart,
                total: 0,
                shipping: 0,
                discount: 0,
            };
        case CALCULATE_SHIPPING:
            var newShipping = 0;
            var newDiscount = 0;
            state.cart.forEach((item) => {
                newShipping += (item.quantity*10)
            })
            if(state.total > 250){
                newDiscount = newShipping;
            }
            return {
                ...state,
                shipping: newShipping,
                discount: newDiscount
            };
        default:
            return state;
    }
};

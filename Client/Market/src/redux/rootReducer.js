import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD": {
      return { ...state, products: action.payload };
    }

    case "ADD": {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    }

    case "CHANGE_AMOUNT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, amount: action.payload.amount }
            : product
        ),
      };

    case "DELETE": {
      const products = [...state.products];
      const index = products.findIndex((item) => item.id === action.payload);

      if (index !== -1) {
        products.splice(index, 1);
      }
      return { ...state, products };
    }

    case "CONFIRM_ORDER" : {
      const productsInCart = [...state.products];
      const userObj = {
        orderNumber: uuidv4(),
        userID : sessionStorage.userID,
        products : productsInCart,
        orderStatus : "Pending"
     };
     const postOrder = axios.post('http://localhost:3000/orders/createOrder' ,userObj )
     alert(`Order Recived, order number is : ${userObj.orderNumber}`)
     return {
        ...state, products : []
     }
    }
    default:
      return state;
  }
};

export default productReducer;

import React, { useReducer } from "react";
import { nanoid } from "nanoid";
import Products from "./Products";
import Cart from "./Cart";

const Main = () => {

    // todo --------- reducer function for useReducer ----------->
  const reducer = (initState, action) => {
    switch (action.type) {
        //*-------when + button click chnages in product List------->
      case "Incr":
        return {
          ...initState,
          productsData: initState.productsData.map((item) => {
            if (item.id === action.payload) {
              return { ...item, count: item.count + 1 };
            }
            return item;
          }),
        };
        //*-------when + button click chnages in cart List------->
      case "AddToCart":
        const selectedItem = initState.productsData.find(
          (item) => item.id === action.payload
        );

        if (selectedItem) {
          const updatedCart = [...initState.cartData];
          const existingItemIndex = updatedCart.findIndex(
            (item) => item.id === action.payload
          );

          if (existingItemIndex !== -1) {
            updatedCart[existingItemIndex].count += 1;
          } else {
            updatedCart.push({ ...selectedItem, count: 1 });
          }

          return {
            ...initState,
            cartData: updatedCart,
          };
        }
        //*-------when - button click chnages in product List------->
      case "Decr":
        return {
          ...initState,
          productsData: initState.productsData.map((item) => {
            if (item.id === action.payload && item.count > 0) {
              return { ...item, count: item.count - 1 };
            }
            return item;
          }),
        };
        //*-------when - button click chnages in cart List------->
      case "DecrFromCart":
        const updatedCart = initState.cartData.map((item) => {
          if (item.id === action.payload && item.count > 0) {
            return { ...item, count: item.count - 1 };
          }
          return item;
        });

        return {
          ...initState,
          cartData: updatedCart.filter((item) => item.count > 0),
        };
        //*------case to handle add new product-------->
        case "addItem":
            let prodName = window.prompt("Product Name")
            let price = window.prompt("Price (Only Numbers)")
            //check if any alphabet is present in price
            while (/[^0-9.]/g.test(price) || price < 1) {
              alert('Please enter a valid number for the price')
              price = window.prompt('Price (Only Numbers)')
              }
            return {
                ...initState,
                productsData:[...initState.productsData ,{id:Math.random(),name:prodName,price:price, count:0}]
            }
      default:
        return initState;
    }
  };

// todo ------- useReducer -------------->
  const [state, dispatch] = useReducer(reducer, {
    productsData: [
      { id: 1, name: "Shirt", price: "650", count: 0 },
      { id: 2, name: "T-shirts", price: "450", count: 0 },
      { id: 3, name: "Trouser", price: "800", count: 0 },
    ],
    cartData: [],
  });


  return (
    <main>
      <div className="products">
        <h2>Men's Fashion</h2>
        <div className="add-item">
            <button onClick={() => dispatch({type: "addItem"})}>Add Product</button>
        </div>
        {state.productsData.map((item) => {
          return (
            <Products
              key={nanoid()}
              item={item}
              onDecr={() => {
                dispatch({ type: "Decr", payload: item.id });
                dispatch({ type: "DecrFromCart", payload: item.id });
              }}
              onIncr={() => {
                dispatch({ type: "Incr", payload: item.id });
                dispatch({ type: "AddToCart", payload: item.id });
              }}
            />
          );
        })}
      </div>
      <div className="cart">
        <h2>Cart</h2>
        <div className="cart-content">
          {state.cartData.length === 0 ? (
            <p id="noEle">
              No Product added to the cart <br />
              <span>!</span>
            </p>
          ) : (
            <Cart cartData = {state.cartData} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Main;

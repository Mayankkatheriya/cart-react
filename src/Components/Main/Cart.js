import { nanoid } from "nanoid";
import React from "react";

const Cart = ({ cartData }) => {
  return (
    <>
      {cartData.map((item) => {
        return (
          <div key={nanoid()} className="product cart-item">
            <h4>{item.name}</h4>
            <p>
              {item.count} X ₹{item.price}
            </p>
          </div>
        );
      })}
      <div className="product cart-item last">
        <h4>Total:</h4>
        <p className="total">
          ₹{cartData.reduce((sum, ele) => sum + ele.count * ele.price, 0)}
        </p>
      </div>
    </>
  );
};

export default Cart;

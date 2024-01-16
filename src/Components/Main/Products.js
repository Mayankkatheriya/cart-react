import React from "react";

const Products = ({item, onIncr, onDecr}) => {
  return (
    <div className="product">
      <h4 className="productName">{item.name}</h4>
      <p className="price">₹{item.price}</p>
      <div className="numbers">
        <button
          className="remove"
          onClick={onDecr}
        >
          -
        </button>
        <p className="count">{item.count}</p>
        <button
          className="add"
          onClick={onIncr}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Products;

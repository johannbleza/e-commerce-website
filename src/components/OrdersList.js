import React from 'react';

const OrdersList = ({ item }) => {
  return (
      <li className='table-cart-fz-admin'>{item.productName}, Size: {item.size}, Quantity: {item.quantity} </li>
  );
};

export default OrdersList;

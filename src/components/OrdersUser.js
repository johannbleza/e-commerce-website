import React, { useContext } from 'react';
import UserContext from '../UserContext';
import OrdersList from './OrdersList';

const OrdersUser = ({ item }) => {

    const { orders } = useContext(UserContext);

    const index = orders.findIndex((element) => element._id == item._id);

    let cart = item.cart

    

  return (
      <tr>
          <td className='text-center'>{index + 1}</td>
          <td>{item._id}</td>
          <td>
              {cart.map((item) => (
                  <OrdersList item={item} key={item._id} />
              ))}
          </td>
          <td className='text-center'>{item.purchasedOn.slice(0,10)}</td>
          <td className='text-center'>{item.status}</td>
          <td className='text-center'>PHP {item.total}</td>
      </tr>
  )
};

export default OrdersUser;

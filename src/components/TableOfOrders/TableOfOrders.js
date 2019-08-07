import React from 'react';
import './TableOfOrders.scss';

class TableOfOrders extends React.Component {
  render(){
    const { orderRow } = this.props;
    return(
      <tr>
        <td>{orderRow.quantity}</td>
        <td>{orderRow.name}</td>
        <td>{orderRow.pickupTime}</td>
        <td>{orderRow.firstName} {orderRow.lastName}</td>
        <td>{orderRow.phoneNumber}</td>
      </tr>
    );
  }
}

export default TableOfOrders;

import React from 'react';
import {
  Col,
  Row,
} from 'reactstrap';
import logo from '../../images/DonutDenLogo.jpeg';
import './MenuItem.scss';

class MenuItem extends React.Component {
  render(){
    const { MenuItem } = this.props;
    return(
      <div className="menuItem-box">
        <Row>
          <Col>
            <img src={logo} className="menuItemImage" alt={MenuItem.name} />
          </Col>
          <Col>
            <h5>{MenuItem.name}</h5>
          </Col>
          <Col>
            {MenuItem.price}
          </Col>
        </Row>
      </div>
    );
  }
}

export default MenuItem;

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
      <Row className="containerRow">
        <Col className="imageCol">
          <img src={logo} className="menuItemImage" alt={MenuItem.name} />
        </Col>
        <Row className="dataRow">
          <Col className="itemName">
            <h5>{MenuItem.name}</h5>
          </Col>
          <Col className="itemPrice">
            ${MenuItem.price}
          </Col>
          <Row className="itemDescription">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet massa a est porttitor facilisis eget in leo. Phasellus quis nisl dolor. Vestibulum cursus sem rutrum turpis mollis, a placerat ante commodo.</p>
          </Row>
        </Row>
      </Row>
    );
  }
}

export default MenuItem;

import React from 'react';
import {
  Col,
  Row,
} from 'reactstrap';
import logo from '../../images/DonutDenLogo.jpeg';
import './MenuItem.scss';

class MenuItem extends React.Component {

  onSelectMenuItem = (event) => {
    event.preventDefault();
    const { getMenuItem, MenuItem } = this.props;
    getMenuItem(MenuItem.id);
  }

  render(){
    const { MenuItem, isCreatingOrder } = this.props;



    const displaySwitcher = () => {
      if (isCreatingOrder) {
        return(
          // ----- This only displays in /Order ----- //
          <Row className="containerRow">
          <Col className="imageCol">
            <img src={logo} className="menuItemImage" alt={MenuItem.name} onClick={this.onSelectMenuItem} />
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
        )
      } return(
        // ------ This only displays in /Menu ------ //
        <Row className="containerRow">
          <Col className="imageCol">
            <img src={logo} className="menuItemImage" alt={MenuItem.name} onClick={this.props.onSelect} />
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
      )
    }

    return (
      <div>
        {displaySwitcher()}
      </div>
    )
  }
}

export default MenuItem;

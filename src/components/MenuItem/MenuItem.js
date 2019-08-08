import React from 'react';
import {
  Col,
  Row,
} from 'reactstrap';
import './MenuItem.scss';

class MenuItem extends React.Component {

  callBackOnSelect = (event) => {
    event.preventDefault();
    this.props.onSelect(this.props.MenuItem.id)
  }

  onSelectMenuItem = (event) => {
    event.preventDefault();
    const { getMenuItem, MenuItem, toggle } = this.props;
    getMenuItem(MenuItem.id)
    toggle()
  }

  render(){
    const { MenuItem, isCreatingOrder } = this.props;



    const displaySwitcher = () => {
      if (isCreatingOrder) {
        return(
          // ----- This only displays in /Order ----- //
          <Row className="containerRow">
          <Col className="imageCol">
            <img src={MenuItem.image} className="menuItemImage" alt={MenuItem.name} onClick={this.onSelectMenuItem} style={{cursor: 'pointer'}} />
          </Col>
          <Row className="dataRow">
            <Col className="itemName">
              <h5>{MenuItem.name}</h5>
            </Col>
            <Col className="itemPrice">
              ${MenuItem.price}
            </Col>
            <Row className="itemDescription">
              <p>{MenuItem.description}</p>
            </Row>
          </Row>
        </Row>
        )
      } return(
        // ------ This only displays in /Menu ------ //
        <Row className="containerRow">
          <Col className="imageCol">
            <img src={MenuItem.image} className="menuItemImage" alt={MenuItem.name} onClick={this.callBackOnSelect} style={{cursor: 'pointer'}} />
          </Col>
          <Row className="dataRow">
            <Col className="itemName">
              <h5>{MenuItem.name}</h5>
            </Col>
            <Col className="itemPrice">
              ${MenuItem.price}
            </Col>
            <Row className="itemDescription">
              <p>{MenuItem.description}</p>
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

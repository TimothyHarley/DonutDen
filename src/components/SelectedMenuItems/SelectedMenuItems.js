import React from 'react';
import {
  Col,
  Row,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import './SelectedMenuItems.scss';

class SelectedMenuItems extends React.Component {
  state = {
    quantity: '1',
    menuItemPrice: '0',
  }

  componentDidMount() {
    this.setState({ menuItemPrice: this.props.MenuItem.price })
  }

  formFieldStringState = (event) => {
    event.preventDefault();
    const { MenuItem } = this.props;
    const { menuItemPrice } = this.state;
    const tempQuantity = event.target.value;
    this.props.orderItemCallback(MenuItem.id, tempQuantity, (menuItemPrice*tempQuantity).toFixed(2));
    this.setState({
      quantity: tempQuantity,
    });
  }

  quantityChange = event => this.formFieldStringState(event);

  updatePrice = () => {
    const { quantity, menuItemPrice } = this.state;
    let totalPrice = (menuItemPrice*quantity).toFixed(2)
    return (
      <div>
        ${totalPrice}
      </div>
    )
  }

  render(){
    const { MenuItem } = this.props;
    return(
      <Row className="containerRow">
        <Col className="imageCol">
          <img src={MenuItem.image} className="menuItemImage" alt={MenuItem.name} />
        </Col>
        <Row className="dataRow">
          <Col className="itemName">
            <h5>{MenuItem.name}</h5>
          </Col>
          <Col className="itemPrice">
            {this.updatePrice()}
          </Col>
          <Col>
            <FormGroup>
              <Label for="ItemQuantity">Quantity</Label>
              <Input
                type="number"
                name="quantity"
                id="quantity"
                placeholder="1"
                onChange={this.quantityChange}
                value={this.state.quantity}
                max="1000"
                min="0"
              />
            </FormGroup>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default SelectedMenuItems;

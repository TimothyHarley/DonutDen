import React from 'react';
import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import logo from '../../images/DonutDenLogo.jpeg';
import './SelectedMenuItems.scss';

class SelectedMenuItems extends React.Component {
  state = {
    quantity: '1',
  }

  formFieldStringState = (event) => {
    event.preventDefault();
    let tempQuantity = this.state.quantity;
    tempQuantity = event.target.value;
    this.setState({
      quantity: tempQuantity,
    });
  }

  quantityChange = event => this.formFieldStringState(event);

  updatePrice = () => {
    const { quantity } = this.state;
    const { MenuItem } = this.props;
    let totalPrice = (MenuItem.price*quantity).toFixed(2)
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
          <img src={logo} className="menuItemImage" alt={MenuItem.name} />
        </Col>
        <Row className="dataRow">
          <Col className="itemName">
            <h5>{MenuItem.name}</h5>
          </Col>
          <Col className="itemPrice">
            {this.updatePrice()}
          </Col>
          <Col>
            <Form>
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
            </Form>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default SelectedMenuItems;

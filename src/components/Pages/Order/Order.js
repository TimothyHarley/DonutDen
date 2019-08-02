import React from 'react';
import orderRequests from '../../../helpers/data/orderRequests';
import AddToOrderModal from '../../AddToOrderModal/AddToOrderModal';
import { 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Row,
  Col,
} from 'reactstrap';
import './Order.scss'
import SelectedMenuItems from '../../SelectedMenuItems/SelectedMenuItems';
import menuRequests from '../../../helpers/data/menuRequests';

const defaultOrder = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  pickupDate: '',
  pickupTime: '',
  isApproved: false,
  isDeleted: false,
  approvedBy: 3722,
}

class Order extends React.Component {
  state = {
    newOrder: defaultOrder,
    showModal: false,
    menuItem: {},
    isCreatingOrder: true,
  }

  getMenuItem = (id) => {
    menuRequests.getMenuItem(id).then((gotMenuItem) => {
      this.setState({ menuItem: gotMenuItem })
    });
  }

  toggle = () => {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  createOrderEvent = (order) => {
    orderRequests.createOrder(order)
  }

  formSubmit = (e) => {
    e.preventDefault();
    const order = { ...this.state.newOrder };
    if (order.Firstname && order.LastName && order.email && order.phoneNumber && order.pickupDate && order.pickupTime){
          this.createOrderEvent(order);
    } else {
      alert('Please fill out the whole order form.')
    }
  }

  formFieldStringState = (name, event) => {
    event.preventDefault();
    const tempOrder = { ...this.state.newOrder };
    tempOrder[name] = event.target.value;
    this.setState({
      newOrder: tempOrder,
    });
  }

  firstNameChange = event => this.formFieldStringState('firstName', event);
  lastNameChange = event => this.formFieldStringState('lastName', event);
  emailChange = event => this.formFieldStringState('email', event);
  phoneNumberChange = event => this.formFieldStringState('phoneNumber', event);
  pickupDateChange = event => this.formFieldStringState('pickupDate', event);
  pickupTimeChange = event => this.formFieldStringState('pickupTime', event);

  render(){
    const { newOrder, menuItem } = this.state;

    const hasSelectedItems = () => {
      if (menuItem.id) {
        return(
          <div>
            <SelectedMenuItems MenuItem={menuItem}/>
            <Button onClick={this.formSubmit}>Submit</Button>
          </div>
        )
      }
    }

    return(
      <div>
        <Form>
          <Row className="formRow">
            <Col md={4}>
              <FormGroup>
                <Label for="FirstName">First Name</Label>
                <Input type="text" name="firstName" id="firstName" onChange={this.firstNameChange} value={newOrder.firstName} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="LastName">Last Name</Label>
                <Input type="text" name="lastName" id="lastName" onChange={this.lastNameChange} value={newOrder.lastName} />
              </FormGroup>
            </Col>
          </Row>
          <Row className="formRow">
            <Col md={4}>
              <FormGroup>
                <Label for="Email">Email</Label>
                <Input type="email" name="email" id="email" onChange={this.emailChange} value={newOrder.email} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="PhoneNumber">Phone Number</Label>
                <Input type="number" name="phoneNumber" id="phonNumber" onChange={this.phoneNumberChange} value={newOrder.phoneNumber} />
              </FormGroup>
            </Col>
          </Row>
          <Row className="formRow">
            <Col md={4}>
              <FormGroup>
                <Label for="PickupDate">Pickup Date</Label>
                <Input type="date" name="pickupDate" id="pickupDate" onChange={this.pickupDateChange} value={newOrder.pickupDate} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="PickupTime">Pickup Time</Label>
                <Input type="time" name="pickupTime" id="pickupTime" onChange={this.pickupTimeChange} value={newOrder.pickupTime} />
              </FormGroup>
            </Col>
          </Row>
            <Button onClick={this.toggle}>Add To Order</Button>
            {hasSelectedItems()}
        </Form>
        <AddToOrderModal 
          toggle={this.toggle}
          showModal={this.state.showModal}
          getMenuItem={this.getMenuItem}
          isCreatingOrder={this.state.isCreatingOrder}
          />
      </div>
    );
  }
}

export default Order;

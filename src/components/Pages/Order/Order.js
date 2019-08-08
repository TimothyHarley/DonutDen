import React from 'react';
import orderRequests from '../../../helpers/data/orderRequests';
import AddToOrderModal from '../../AddToOrderModal/AddToOrderModal';
import { Redirect } from 'react-router-dom';
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
import orderItemRequests from '../../../helpers/data/orderItemRequests'

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
    selectedItemArray: [],
    isCreatingOrder: true,
    orderHasBeenSubmitted: false,
    orderCountByDate: '0',
  }

  componentDidMount() {
    if(this.props.location.state) {
      this.getMenuItem(this.props.location.state.passedItemFromMenuPage)
    }
  }

  getMenuItem = (id) => {
    menuRequests.getMenuItem(id).then((gotMenuItem) => {
      gotMenuItem.data.quantity = 1;
      gotMenuItem.data.itemId = gotMenuItem.data.id;
      this.setState({ selectedItemArray: [...this.state.selectedItemArray, gotMenuItem.data] })
    });
  }

  toggle = () => {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  createOrderEvent = (order) => {
    orderRequests.createOrder(order).then((result) => {
      const newOrderId = result.data.id;
      this.state.selectedItemArray.forEach(item => item.orderId = newOrderId)
      orderItemRequests.createOrderItem(this.state.selectedItemArray).then(()=> {
        this.setState({ orderHasBeenSubmitted: true })
      })
      }
    )
  }

  getOrdersForDate() {
    const getDate = this.state.newOrder.pickupDate;
    orderRequests.getOrderCountByDate(getDate).then((results) => {
          this.setState({ orderCountByDate: results.data.orderSum })
    })
  }

  formSubmit = (e) => {
    e.preventDefault();
    const order = { ...this.state.newOrder };
    if (order.firstName && order.lastName && order.email && order.phoneNumber && order.pickupDate && order.pickupTime){
          this.createOrderEvent(order)
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

  orderItemCallback = (itemId, quantity, unitPrice) => {
    const newSelectedItems = [...this.state.selectedItemArray];
    newSelectedItems.forEach(item => {
      if (item.id === itemId) {
        item.quantity = quantity;
        item.price = unitPrice;
      }
    });

    this.setState({selectedItemArray: newSelectedItems});
  }

  render(){
    const { newOrder, selectedItemArray } = this.state;

    if(this.state.orderHasBeenSubmitted === true) {
      return <Redirect to={{
        pathname: '/home', state: { thankYou: true } 
      }} />
    }

    const singleSelectedItem = selectedItemArray => (
      <SelectedMenuItems 
        key={selectedItemArray.id}
        MenuItem={selectedItemArray}
        orderItemCallback={this.orderItemCallback}
        />
    )

    const allSelectedItems = selectedItemArray.map(singleSelectedItem);

    const hasSelectedItems = () => {
      if (selectedItemArray.length) {
        return(
          <div>
            {allSelectedItems}
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
                <Input type="text" name="phoneNumber" id="phonNumber" onChange={this.phoneNumberChange} value={newOrder.phoneNumber} />
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

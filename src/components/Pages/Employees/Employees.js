import React from 'react';
import moment from 'moment';
import { Button, Form, FormGroup, Label, Input, Row, Col, Table } from 'reactstrap';
import orderRequests from '../../../helpers/data/orderRequests';
import TableOfOrders from '../../TableOfOrders/TableOfOrders';
import './Employees.scss'

class Employees extends React.Component {
  state = {
    date: '',
    gotOrders: [],
    displayDate: '',
  }

  componentDidMount(){
    let tomorrow = moment(new Date()).add(1,'days').format('YYYY-MM-DD');
    this.displayDate(tomorrow);
    orderRequests.getOrdersByDate(tomorrow).then((requestedOrders) =>{
      this.setState({ gotOrders: requestedOrders, date: tomorrow })
    });
  }

  dateChange = (event) => {
    event.preventDefault();
    let tempDate = this.state.date;
    tempDate = event.target.value;
    this.setState({
      date: tempDate,
    });
  }

  onNewDateSubmit = (event) => {
    event.preventDefault();
    const { date } = this.state;
    this.displayDate(date);
    orderRequests.getOrdersByDate(date).then((requestedOrders) => {
      this.setState({ gotOrders: requestedOrders })
    });
  }

  displayDate = (date) => {
    const format = moment(date).format('MMM DD, YYYY');
    this.setState({ displayDate: format })
  }

  render(){
    const { gotOrders } = this.state;

    const singleRowOfOrdersToFill = gotOrders => (
      <TableOfOrders 
        key={gotOrders.id}
        orderRow={gotOrders}
      />
    )

    const filledTable = gotOrders.map(singleRowOfOrdersToFill);

    return(
      <div>
        <h1>Orders for {this.state.displayDate}</h1>
        <Form>
          <Row>
            <Col md={2}>
              <FormGroup>
                <Label for="exampleDate">Search Orders By Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  placeholder="date placeholder"
                  onChange={this.dateChange}
                  value={this.state.date}
                />
                <Button onClick={this.onNewDateSubmit}>Search</Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <Table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Product</th>
            <th>Pickup Time</th>
            <th>Name</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filledTable}
        </tbody>
      </Table>
      </div>
    );
  }
}

export default Employees;

import React from 'react';
import moment from 'moment';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import orderRequests from '../../../helpers/data/orderRequests';
import './Employees.scss'

class Employees extends React.Component {
  state = {
    date: '',
    gotOrders: [],
  }

  componentDidMount(){
    orderRequests.getOrdersByDate(moment(new Date()).add(1,'days').format('MM DD YYYY')).then((requestedOrders) =>{
      this.setState({ gotOrders: requestedOrders })
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

  render(){
    return(
      <div>
        <h1>Employees</h1>
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
              </FormGroup>
              <Button>Search</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Employees;

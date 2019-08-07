import React from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import './Employees.scss'

class Employees extends React.Component {
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
                  id="exampleDate"
                  placeholder="date placeholder"
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Employees;

import React from 'react';
import logo from '../../../images/DonutDenLogo.jpeg';
import { Row, Col } from 'reactstrap';
import './Home.scss'

class Home extends React.Component {
  state = {
    thankYou: false,
  }

  componentDidMount(){
    if(this.props.location.state) {
      this.setState({ thankYou: this.props.location.state.thankYou })
    }
  }

  render(){

    const thankYou = () => {
      if(this.state.thankYou){
      return 'Thank You for placing you order with us!'
      }
    }

    return(
      <div>
        <h1>{thankYou()}</h1>
        <div className="wrapper">
          <div className="neon-wrapper">
            <div className="neon-text">FOX'S DONUT DEN</div>
          </div>
        </div>
        <Row className="about-us">
          <Col md={5} className="logo-box">
            <img src={logo} alt="logo" className="logo" />
          </Col>
          <Col md={5} className="info">
            <p>
              The Donut Den has been a Nashville tradition since 1973.
              It's difficult to remember a time before that big neon sign was lighting 
              up Green Hills at night, letting us know that our friendly neighborhood donut shop
              was still there.  With it's mom-and-pop atmosphere, and it's daily-fresh donuts, it's the 
              perfect way to lessen the stress of that Hillsboro Pike commute to work.  So come on in!
              If we don't have what you want today, we'll gladly save one for you tomorrow! 
            </p>
          </Col>
        </Row>
        
        
      </div>
    );
  }
}

export default Home;

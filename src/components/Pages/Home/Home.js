import React from 'react';
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
      } else {
        return 'Welcome!'
      }
    }

    return(
      <div>
        <h1>{thankYou()}</h1>
      </div>
    );
  }
}

export default Home;

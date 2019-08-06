import React from 'react';
import {Redirect} from 'react-router-dom';
import './Menu.scss'
import menuRequests from '../../../helpers/data/menuRequests';
import MenuItem from '../../MenuItem/MenuItem';

class Menu extends React.Component {
  state = {
    calledMenu: [],
    toOrderPage: false,
    menuItemToPass: '-1',
  };

  componentDidMount() {
    this.getMenu();
  }

  getMenu() {
    menuRequests.getMenu().then((menu) => {
      this.setState({
        calledMenu: menu,
      });
    });
  }

  onSelect = (menuItem) => {
    this.setState({ menuItemToPass: menuItem })
    this.setState({ toOrderPage: true })
  }

  render(){
    const {
      calledMenu, toOrderPage
    } = this.state;

    //May try to pass menuItem.Id through this if I have time later
    if(toOrderPage === true){
      return <Redirect to={{
        pathname: '/order', state: { passedItemFromMenuPage: this.state.menuItemToPass } 
      }} />
    }

    const singleMenuItem = calledMenu => (
      <MenuItem 
        key={calledMenu.id}
        MenuItem={calledMenu}
        onSelect={this.onSelect}
        getMenuItem={this.props.getMenuItem}
        isCreatingOrder={this.props.isCreatingOrder}
        toggle={this.props.toggle}
      />
    );

    const menu = calledMenu.map(singleMenuItem);

    return(
      <div>
        <div className="menu-container">
          {menu}
        </div>
      </div>
    );
  }
}

export default Menu;

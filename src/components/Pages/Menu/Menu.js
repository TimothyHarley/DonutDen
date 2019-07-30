import React from 'react';
import './Menu.scss'
import menuRequests from '../../../helpers/data/menuRequests';
import MenuItem from '../../MenuItem/MenuItem';

class Menu extends React.Component {
  state = {
    calledMenu: [],
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

  render(){
    const {
      calledMenu,
    } = this.state;

    const singleMenuItem = calledMenu => (
      <MenuItem 
        key={calledMenu.id}
        MenuItem={calledMenu}
      />
    );

    const menu = calledMenu.map(singleMenuItem);

    return(
      <div>
        <h1>Menu</h1>
        <div className="menu-container">
          {menu}
        </div>
      </div>
    );
  }
}

export default Menu;

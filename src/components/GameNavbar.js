import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import ChatBox from './ChatBox';


class GameNavbar extends Component {
    state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu style={{ margin: 0 }}>
          <ChatBox >
            <Menu.Item
            name='editorials'
            onClick={this.handleItemClick}>
            Chat
            </Menu.Item>
         </ChatBox>
      </Menu>
    )
  }
}


export default GameNavbar;
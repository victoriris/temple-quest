import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import ChatBox from './ChatBox';


class GameNavbar extends Component {
    state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {

    return (
      <Menu style={{ margin: 0 }}>
          <ChatBox >
            <Menu.Item
            name='editorials'
            onClick={this.handleItemClick}>
              <Icon name='chat' />
              Chat
            </Menu.Item>
         </ChatBox>
      </Menu>
    )
  }
}


export default GameNavbar;
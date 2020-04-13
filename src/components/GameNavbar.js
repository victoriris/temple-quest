import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import ChatBox from './ChatBox';
import TurnBox from './TurnBox';


class GameNavbar extends Component {
    state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {

    return (
      <Menu style={{ margin: 0 }} size="huge" inverted>
          <ChatBox >
            <Menu.Item
            name='chat'
            onClick={this.handleItemClick}>
              <Icon name='chat' inverted />
              Chat
            </Menu.Item>
         </ChatBox>
         <Menu.Item
            name='turn'>
              <TurnBox />
          </Menu.Item>
      </Menu>
    )
  }
}


export default GameNavbar;
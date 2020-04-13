import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import ChatBox from './ChatBox';
import TurnBox from './TurnBox';
import { connect } from 'react-redux';


class GameNavbar extends Component {

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { score } = this.props;


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
         <Menu.Item
            name='turn'>
              <Icon name="diamond" color="teal" />
              {score}
          </Menu.Item>
      </Menu>
    );
  }
}


const mapStateToProps = ({ board }) => {
  const { score } = board;
  return { score };
};

export default connect(mapStateToProps)(GameNavbar);
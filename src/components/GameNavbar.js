import React, { Component } from 'react';
import { Menu, Icon, Button } from 'semantic-ui-react';
import ChatBox from './ChatBox';
import TurnBox from './TurnBox';
import { connect } from 'react-redux';
import { endGame } from '../actions';
import SettingsModal from './SettingsModal';


class GameNavbar extends Component {

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { score } = this.props;


    return (
      <Menu style={{ margin: 0 }} size="huge" inverted>
         <Menu.Item
            name='turn'>
              <TurnBox />
          </Menu.Item>
         <Menu.Item
            name='turn'>
              <Icon name="diamond" color="teal" />
              {score}
          </Menu.Item>
          <Menu.Menu position="right">
            <ChatBox >
              <Menu.Item
              name='chat'
              onClick={this.handleItemClick}>
                <Button icon inverted>
                  <Icon name='chat' />
                  Chat
                </Button>
              </Menu.Item>
            </ChatBox>
            <SettingsModal>
              <Menu.Item
              name='settings'>
                <Button icon inverted>
                  <Icon name="setting" />
                  Settings
                </Button>
              </Menu.Item>
            </SettingsModal>
            <Menu.Item
            name='end'>
              <Button icon inverted
              onClick={() => this.props.endGame(false)}>
                <Icon name="close" color="red" />
                End game
              </Button>
            </Menu.Item>
          </Menu.Menu>
      </Menu>
    );
  }
}


const mapStateToProps = ({ board }) => {
  const { score } = board;
  return { score };
};

export default connect(mapStateToProps, {
  endGame
})(GameNavbar);
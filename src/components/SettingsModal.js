import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import SettingsBox from './SettingsBox';


class SettingsModal extends Component {
    
    render() {
        return (
            <Modal trigger={this.props.children}>
                <Modal.Header>Settings</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <SettingsBox />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    };

}

export default SettingsModal;

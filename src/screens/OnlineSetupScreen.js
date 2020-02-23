import React, { Component } from 'react';
import { Button, Container, Grid, GridColumn, GridRow, List, Icon} from 'semantic-ui-react';
import history from '../history';
import jungleMainMenu from '../img/mainMenuBackground.mp4';


class OnlineSetupScreen extends Component{
    handleClick = (route) => history.push(route);
    render() {
        return(
            <Grid stretched className="mainScreen" padded centered columns={3}>
            <video id="jungleVideoMainMenu" src={jungleMainMenu} type="video/mp4" autoPlay muted loop />                
            <GridRow>
                <GridColumn verticalAlign="middle">
                    <Container className="onlineScreen">
                    <List divided relaxed>
                    <List.Item onClick={() => this.handleClick('board')}>
                        <Icon name="users" size="large" verticalAlign="middle"/>
                        <List.Content>
                            <List.Header as="a">User1</List.Header>
                            <List.Description as='a'>An online player</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item onClick={() => this.handleClick('board')}>
                        <List.Icon name="users" size="large" verticalAlign="middle"/>
                        <List.Content>
                            <List.Header as="a">User2</List.Header>
                            <List.Description as='a'>Another online player</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item onClick={() => this.handleClick('board')}>
                        <List.Icon name="users" size="large" verticalAlign="middle"/>
                        <List.Content>
                            <List.Header as="a">User3</List.Header>
                            <List.Description as='a'>Yet another online player</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item onClick={() => this.handleClick('board')}>
                        <List.Icon name="users" size="large" verticalAlign="middle"/>
                        <List.Content>
                            <List.Header as="a">User4</List.Header>
                            <List.Description as='a'>Yet another online player</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item onClick={() => this.handleClick('board')}>
                        <List.Icon name="users" size="large" verticalAlign="middle"/>
                        <List.Content>
                            <List.Header as="a">User5</List.Header>
                            <List.Description as='a'>Yet another online player</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item onClick={() => this.handleClick('board')}>
                        <List.Icon name="users" size="large" verticalAlign="middle"/>
                        <List.Content>
                            <List.Header as="a">User6</List.Header>
                            <List.Description as='a'>Yet another online player</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item onClick={() => this.handleClick('board')}>
                        <List.Icon name="users" size="large" verticalAlign="middle"/>
                        <List.Content>
                            <List.Header as="a">User7</List.Header>
                            <List.Description as='a'>Yet another online player</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item onClick={() => this.handleClick('board')}>
                        <List.Icon name="users" size="large" verticalAlign="middle"/>
                        <List.Content>
                            <List.Header as="a">User8</List.Header>
                            <List.Description as='a'>Yet another online player</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item onClick={() => this.handleClick('board')}>
                        <List.Icon name="users" size="large" verticalAlign="middle"/>
                        <List.Content>
                            <List.Header as="a">User9</List.Header>
                            <List.Description as='a'>Yet another online player</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item onClick={() => this.handleClick('board')}>
                        <List.Icon name="users" size="large" verticalAlign="middle"/>
                        <List.Content>
                            <List.Header as="a">User10</List.Header>
                            <List.Description as='a'>Yet another online player</List.Description>
                        </List.Content>
                    </List.Item>
                    </List>
                    </Container>
                    <Container
                    className="mainScreen__option">
                        <Button  floated="right" 
                         color="black" size="massive"
                        onClick={() => history.goBack()}>
                            BACK
                        </Button>
                    </Container>
                </GridColumn>
            </GridRow>
        </Grid>

        );
    }
}

export default OnlineSetupScreen;
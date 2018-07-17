import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Title, Content, Button, Text} from 'native-base';

import firebase from 'react-native-firebase';

class Principal extends Component{

    static navigationOptions = {
        header: (
            <Header style={ {'backgroundColor' : '#f78f03'}} androidStatusBarColor={'#BF6B03'}>
                <Left/>
                <Body>
                <Title>Principal</Title>
                </Body>
                <Right />
            </Header>
        )
    };

    constructor() {
        super();
        this.state = {
            usuario : ''
        };
    }

    componentWillMount(){
        this.setState({
            usuario : firebase.auth().currentUser
        });
    }

    _logout = () => {
        firebase.auth().signOut()
            .catch((error) => {
                console.error(error);
            });
    };

    render(){
        return(
            <Container>
                <Content padder>
                    <Text> Hello, {this.state.usuario.email}  </Text>
                    <Button onPress={this._logout}>
                        <Text>
                            Logout
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default Principal;

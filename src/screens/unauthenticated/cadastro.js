import React, { Component } from 'react';
import { StyleSheet} from 'react-native';
import { Container, Header, Left, Body, Right, Title, Content, Button, Text, Form, Item, Input, Label } from 'native-base';

import firebase from 'react-native-firebase';

export default class Cadastro extends Component{

    static navigationOptions = {
        header: (
            <Header style={ {'backgroundColor' : '#f78f03'}} androidStatusBarColor={'#BF6B03'}>
                <Left/>
                <Body>
                <Title>FoodEx</Title>
                </Body>
                <Right />
            </Header>
        )
    };

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        };
    }

    _updateEmail = email => {
        this.setState({ email });
    };

    _updatePassword = password => {
        this.setState({ password });
    };

    _registerUser = () => {
        const { email, password } = this.state;

        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email.trim(), password)
            .catch((error) => {
                console.error(error);
            });
    };

	render() {
        return (
            <Container>
                <Content padder contentContainerStyle={estilo.principal}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input onChangeText={this._updateEmail}
                                   value={this.state.email}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Senha</Label>
                            <Input secureTextEntry={true} onChangeText={this._updatePassword}
                                   value={this.state.password}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Confirmar senha</Label>
                            <Input secureTextEntry={true}/>
                        </Item>
                    </Form>
                <Button onPress={this._registerUser} full style={estilo.botao}>
                    <Text>CADASTRAR</Text>
                </Button>
                </Content>
            </Container>

        )

	}
}

const estilo = StyleSheet.create({
    header:{
        backgroundColor: '#f78f03'
    },

    principal:{
        backgroundColor: 'white'
    },

    entrada:{
        width: 300,
        height: 40,
        borderColor: 'gray',
        backgroundColor: 'white',
        borderWidth: 1,
        marginTop: 10
    },

    botao:{
        backgroundColor: '#f78f03',
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginTop: 20
    }
});

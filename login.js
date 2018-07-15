import React, { Component } from 'react';
import { StyleSheet, Image} from 'react-native';
import { Container, Header, Left, Body, Right, Title, Content, Button, Text, Form, Item, Input, Label } from 'native-base';
import { ModuloFacebookLogin } from 'ract-facebook-login';
import { GoogleLogin } from 'react-google-login-component';

import firebase from 'react-native-firebase';

export default class Login extends Component{

    static navigationOptions = {
       header: (
           <Header androidStatusBarColor={'#f78f03'}>
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

    _signIn = () => {
        // extract the values from state
        const { email, password } = this.state;

        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
            .catch((error) => {
                console.error(error);
            });
    };

    _cadastro = () => {
        this.props.navigation.navigate('Cadastro');
    };

	render() {
		return (
            <Container >
                <Content padder contentContainerStyle={estilo.principal}>
					<Image source={require('../../../assets/logofoodex.png')} style={estilo.logo}/>
                    <Form >
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input onChangeText={this._updateEmail}
                                   value={this.state.email} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Senha</Label>
                            <Input secureTextEntry={true} onChangeText={this._updatePassword}
                                   value={this.state.password}/>
                        </Item>
                    </Form>

					<Button transparent dark>
						<Text>Esqueceu a sua senha?</Text>
					</Button>

					<Button onPress={this._signIn} full style={estilo.botao}>
						<Text>LOGIN</Text>
					</Button>

					<Button onPress={this._cadastro} transparent dark>
						<Text>Não tem uma conta? CADASTRE-SE</Text>
					</Button>

                    <facebookLoginButton onPress={() => this.refs.facebooklogin.click()}>
                        icon={<i className="fa fa-facebook" style{{marginLeft:'5px'}}>
                        </i>}
                        <span>Entrar com Facebook</span>
                        <ModuloFacebookLogin ref={facebooklogin}
                                             appId={facebookAppId}
                                             fields={name, email, picture}
                                             callback={this.props.SocialSignUp} />
                    </facebookLoginButton>

                    <googleLoginButton
                        clientId={googleClientId}
                        onSuccess={this.props.SocialSignUp}
                        onFailure={this.props.SocialSignUp}
                        className="btnGoogle"
                    >
                        <i className="fa fa-google-plus" style={{ marginLeft:
                                '5px' }}/>
                        <span>&nbsp;&nbsp;Login com Google</span>
                    </googleLoginButton>

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

    logo:{
        width: 250,
        height: 200,
        margin: 20
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
		backgroundColor: '#f78f03'
	},

	facebookLoginButton:{
        backgroundColor: '#37549A',
        color: '#fff',
        boderRadius: 30,
        fontsize: 15,
        padding: 14,
        fontWeight: 'bold',
        cursor: 'point'
    },

    googleLoginButton:{
        backgroundColor: '#db3236',
        color: '#fff',
        fontsize: 15,
        borderRadius: 30,
        padding: 14,
        fontWeight: 'bold',
        cursor: 'point'
    }
});
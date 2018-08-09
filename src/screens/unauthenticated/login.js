import React, { Component } from 'react';
import { StyleSheet, Image} from 'react-native';
import { Container, Header, Left, Body, Right, Title, Content, Button, Text, Form, Item, Input, Label } from 'native-base';

import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

export default class Login extends Component{

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

  _signIn = () => {
    // extract the values from state
    const { email, password } = this.state;

    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email.trim(), password)
      .catch((error) => {
        console.error(error);
      });
  };

  _googleLogin = async () => {
    try {
      // Add any configuration settings here:
      await GoogleSignin.configure();

      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );

      // login with credential
      const currentUser = await firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential);
    } catch (e) {
      console.error(e);
    }
  };

  _facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw new Error('User cancelled request'); // Handle this however fits the flow of your app
      }

      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      // login with credential
      await firebase.auth().signInAndRetrieveDataWithCredential(credential);

    } catch (e) {
      console.error(e);
    }
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

          <Button onPress={this._googleLogin} full style={estilo.botao}>
            <Text>Login with Google</Text>
          </Button>

          <Button onPress={this._facebookLogin} full style={estilo.botao}>
            <Text>Login with Facebook</Text>
          </Button>

          <Button onPress={this._cadastro} transparent dark>
            <Text>Não tem uma conta? CADASTRE-SE</Text>
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
    backgroundColor: '#f78f03',

  }

});

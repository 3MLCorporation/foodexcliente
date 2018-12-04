import React, { Component } from 'react';
import { StyleSheet, Image} from 'react-native';
import { Container, Header, Left, Body, Right, Title, Content, Button, Text, Form, Item, Input, Label, Grid, Row, Col, Icon } from 'native-base';

import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import googleIcon from '../../images/icons8-google-logo-48.png';

export default class Login extends Component{

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

 /* _facebookLogin = async () => {
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
  };*/

  _cadastro = () => {
    this.props.navigation.navigate('Cadastro');
  };

  render() {
    return (
      <Container >
        <Content padder contentContainerStyle={estilo.principal}>
          <Grid>
            <Row style={{justifyContent: 'center',
              alignItems: 'center',}}>
              <Image source={require('../../../assets/logofoodex.png')} style={estilo.logo}/>
            </Row>
            <Row>
              <Col>
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

              <Grid>
                <Col>
                  <Button onPress={this._signIn} full style={estilo.botao}>
                    <Text>LOGIN</Text>
                  </Button>
                </Col>
                <Col>
                  <Button onPress={this._googleLogin} full style={estilo.botao} iconLeft>
                    <Text>Login com o Google</Text>
                  </Button>
                </Col>
              </Grid>
              <Button onPress={this._cadastro} transparent dark>
                <Text>Não tem uma conta? CADASTRE-SE</Text>
              </Button>

              </Col>
            </Row>
          </Grid>
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
    marginRight: 10
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
    margin: 10,

  }

});

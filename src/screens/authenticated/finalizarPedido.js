import React, { Component } from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
  List,
  ListItem,
  Icon,
  H3,
  H2,
  H1,
  Spinner,
  FooterTab,
  Footer,
  Fab,
  Grid,
  Row,
  Col,
} from 'native-base';
import { StyleSheet, Image, View, TouchableNativeFeedback} from 'react-native';
import firebase from 'react-native-firebase';
import {estilo_global} from "../../css/style_global";
import {estilo_perfil} from "../../css/perfil";

export default class FinalizarPedido extends Component{
  constructor() {
    super();
    this.ref = firebase.firestore().collection('pedidos');
    this.state = {
      userId: '',
      fornecedor: {},
      item: {},
      quantidade: 1,
      valorPedido: 0,
      loading: true,
    };
    //console.disableYellowBox = true;
  }
  componentDidMount() {
    const {userId, fornecedor, item} = this.props.navigation.state.params;
    this.setState({
      userId: userId,
      fornecedor: fornecedor,
      item: item,
      valorPedido: item.valor,
      loading: false,
    })
  }

  _diminuirQuantidade = () => {
    if(this.state.quantidade > 1){
      this.setState({
        valorPedido: this.state.item.valor * (this.state.quantidade - 1),
        quantidade: this.state.quantidade - 1,
      });
    }
  };

  _aumentarQuantidade = () => {
    this.setState({
      valorPedido: this.state.item.valor * (this.state.quantidade + 1),
      quantidade: this.state.quantidade + 1,
    });
  };

  _finalizarPedido = () => {
    const {userId, fornecedor, item, quantidade} = this.state;
    this.ref.add({
      userId: userId,
      fornecedorId: fornecedor.id,
      itemId: item.id,
      quantidade: quantidade,
    }).then((doc) => {
      console.log('Pedido cadastrado com ID: ' + doc.id);
      this.props.navigation.navigate('Principal');
    }).catch(function(error) {
      console.error("Error adding document: ", error);
    });
    console.log('Pedido finalizado');
  };

  render(){
    const {user, fornecedor, item, loading, valorPedido, quantidade} = this.state;
    return(
      <Container>
      {loading ?
        <Loading/>
      :

          <Content>
            <Text>{fornecedor.nome}</Text>
            <H3>{item.nome}</H3>
            <Text>{item.descricao}</Text>
            <Text style={{color: 'green', fontWeight: 'bold'}}>{item.valor}</Text>
            <Grid>
              <Row>
                <Button onPress={this._diminuirQuantidade}><Text>-</Text></Button>
                <Text>{quantidade}</Text>
                <Button onPress={this._aumentarQuantidade}><Text>+</Text></Button>
              </Row>
            </Grid>
          </Content>

      }
        {loading ? (<View/>) :
          <Footer style={{backgroundColor: '#f78f03'}}>
            <FooterTab>
              <Button onPress={this._finalizarPedido}>
                <Text>{'Comprar ' + quantidade + ' por ' + 'R$ ' + valorPedido}</Text>
              </Button>
            </FooterTab>
          </Footer>
        }

      </Container>
    )
  }
}

const Loading = () => (
  <View style={estilo_global.container}>
    <Spinner/>
  </View>
);

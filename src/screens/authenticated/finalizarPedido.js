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
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';
import { StyleSheet, Image, View, TouchableNativeFeedback} from 'react-native';
import firebase from 'react-native-firebase';
import {estilo_global} from "../../css/style_global";
import {estilo_perfil} from "../../css/perfil";
import empresaPequena from "../../images/icons8-empresa-de-pequena-porte-26.png";

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
      valorTotal: (item.valor * quantidade),
    }).then((doc) => {
      console.log('Pedido cadastrado com ID: ' + doc.id);
      alert('Pedido realizado com sucesso');
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

          <Content scrollEnabled={false}>
            <Grid>
              <Row size={1} style={{justifyContent: 'center',
                alignItems: 'center',}}>
                <Card style={{margin: 16}}>
                  <CardItem>
                    {/*<Thumbnail  source={{uri: empresaPequena}}/>*/}
                    <Text>{fornecedor.nome}</Text>
                  </CardItem>
                </Card>
              </Row>

              <Row  size={3} style={{justifyContent: 'center',
                alignItems: 'center',}}>
                <Card style={{}}>
                  <H1 style={{padding: 8, marginTop: 22 }}>{item.nome}</H1>
                  <Text style={{padding: 8, color: 'gray'}}>{item.descricao}</Text>
                  <H3 style={{color: 'green', fontWeight: 'bold', padding:8, marginTop: 40}}>{'R$ ' + item.valor}</H3>
                </Card>
              </Row>

              <Row size={4}>
                <Grid style={{height: 200,justifyContent: 'center',
                  alignItems: 'center'}}>
                  <Row/>
                  <Row >
                    <Button rounded  transparent onPress={this._diminuirQuantidade}><H1>-</H1></Button>
                    <H1 style={{color: 'green', paddingTop: 7, paddingHorizontal: 30}}>{quantidade}</H1>
                    <Button rounded transparent onPress={this._aumentarQuantidade}><H1>+</H1></Button>
                  </Row>
                  <Row/>
                </Grid>
              </Row>

            </Grid>
          </Content>

      }
        {loading ? (<View/>) :
          <Footer style={{backgroundColor: '#f78f03'}}>
            <FooterTab>
              <Button style={{backgroundColor: '#f78f03'}} onPress={this._finalizarPedido}>
                <H3 style={{fontWeight: 'bold'}}>{'Comprar ' + quantidade + ' por ' + 'R$ ' + valorPedido}</H3>
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

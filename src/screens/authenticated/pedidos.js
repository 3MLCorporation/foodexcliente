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
  Card,
  CardItem,
} from 'native-base';
import { StyleSheet, Image, View, TouchableNativeFeedback} from 'react-native';
import firebase from 'react-native-firebase';
import {estilo_global} from "../../css/style_global";
import {estilo_perfil} from "../../css/perfil";
import MapCallout from "react-native-maps/lib/components/MapCallout";

export default class Pedidos extends Component{
  constructor() {
    super();
    this.pedidosRef = firebase.firestore().collection('pedidos');
    this.fornecedoresRef = firebase.firestore().collection('fornecedores');
    this.state = {
      userId: firebase.auth().currentUser.uid,
      pedidos: [],
      loading: true,
      receivedDataConfirmation: 0,
    };
    //console.disableYellowBox = true;
  }
  componentDidMount() {
    this._getPedidos();
  }


  //TODO Melhorar isso aqui
  _getPedidos = () =>{
    /*this.setState({
        loading: true,
    });*/
    console.log('***getPedidos chamado*** -> ' + this.state.userId);
    this.pedidosRef.where("userId", "==", this.state.userId).get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          console.log('Nenhum pedido cadastrado!');
        } else {
          let pedidos = [];
          querySnapshot.forEach((pedidoDoc) => {
            const {fornecedorId, itemId, quantidade, valorTotal} = pedidoDoc.data();

            let fornecedor = {};
            fornecedor.id = fornecedorId;
            this.fornecedoresRef.doc(fornecedorId).get().
              then(doc => {
              const {name} = doc.data();
              fornecedor.nome = name;

              console.log(name);
              this.setState({
                receivedDataConfirmation: this.state.receivedDataConfirmation + 1,
              });

              let item = {};
              item.id = itemId;
              this.fornecedoresRef.doc(fornecedorId).collection('cardapio').doc(itemId).get()
                .then(doc => {
                  const {nome} = doc.data();
                  item.nome = nome;
                  console.log(nome);
                  this.setState({
                    receivedDataConfirmation: this.state.receivedDataConfirmation + 1,
                  });

                  console.log(fornecedor.nome);
                  console.log(item.nome);

                  pedidos.push({
                    id: pedidoDoc.id,
                    fornecedor: fornecedor.nome,
                    item: item.nome,
                    quantidade: quantidade,
                    valorTotal: valorTotal,
                  });

                  this.setState({
                    pedidos: pedidos,
                  })
                }).
              catch(err => {
                console.log('Error getting document', err);
                this._mapa();
              });


              }).
              catch(err => {
                console.log('Error getting document', err);
                this._mapa();
              });
          });


        }
      })
      .catch(err => {
        console.log('Error getting document', err);
        this._mapa();
      });
  };

  _mapa = () =>{
    this.props.navigation.navigate('Principal');
  };

  render(){
    /* this.willFocus = this.props.navigation.addListener(
       'willFocus',
       () => {
         this._getCardapio()
       }
     );
 */
    const isEmpty = this.state.pedidos.length <= 0 && this;
    if(isEmpty){
      return(
        <Content padder contentContainerStyle={estilo.principal}>
          <Text>Nenhum pedido feito!</Text>
          <Button style={estilo.botao} full onPress={this._mapa}>
            <Text>Voltar para o mapa</Text>
          </Button>
        </Content>
      );

    }else{
      return(
        <Container>
          {this.state.receivedDataConfirmation < 2 ? (
            <Spinner color='orange'/>
          ) : (

            <Content padder contentContainerStyle={estilo.principal}>
              {console.log(this.state.pedidos)}
              {this.state.pedidos.map( pedido => (
                <Card key={pedido.id}>
                  <Text>{pedido.fornecedor}</Text>
                  <Text>{pedido.item}</Text>
                  <Text>{pedido.quantidade}</Text>
                  <Text>{ 'R$ ' + pedido.valorTotal}</Text>
                </Card>
              ))}
              </Content>
          )}
        </Container>
      )
    }

  }

}

const estilo = StyleSheet.create(Object.assign({}, estilo_global, estilo_perfil, {}));

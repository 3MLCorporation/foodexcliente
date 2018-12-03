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
} from 'native-base';
import { StyleSheet, Image, View, TouchableNativeFeedback} from 'react-native';
import firebase from 'react-native-firebase';
import {estilo_global} from "../../css/style_global";
import {estilo_perfil} from "../../css/perfil";
import MapCallout from "react-native-maps/lib/components/MapCallout";

export default class Cardapio extends Component{
  constructor() {
    super();
    this.ref = firebase.firestore().collection('fornecedores');
    this.state = {
      userId: firebase.auth().currentUser.uid,
      fornecedor : '',
      cardapio: [],
      loading: true,
    };
    //console.disableYellowBox = true;
  }
  componentDidMount() {
    const {fornecedorId} = this.props.navigation.state.params;
    this.ref.doc(fornecedorId).get()
      .then(documentSnapshot => {
        //console.log(documentSnapshot.data())
        const {name, description} = documentSnapshot.data();
        const fornecedor = {
          id: fornecedorId,
          nome: name,
          descricao: description
        };
        console.log(documentSnapshot.data());
        this.setState({
          fornecedor: fornecedor,
        });

        this._getCardapio();
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
    console.log('Cardapio - fornecedor -> ' + fornecedorId);
  }

  _getCardapio = () =>{
    /*this.setState({
        loading: true,
    });*/
    console.log('***getCardapio chamado*** -> ' + this.state.fornecedor.id);
    this.ref.doc(this.state.fornecedor.id).collection('cardapio').get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          console.log('Nenhum item cadastrado!');
          this.setState({
            loading: false,
          });
        } else {
          let cardapio = [];
          querySnapshot.forEach((itemDoc) => {
            console.log(itemDoc.id, " => ", itemDoc.data());
            const {nome, valor, descricao} = itemDoc.data();
            let item = {
              id: itemDoc.id,
              nome: nome,
              valor: valor,
              descricao: descricao,
              //itens: []
            };
            /*this.ref.doc(this.state.user.uid).collection('cardapio').doc(categoriaDoc.id).collection('itens').get()
                .then(querySnapshot => {

                    if (querySnapshot.empty) {
                        console.log(categoriaDoc.id + 'Nenhum item cadastrado!');
                    } else{
                        let itens = [];
                        querySnapshot.forEach((itemDoc) => {
                            console.log(itemDoc.id, " => ", itemDoc.data());
                            const {nome, valor} = itemDoc.data();
                            itens.push({
                                id: itemDoc.id,
                                nome: nome,
                                valor: valor,
                            })
                        });
                        categoria.itens = itens;
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });*/
            cardapio.push(
              item
            );
          });
          this.setState({
            cardapio: cardapio,
            loading: false,
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

  _escolherItem = (item) => {
    const {userId, fornecedor} = this.state;
    this.props.navigation.navigate('FinalizarPedido', {
      userId: userId,
      fornecedor: fornecedor,
      item: item,
    });
  };

  render(){
   /* this.willFocus = this.props.navigation.addListener(
      'willFocus',
      () => {
        this._getCardapio()
      }
    );
*/
    if(this.state.loading){
      return(<Spinner color='orange'/>);
    }else{/*
            let semItem = true;
            this.state.cardapio.map( categoria => {
                if(categoria.itens.length > 0){
                    semItem = false;
                }
            });*/
      const isEmpty = this.state.cardapio.length <= 0 && this;

      return(
        <Container>
          {isEmpty ? (
            <Content padder contentContainerStyle={estilo.principal}>
              <Text>Nenhum prato cadastrado!</Text>
              <Button style={estilo.botao} full onPress={this._mapa}>
                <Text>Voltar para o mapa</Text>
              </Button>
            </Content>
          ) : (
            <Content padder contentContainerStyle={estilo.principal}>

              {console.log(this.state.cardapio)}

              <List dataArray={this.state.cardapio} renderRow={(item) =>
                <ListItem key={item.id}>
                  <TouchableNativeFeedback onPress={ () => this._escolherItem(item)}>
                    <Body background={TouchableNativeFeedback.SelectableBackground()}>
                      <Text>{item.nome}</Text>
                      <Text note numberOfLines={2}>{item.descricao}</Text>
                      <Text style={{color: 'green', fontWeight: 'bold'}}>R$ {item.valor}</Text>
                    </Body>
                  </TouchableNativeFeedback>
                  {/*<Right>
                      <Button transparent warning>
                          <Icon name="add" onPress={() => this._cadastrarItem(item.id)} />
                      </Button>
                  </Right>*/}
                </ListItem>
              }/>
            </Content>
          )}
        </Container>
      )
    }

  }

}

const estilo = StyleSheet.create(Object.assign({}, estilo_global, estilo_perfil, {}));

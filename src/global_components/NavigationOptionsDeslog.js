import React, { Component } from 'react';
import { StyleSheet} from 'react-native';
import { Header, Left, Body, Right, Title, Text, Icon} from 'native-base';
import {estilo_global} from "../css/style_global";


export class NavigationOptionsDeslog extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Header style={estilo.header}  androidStatusBarColor='#bf6b03'>
        <Left/>
        <Body>
        <Title>{this.props.titulo}</Title>
        </Body>
        <Right />
      </Header>
    )
  }

}

const estilo = StyleSheet.create(Object.assign({}, estilo_global, {}));

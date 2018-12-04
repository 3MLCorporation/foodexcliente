import { createStackNavigator } from 'react-navigation';
import React from "react";

import {NavigationOptionsLog} from "../../global_components/NavigationOptionsLog";

import Principal from './principal';
import Cardapio from './cardapio';
import FinalizarPedido from './finalizarPedido';
import Pedidos from './pedidos';

export default createStackNavigator({
  Principal: {
    screen: Principal,
    navigationOptions: () => ({
      header: <NavigationOptionsLog titulo="FoodEx"/>
    }),
  },
  Cardapio: {
    screen: Cardapio,
    navigationOptions: () => ({
      header: <NavigationOptionsLog titulo="Cardápio"/>
    }),
  },
  FinalizarPedido: {
    screen: FinalizarPedido,
    navigationOptions: () => ({
      header: <NavigationOptionsLog titulo="Finalizar pedido"/>
    }),
  },
  Pedidos: {
    screen: Pedidos,
    navigationOptions: () => ({
      header: <NavigationOptionsLog titulo="Histórico de pedidos"/>
    }),
  },
});

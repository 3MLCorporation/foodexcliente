import { StackNavigator } from 'react-navigation';
import React from "react";

import {NavigationOptionsLog} from "../../global_components/NavigationOptionsLog";

import Principal from './principal';
import Cardapio from './cardapio';
import FinalizarPedido from './finalizarPedido';

export default StackNavigator({
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
});

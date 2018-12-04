import { createStackNavigator } from 'react-navigation';
import React from "react";

import Login from './login';
import Cadastro from './cadastro';
import {NavigationOptionsDeslog} from "../../global_components/NavigationOptionsDeslog";

export default createStackNavigator({
    Login: {
      screen: Login,
      navigationOptions: () => ({
        header: <NavigationOptionsDeslog titulo="FoodEx"/>
      }),
    },
    Cadastro: {
      screen: Cadastro,
      navigationOptions: () => ({
        header: <NavigationOptionsDeslog titulo="FoodEx"/>
      }),
    },
});

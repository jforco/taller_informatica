import React from 'react';
import { View, Text, Button} from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MapaScreen from './screens/Mapa';
import IniciarScreen from './screens/Iniciar';
import LoginScreen from './screens/Login';
import PedidoScreen from './screens/Pedidos';
import HomeScreen from './screens/Home';
import AuthLoadingScreen from './screens/Auth';
import VerScreen from './screens/Ver';

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Mapa: MapaScreen,
    Iniciar: IniciarScreen,
    Pedidos: PedidoScreen,
    Ver: VerScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AuthStack = createStackNavigator({ Login: LoginScreen });

global._fetch = fetch;
global.fetch = function(uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};


export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

{/*export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}*/
}

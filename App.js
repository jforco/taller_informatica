import React from 'react';
import { View, Text, Button} from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MapaScreen from './screens/Mapa';
import IniciarScreen from './screens/Iniciar';
import LoginScreen from './screens/Login';
import PedidoScreen from './screens/Pedidos';
import HomeScreen from './screens/Home';
import AuthLoadingScreen from './screens/Auth';
import ExampleScreen from './screens/Example';

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Mapa: ExampleScreen,
    Iniciar: IniciarScreen,
    Pedidos: PedidoScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AuthStack = createStackNavigator({ Login: LoginScreen });

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

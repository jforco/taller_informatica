import React from 'react';
import { View, Text, Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class PedidoScreen extends React.Component {
  static navigationOptions = {
    title: 'Pedidos',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Pedidos Screen</Text>

      </View>
    );
  }
}
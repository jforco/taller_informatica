import React from 'react';
import { View, Text, Button, AsyncStorage} from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class PedidoScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userOrders = await AsyncStorage.getItem('userOrders');
    if(userOrders){
      this.props.navigation.navigate('Pedidos');
    } else {
      alert('No tienes pedidos.  Por favor, inicia el Recorrido');
      this.props.navigation.navigate('Home');
    }
  };

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
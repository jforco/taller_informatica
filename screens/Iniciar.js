import React from 'react';
import { View, Text, Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class IniciarScreen extends React.Component {
  static navigationOptions = {
    title: 'Iniciar Recorrido',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Iniciar recorrido Screen</Text>
        <Button
          title="pedidos"
          onPress={() => this.props.navigation.navigate('Pedidos')}
        />
      </View>
    );
  }
}
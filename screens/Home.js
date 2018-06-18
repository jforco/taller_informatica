import React from 'react';
import { View, Text, Button, StyleSheet, AsyncStorage} from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home - FamiUni',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
          title="Iniciar Recorrido"
          onPress={() => this.props.navigation.navigate('Iniciar')}
        />
        <Button
          title="Lista de Pedidos"
          onPress={() => this.props.navigation.navigate('Pedidos')}
        />
        <Button
          title="Mapa"
          onPress={() => this.props.navigation.navigate('Mapa')}
        />
        <Button
          title="Cerrar Sesión"
          onPress={this.cerrar_sesion}
        />
        <Text>Menu principal</Text>
      </View>
      
    );
  }
  cerrar_sesion = () => {
    const userToken = AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },


});
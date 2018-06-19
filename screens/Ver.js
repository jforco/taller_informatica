import React from 'react';
import { StyleSheet, FlatList, Text, View, Platform, Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class VerPedidoScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    const pedido = navigation.getParam('pedido', null);
    
    return (
      	<View style={styles.container}>
	        <Text>Pedido: {pedido.id}</Text>
	        <Text>Cliente: {pedido.nombre}</Text>
	        <Text>Telefono: {pedido.telefono}</Text>
	        <Text>Direccion: {pedido.direccion}</Text>
          <Text>Latitud: {pedido.lat}</Text>
          <Text>Longitud: {pedido.lng}</Text>
	        <FlatList
	          data={ pedido.pedido }
	          ItemSeparatorComponent = {this.FlatListItemSeparator}
	          renderItem={({item}) => 
	              <View>
	                <Text style={styles.FlatListItemStyle}>Producto: {item.nombre} </Text>
	                <Text style={styles.FlatListItemStyle}>Cantidad: {item.cantidad} </Text>
	                <Text style={styles.FlatListItemStyle}>Importe subtotal: {item.total} </Text>
	              </View>
	          }
	          keyExtractor={(item, index) => index}          
	         />
	        <Text>Importe Total: {pedido.total}</Text>
          <Button
            title="Ver ruta"
            onPress={() => this.props.navigation.navigate('Mapa',{ lat: pedido.lat, lng: pedido.lng})}
          />
      	</View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },

  FlatListItemStyle: {
    fontSize: 12,
  },
});


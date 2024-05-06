
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  Button,
  FlatList
} from 'react-native';
import boutique, { listProduitDansPanier } from './boutique';

const ProduitPics = (props) => {
    const DessertDefaut ="https://i0.wp.com/breezybakes.com/wp-content/uploads/2015/03/gluten-free-vanilla-cake-with-raspberry-filling.jpg "; 
    let pic = props.uriPic ? props.uriPic : DessertDefaut ;
    return <Image style={styles.imageFormat}  source={{ uri: pic } }/>
  }

  const Produit = (props) => {
    return (
      <View style= {styles.DessertContainer}>
      <ProduitPics uriPic= {props.uriPic}/> 
      <Text style={{ fontSize: 20, padding: 10}} >{props.name}</Text>
      </View>
  
    );
  }

const CartScreen = ({ navigation}) => {
    const [cartItems, setCartItems] = useState([]);

    useState(() => {
        setCartItems(listProduitDansPanier);
    }, []);
    /*useEffect(() => {
        setCartItems(listProduitDansPanier);
      }, [listProduitDansPanier]);*/
    const getTotalPrice = () => {
        if (!cartItems || cartItems.length === 0) {
            console.log("Panier vide")
          return 0;
          
        }
        return cartItems.reduce((total, item) => total + item.prix, 0);
      };
      return (
        <View>
          <Text>Votre panier :</Text>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <View>
                <Text>{item.nom}</Text>
                <Text>{item.prix}$</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <Text>Total: {getTotalPrice()}$</Text>
          <Button title="Passer la commande" onPress={() => {/* Logique pour passer la commande */}} />
        </View>
      );
    };
    
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default CartScreen;

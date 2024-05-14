import * as React from "react";
import { useState, useEffect, useContext } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  Button,
  FlatList,
} from "react-native";
//import boutique, { listProduitDansPanier } from './boutique';
//import { AfficherPanier } from './boutique';
import { usePanierContext } from "./global";

const ProduitPics = (props) => {
  const DessertDefaut =
    "https://i0.wp.com/breezybakes.com/wp-content/uploads/2015/03/gluten-free-vanilla-cake-with-raspberry-filling.jpg ";
  let pic = props.uriPic ? props.uriPic : DessertDefaut;
  return <Image style={stylesPanier.imagePanier} source={{ uri: pic }} />;
};


const CartItem = ({ item, addToCart, removeFromCart }) => {
  return (
    <View style={stylesPanier.containerItem}>
      <View style={stylesPanier.itemInfo}>
        <ProduitPics uriPic={item.image} />
        <View style={stylesPanier.itemDetails}>
          <Text>{item.nom}</Text>
          <Text>{item.prix}$</Text>
        </View>
      </View>
      <View style={stylesPanier.itemControls}>
        
        <TouchableOpacity
          style={stylesPanier.buttonQuantite}
          onPress={() => addToCart(item)}
        >
          <Text style={stylesPanier.buttonText}>+</Text>
        </TouchableOpacity>
        <Text>{item.quantite}x</Text>
        <TouchableOpacity
          style={stylesPanier.buttonQuantite}
          onPress={() => removeFromCart(item)}
        >
          <Text style={stylesPanier.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <Text style={stylesPanier.itemTotal}>{getTotalPriceForItem(item)}$</Text>
    </View>
  );
};

const getTotalPriceForItem = (item) => {
  return (item.prix * item.quantite).toFixed(2);
};



const CartScreen = ({ navigation }) => {
  const { panier, setPanier } = usePanierContext();

  /*
  const getTotalQuantity = () => {
    const quantities = {};
    panier.forEach((item) => {
      if (quantities[item.id]) {
        quantities[item.id]++;
      } else {
        quantities[item.id] = 1;
      }
    });
    return quantities;
  };*/

  const addToCart = (product) => {
    const index = panier.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      const newCart = panier.map((item, idx) => {
        if (idx === index) {
          return { ...item, quantite: item.quantite + 1 };
        }
        return item;
      });
      setPanier(newCart);
    } else {
      setPanier((prevState) => [...prevState, { ...product, quantite: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const index = panier.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      const newCart = [...panier];
      if (newCart[index].quantite > 1) {
        newCart[index].quantite--;
      } else {
        newCart.splice(index, 1);
      }
      setPanier(newCart);
    }
  };
  /*
  const getTotalPrice = () => {
    if (!panier || panier.length === 0) {
      return 0;
    }
    const totalPrice = panier.reduce((total, item) => {
      console.log("Item:", item);
      console.log("Total:", total);
      console.log("Total Price for Item:", getTotalPriceForItem(item));
      return total + getTotalPriceForItem(item);
    }, 0);
    console.log("Total Price:", totalPrice);
    return totalPrice !== undefined ? totalPrice.toFixed(2) : 0;

  };*/
  const getTotalPriceForItem = (item) => {
    return (item.prix * item.quantite).toFixed(2);
  };

  const getTotalPrice = () => {
    if (!panier || panier.length === 0) {
      return 0;
    }
    const totalPrice = panier.reduce((total, item) => {
      const priceForItem = getTotalPriceForItem(item);
      return total + parseFloat(priceForItem);
    }, 0);
    return totalPrice !== undefined ? totalPrice.toFixed(2) : 0;
  };

 // console.log("panier : ", JSON.stringify(panier));

  return (
    <View>
      <Text>Votre panier :</Text>
      <FlatList
        data={panier}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text>Total: {getTotalPrice()}$</Text>
      <Button
        title="Passez la commande"
        onPress={() => {
          /* Logique pour passer la commande */
        }}
      />
    </View>
  );
};


const stylesPanier = StyleSheet.create({
  containerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemDetails: {
    marginLeft: 10,
  },
  itemTotal: {
    marginTop: 5, 
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  imagePanier: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  itemControls: {
    flexDirection: "row", 
    alignItems: "center",
  },
  buttonQuantite: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  buttonTextQuatite: {
    fontSize: 20,
  },
});
export default CartScreen;

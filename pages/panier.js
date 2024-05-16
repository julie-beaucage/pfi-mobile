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
import { usePanierContext } from "./global";
import i18n from "../translagion";

const ProduitPics = (props) => {
  const DessertDefaut =
    "https://i0.wp.com/breezybakes.com/wp-content/uploads/2015/03/gluten-free-vanilla-cake-with-raspberry-filling.jpg ";
  let pic = props.uriPic ? props.uriPic : DessertDefaut;
  return <Image style={stylesPanier.imagePanier} source={{ uri: pic }} />;
};
const CartItem = ({ item, addToCart, removeFromCart }) => {
  return (
    <View style={stylesPanier.containerItem}>
      <View>
        <View style={stylesPanier.itemInfo}>
          <ProduitPics uriPic={item.image} />
          <View style={stylesPanier.itemDetails}>
            <Text style ={stylesPanier.panierText}>{item.nom}</Text>
            <Text style ={stylesPanier.panierText} >{item.prix}$</Text>
          </View>
        </View>
        <View>
          <View style={stylesPanier.itemControls}>
            <TouchableOpacity
              style={stylesPanier.buttonQuantite}
              onPress={() => addToCart(item)}
            >
              <Text style={stylesPanier.buttonText}>+</Text>
            </TouchableOpacity>
            <Text style ={stylesPanier.panierText}>{item.quantite}x</Text>
            <TouchableOpacity
              style={stylesPanier.buttonQuantite}
              onPress={() => removeFromCart(item)}
            >
              <Text style={stylesPanier.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={stylesPanier.itemTotal}>{prixTotalParItem(item)}$</Text>
    </View>
  );
};

const prixTotalParItem = (item) => {
  return (item.prix * item.quantite).toFixed(2);
};

const CartScreen = ({ navigation }) => {
  const { panier, setPanier } = usePanierContext();

  const viderPanier = () => {
    setPanier([]);
  };

  const CalculerTaxe = (subtotal) => {
    const TPS = 0.05;
    const TVQ = 0.09975;
    const tps = subtotal * TPS;
    const tvq = subtotal * TVQ;
    const tpsRounded = tps.toFixed(2);
    const tvqRounded = tvq.toFixed(2);
    const result = parseFloat(tpsRounded) + parseFloat(tvqRounded);
    return result.toFixed(2);
  };
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

  const getSousTotal = () => {
    if (!panier || panier.length === 0) {
      return 0;
    }
    const totalPrice = panier.reduce((total, item) => {
      const priceForItem = prixTotalParItem(item);
      return total + parseFloat(priceForItem);
    }, 0);
    return totalPrice !== undefined ? totalPrice.toFixed(2) : 0;
  };

  const getTotal = () => {
    let result = 0;
    const subtotal = getSousTotal();
    const taxes = CalculerTaxe(subtotal);
    result = parseFloat(subtotal) + parseFloat(taxes);
    result = parseFloat(result.toFixed(2));
    return result;
  };

  const handleOrder = () => {
    const totalAmount = getTotal();
    navigation.navigate("OrderConfirmation", { totalAmount });
    viderPanier();
  };

  return (
    <View style={stylesPanier.panierContainer}>
      <Text style={stylesPanier.panierTitre}>{i18n.t("panier")}</Text>
      <FlatList
        data={panier}
        style={{ backgroundColor:"#ffc0cb"}}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        )}
        keyExtractor={(item) => (item.id ? item.id.toString() : "")}
      />
      <Text style={{ color: "#ff1493", fontSize: 35 }}>{i18n.t("resumerPanier")}</Text>
      <View style={stylesPanier.totauxContaier}>
        <Text style ={stylesPanier.panierText}>{i18n.t("sousTotal")}: {getSousTotal()}$ </Text>
        <Text style ={stylesPanier.panierText}>{i18n.t("tax")}{CalculerTaxe(getSousTotal())}$</Text>
        <Text style ={stylesPanier.panierText}>{i18n.t("total")}: {getTotal()}$</Text>
      </View>
      <Button title={i18n.t("buttonCommand")} onPress={handleOrder} />
      <Button title={i18n.t("buttonClear")} onPress={viderPanier} color="red" />
    </View>
  );
};

const stylesPanier = StyleSheet.create({
  panierContainer: {
    backgroundColor: "#98fb98",
    flex: 1,
  },
  panierTitre: {
    fontSize: 30,
    color: "#ff1493"
  },
  containerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#d8bfd8",
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
    fontSize: 18,
    fontWeight: 'bold',
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
 panierText:{
  fontSize: 18,
  fontWeight: 'bold',
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
  totauxContaier: {
   borderTopColor:"#ff1493",
   borderTopWidth:2
  },
});
export default CartScreen;

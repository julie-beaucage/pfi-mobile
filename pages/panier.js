import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  Button,
  FlatList,
} from "react-native";
import { usePanierContext } from "./global";
import i18n, { currencyFormatter } from "../translagion";

const ProduitPics = (props) => {
  const DessertDefaut =
    "https://i0.wp.com/breezybakes.com/wp-content/uploads/2015/03/gluten-free-vanilla-cake-with-raspberry-filling.jpg ";
  let pic = props.uriPic ? props.uriPic : DessertDefaut;
  return <Image style={stylesPanier.imagePanier} source={{ uri: pic }} />;
};

const CartItem = ({ item, ajouterItem,enleverItem, supprimerDuPanier }) => {

  const confirmDeleteItem = () => {
    Alert.alert(
      i18n.t("alerteTitre"),
      i18n.t("alerteMessage"),
      [
        {
          text:   i18n.t("alerteCancer"),
          style: "cancel",
        },
        {
          text: i18n.t("alerteYes"),
          onPress: () => supprimerDuPanier(item),
        },
      ]
    );
  };

  return (
    <View style={stylesPanier.containerItem}>
      <View >
        <View style={stylesPanier.itemInfoContainer}>
          <ProduitPics uriPic={item.image} />
          <View style={stylesPanier.itemDetails}>
            <Text style ={stylesPanier.panierText}>{item.nom}</Text>
            <Text style ={stylesPanier.panierText} >{item.prix}$</Text>
          </View >
          <View style={stylesPanier.containerPrice}>
            <Text style={stylesPanier.label}>{i18n.t("total")} </Text>
            <Text style={stylesPanier.itemTotal}>{currencyFormatter.format(prixTotalParItem(item))}</Text>
          </View>
        </View>
        <View>
          <Text style={{ color:"white",marginLeft:15,fontWeight:'bold'}}>{i18n.t("quantite")}</Text>
          <View style={stylesPanier.itemControls}>
          <TouchableOpacity
              style={stylesPanier.buttonQuantite}
              onPress={() => enleverItem(item)}
            >
            <Text style={stylesPanier.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style ={stylesPanier.panierText}>{item.quantite} x </Text>
            <TouchableOpacity
              style={stylesPanier.buttonQuantite}
              onPress={() => ajouterItem(item)}
            >
              <Text style={stylesPanier.buttonText}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={confirmDeleteItem} style={stylesPanier.deleteIcon}>
               <Ionicons name="trash-bin-outline" size={24} color={"white"} margin={4} />
               <Text style={{ color:"white",marginTop:7}} >{i18n.t("supprimer")}</Text>
             </TouchableOpacity>
          </View>
        </View>
      </View>

    </View>
  );
};

const prixTotalParItem = (item) => {
  return (item.prix * item.quantite).toFixed(2);
};

const CartScreen = ({ navigation }) => {
  const { panier, setPanier } = usePanierContext();
  const viderPanier = () => {
    Alert.alert(
      i18n.t("alerteTitre2"),
      i18n.t("alerteMessage2"),
      [
        {
          text:   i18n.t("alerteCancer"),
          style: "cancel",
        },
        {
          text: i18n.t("alerteYes"),
          onPress: () => {setPanier([]);},
        },
      ]
    );
  };
  const ajouterItem = (product) => {
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

  const enleverItem = (product) => {
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
  const supprimerDuPanier = (product) => {
    const index = panier.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      const newCart = [...panier];
      newCart.splice(index, 1); 
      setPanier(newCart);
    }
  };
  const CalculerTaxe = (subtotal) => {
    const TPS = 0.05;
    const TVQ = 0.09975;
    subtotal = parseFloat(subtotal); 
    const tps = subtotal * TPS;
    const tvq = subtotal * TVQ;
    const result = tps + tvq;
    return result;
  };

  const getSousTotal = () => {
    if (!panier || panier.length === 0) {
      return 0;
    }
    const totalPrice = panier.reduce((total, item) => {
      const priceForItem = prixTotalParItem(item);
      return total + parseFloat(priceForItem);
    }, 0);
    
    return totalPrice;
  };


  const getTotal = () => {
    const subtotal = getSousTotal();
    const taxes = CalculerTaxe(subtotal);
    const result = parseFloat(subtotal) + parseFloat(taxes);
    return currencyFormatter.format(result);
  };

  const handleOrder = () => {
    const totalAmount = getTotal();
    navigation.navigate("OrderConfirmation", { totalAmount });
    setPanier([]);
  };

  return (
    <View style={stylesPanier.panierContainer}>
      <View style={stylesPanier.titleContainer}>
      <Text style={stylesPanier.panierTitre}>{i18n.t("panier")}</Text>
      <Button title={i18n.t("buttonClear")} onPress={viderPanier} color="red" />
      </View >
      {panier.length === 0 ? (
        <View style={stylesPanier.emptyContainer}>
         <Text style={{ fontSize: 20,textAlign:'center' }}>{i18n.t("etatPanier")}</Text>
        </View> 
    ) : (
      <>
      <FlatList
        data={panier}
        style={{ backgroundColor:"#ffc0cb"}}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            ajouterItem={ajouterItem}
            enleverItem={enleverItem}
            supprimerDuPanier={supprimerDuPanier}
          />
        )}
        keyExtractor={(item) => (item.id ? item.id.toString() : "")}
      />
      <Text style={{ color: "#ff1493", fontSize: 35 }}>{i18n.t("resumerPanier")}</Text>
      <View style={stylesPanier.totauxContaier}>
        <Text style ={stylesPanier.panierText}>{i18n.t("sousTotal")}: {currencyFormatter.format(getSousTotal())}</Text>
        <Text style ={stylesPanier.panierText}>{i18n.t("tax")}: {currencyFormatter.format(CalculerTaxe(getSousTotal()))}</Text>
        <Text style ={stylesPanier.panierText}>{i18n.t("total")}: {getTotal()}</Text>
      </View>
      <Button title={i18n.t("buttonCommand")} color="#ff1493"  onPress={handleOrder} />
          </>
        )}
      </View>
  );
};

const stylesPanier = StyleSheet.create({
  panierContainer: {
    flex: 1,
  },
  titleContainer:{
    flexDirection: "row",
    justifyContent: 'space-between',
    margin:3
  },
  panierTitre: {
    fontSize: 30,
    color: "#ff1493"
  },
  emptyContainer:{
    textAlign:'center',
    backgroundColor:"#ffc0cb",
    flex:1,
    justifyContent: 'center', 
    alignItems: 'center' 

  },
  deleteIcon: {
    flexDirection: "row",
    marginLeft:40 
  },
  label: {
    //textAlign:'center',
    //backgroundColor:'pink',
    fontWeight:'bold',
    color:'white'
  },
  containerPrice:{
    justifyContent: 'center',
    alignItems: 'flex-end',
    //backgroundColor:"blue",
    //marginTop:100,
    marginLeft:10,
  },

  containerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width:'100%',
    marginTop: 10,
    //padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#d8bfd8",
  },
  itemInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    //backgroundColor:"red",
    //marginRight:10,
    width:'auto',
    //maxWidth:220,

  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
    width:300,

  },
  itemDetails: {
    //backgroundColor:"yellow",
    width:200,
    height:100
    //marginLeft: 10,
   // maxWidth: 170,
  },
  itemTotal: {
    marginTop: 5,
    fontSize: 15,
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
  padding:5,
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

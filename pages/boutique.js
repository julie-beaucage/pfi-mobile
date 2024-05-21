import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable, Image, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SnackBar from "react-native-snackbar-component";
import { Audio } from "expo-av";
import i18n from "../translagion";
import { useFonts } from "expo-font";
import { createTableProduits, insererProduits, db } from './Bd';
import { usePanierContext } from "./global";

const Stack = createNativeStackNavigator();

//const db = SQLite.openDatabase("pfi.db");

const ProduitPic = (props) => {
  const DessertDefaut =
    "https://i0.wp.com/breezybakes.com/wp-content/uploads/2015/03/gluten-free-vanilla-cake-with-raspberry-filling.jpg ";
  let pic = props.uriPic ? props.uriPic : DessertDefaut;
  return <Image style={stylesBoutique.image} source={{ uri: pic }} />;
};

const PressableProduit = ({ nom, image, prix, onPress, id }) => {
  return (
    <Pressable
      onPress={onPress}
      pressRetentionOffset={{ bottom: 10, left: 10, right: 10, top: 10 }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? "pink"
            : stylesBoutique.produitContainer,
        },
      ]}
    >
      {({ pressed }) => (
        <View style={stylesBoutique.produitContainer}>
          <ProduitPic uriPic={image} />
          <View style={stylesBoutique.produitInfo}>
            <Text style={stylesBoutique.produitNom}>{nom}</Text>
            <Text style={stylesBoutique.produitPrix}>{prix}$</Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const ProduitScreen = ({ navigation }) => {
  const [produits, setProduits] = useState([]);
  const selectAll = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * from produits",
        [],
        (_, { rows: { _array } }) => {
          console.log("select ", JSON.stringify(_array));
          setProduits(_array);
        },
        (_, error) => {
          console.log("Erreur lors de l'exécution de la requête SQL :", error);
        }
      );
    });
  };


  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT COUNT(*) AS count FROM produits",
        [],
        (_, { rows: { _array } }) => {
          const rowCount = _array[0].count;
          if (rowCount === 0) {
            insererProduits();
          } else {
            selectAll((result) => {
              setProduits(result);
            });
          }
        },
        (error) => console.error("Error checking table produits:", error)
      );
    });
  
    createTableProduits();
  
  }, []); 
  



  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#FBD3E9", "#BB377D"]}
        style={stylesBoutique.linearGradientBackground}
      >
        <Text style={stylesBoutique.appName2}>{i18n.t("shop")}</Text>
        <Text style={stylesBoutique.appName}>{i18n.t("appName")}</Text>
      </LinearGradient>
      <FlatList
        data={produits}
        style={{ backgroundColor: "#ffc0cb" }}
        renderItem={({ item }) => (
          <PressableProduit
            nom={item.nom}
            image={item.image}
            prix={item.prix}
            id={item.id}
            onPress={() =>
              navigation.navigate("ProduitDetailsScreen", {
                produitSelected: item,
              })
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const ProduitDetailsScreen = ({ route, AjouterPanier }) => {
  const { produitSelected } = route.params;
  const [sound, setSound] = useState();
  let idProduitSelecteed = produitSelected.id;

  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../sons/point.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {}
  }

  return (
    <View style={stylesBoutique.produitDetailContainer}>
      <View tyle={stylesBoutique.detailImageContainer}>
        <Image
          style={stylesBoutique.imageDetail}
          source={{ uri: produitSelected.image }}
        />
      </View>
      <Text style={stylesBoutique.nomDetail}>{produitSelected.nom}</Text>
      <Text style={stylesBoutique.prixDetail}>{produitSelected.prix} $</Text>
      <Text style={stylesBoutique.descriptionDetail}>
        {produitSelected.description}
      </Text>
      <Button
        title={i18n.t("addCart")}
        color="#f08080"
        onPress={() => {
          playSound();
          AjouterPanier(produitSelected);
        }}
      />
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function BoutiqueScreen() {
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const { panier, setPanier } = usePanierContext();

  const AjouterPanier = (product) => {
    const index = panier.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      const nouveauPanier = [...panier];
      nouveauPanier[index].quantite += 1;
      setPanier(nouveauPanier);
    } else {
      setPanier((prevState) => [...prevState, { ...product, quantite: 1 }]);
    }
    let nom = product.nom;
    const message = i18n.t('snackbar', { nom: product.nom });
   // setSnackBarMessage({i18n.t('snackbar', { nom })});
    //const message = i18n.t('snackbar', { item: { Name: product.nom  } });

    //{i18n.t('orderConfirmation', { totalAmount })}
    setSnackBarMessage(message);
    //setSnackBarMessage(`SquishMallow ${product.nom} a été ajouté au panier`);
    setSnackBarVisible(true);
  };
  useEffect(() => {
    if (snackBarVisible) {
      const timer = setTimeout(() => {
        setSnackBarVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [snackBarVisible]);

  const [fontsLoaded] = useFonts({
    "my-custom-font": require("../assets/fonts/test.ttf"),
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#ffc0cb" }}>
      <SnackBar
        visible={snackBarVisible}
        textMessage={snackBarMessage}
        autoHidingTime={3000}
        backgroundColor="#333"
        accentColor="#FFD700"
      />
      <Stack.Navigator initialRouteName="BoutiqueScreen">
        <Stack.Screen
          name="Produit"
          component={ProduitScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProduitDetailsScreen"
          options={({ route }) => ({ title: i18n.t("return") })}
        >
          {(props) => (
            <ProduitDetailsScreen
              {...props}
              AjouterPanier={AjouterPanier}
              setSnackBarVisible={setSnackBarVisible}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </View>
  );
}

const stylesBoutique = {
  produitContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "#afeeee",
  },
  linearGradientBackground: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    height: 120,
  },

  produitInfo: {
    marginLeft: 10,
  },
  produitNom: {
    fontSize: 18,
    fontWeight: "bold",
  },
  produitPrix: {
    fontSize: 16,
    color: "green",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  detailImageContainer: {},
  produitDetailContainer: {
    backgroundColor: "pink",
    alignItems: "center",
    height: "100%",
    overflow: "scroll",
  },
  imageDetail: {
    resizeMode: "cover",
    marginTop: 10,
    width: 350,
    height: 300,
    borderRadius: 10,
  },
  nomDetail: {
    fontSize: 18,
    fontWeight: "bold",
  },
  prixDetail: {
    fontSize: 16,
    color: "green",
  },
  descriptionDetail: {
    padding: 10,
    fontSize: 16,
  },
  appName: {
    fontSize: 30,
    color: "#afeeee",
    width: "100",
    fontFamily: "my-custom-font",
  },
  appName2: {
    fontSize: 30,
    color: "#afeeee",
    width: "100",
    fontFamily: "my-custom-font",
  },
};

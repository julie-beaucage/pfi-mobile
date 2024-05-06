import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, Image,Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SnackBar from 'react-native-snackbar-component'
import { NavigationContainer } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';
import dbPfi, { RemplirTableProduits } from '.pages/bd';

const Stack = createNativeStackNavigator();

const ProduitPic = (props) => {
  const DessertDefaut = "https://i0.wp.com/breezybakes.com/wp-content/uploads/2015/03/gluten-free-vanilla-cake-with-raspberry-filling.jpg ";
  let pic = props.uriPic ? props.uriPic : DessertDefaut;
  return <Image style={stylesBoutique.image} source={{ uri: pic }} />
}

const PressableProduit = ({ nom, image, prix, onPress }) => {
  console.log(nom);
  return (
    <Pressable
      onPress={onPress}
      pressRetentionOffset={{ bottom: 10, left: 10, right: 10, top: 10 }}
      style={({ pressed }) => [
        { backgroundColor: pressed ? "pink" : stylesBoutique.cruiseLineContainer }
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
    try {
      dbPfi.transaction(tx => {
        tx.executeSql("SELECT * from produits", [],
          (_, { rows: { _array } }) => {
            console.log("select ", JSON.stringify(_array));
            setProduits(_array);
          }); 
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    RemplirTableProduits();
    selectAll();
  }, []);

  return (
    <FlatList
      data={produits}
      ListHeaderComponent={() => (
        <LinearGradient
        colors={['#FBD3E9', '#BB377D']}
          style={stylesBoutique.linearGradientBackground}
        >
          <Text style={stylesBoutique.appName}>Squismallow Dream</Text>
        </LinearGradient>
      )}
      renderItem={({ item }) => (
        <PressableProduit
          nom={item.nom}
          image={item.image}
          prix={item.prix}
          onPress={() => navigation.navigate('ProduitDetailsScreen', { produitSelected: item })}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
  
};
const ProduitDetailsScreen = ({ route,AjouterPanier }) => {
  const { produitSelected } = route.params;

  return (
    <View style={stylesBoutique.produitDetailContainer}>
      <View tyle={stylesBoutique.detailImageContainer}>
        <Image style={stylesBoutique.imageDetail} source={{ uri: produitSelected.image }} />
      </View>
      <Text style={stylesBoutique.nomDetail}>{produitSelected.nom}</Text>
      <Text style={stylesBoutique.prixDetail}>{produitSelected.prix} $</Text>
      <Text style={stylesBoutique.descriptionDetail}>{produitSelected.description}</Text>
      <Button title="Ajouter au panier" onPress={() => {AjouterPanier(produitSelected )}} />
    </View>
  );
};

const Tab = createBottomTabNavigator();
export let listProduitDansPanier = [];

export default function BoutiqueScreen() {
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const AjouterPanier = (product) => {
    listProduitDansPanier =([...listProduitDansPanier, product]);
    setSnackBarVisible(true);
  };
  return (
    <View style={{ flex: 1 }}>
    <SnackBar
      visible={snackBarVisible}
      textMessage="Item ajouté au panier"
      autoHidingTime={3000}
      backgroundColor="#333"
      accentColor="#FFD700"
    />
    <Stack.Navigator>
      <Stack.Screen name="Produit" component={ProduitScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProduitDetailsScreen" options={({ route }) => ({ title: route.params.produitSelected.produitSelected })}>
          {(props) => <ProduitDetailsScreen {...props} AjouterPanier={AjouterPanier} />}
      </Stack.Screen>
    </Stack.Navigator>
    </View>
  );

}

const stylesBoutique = {
  produitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  linearGradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },

  produitInfo: {
    marginLeft: 10,
  },
  produitNom: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  produitPrix: {
    fontSize: 16,
    color: 'green',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  detailImageContainer:{


  },
  produitDetailContainer: {
     backgroundColor:'pink',
     alignItems:'center',
     height:'100%',
     overflow:'scroll'
  },
  imageDetail: {
    resizeMode: 'cover',
    marginTop:10,
    width: 350,
    height: 300,
    borderRadius: 10,

  },
  nomDetail: {
    fontSize: 18,
    fontWeight: 'bold',
  },
 prixDetail: {
    fontSize: 16,
    color: 'green',
  },
  descriptionDetail:{
    padding:10,
    fontSize:16

  },
  appName: {
    marginTop: 35,
    fontSize: 30,
    color: 'white',
    width: '100'
  }
}
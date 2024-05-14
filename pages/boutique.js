import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, Image,Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SnackBar from 'react-native-snackbar-component'
import someAudioFile from '../sons/point.mp3';
import { NavigationContainer } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

//import { RemplirTableProduits } from './Bd';
import { usePanierContext } from './global';

const Stack = createNativeStackNavigator();

const dbPfi = SQLite.openDatabase("pfi2.db");



  dbPfi.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS produits (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, description TEXT, prix INTEGER, image TEXT);',
      [],
      () => console.log('Table produits créée avec succès'),
      error => console.error('Erreur lors de la création de la table produits:', error)
    );
  });



  dbPfi.transaction(tx => {
    tx.executeSql('DELETE FROM produits;', [], () => {
      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        ["Miriam le chat petit gâteau", "Cette peluche ultra-compressible est fabriquée avec des matériaux de haute qualité et ultra-doux. Ajoutez cette adorable peluche à votre collection Squishmallows. Cet objet de collection est parfait pour les fans de Squishmallows de tous âges. La peluche douce est parfaite pour se blottir tout en se relaxant à la maison, en regardant un film, pendant les longs trajets en voiture, les soirées pyjama, les trajets en avion et pour s'amuser à l'ancienne !",  16.99, "https://www.toysrus.ca/dw/image/v2/BDFX_PRD/on/demandware.static/-/Sites-toys-master-catalog/default/dw9a00bdc6/images/4446E8A5_1.jpg"],
        null,
        (_, error) => console.error('Erreur lors de l\'ajout du produit:', error)
      );
      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        ["Monica l'axolotl violet", "Cette peluche ultra-compressible est fabriquée avec des matériaux de haute qualité et ultra-doux. Ajoutez cette adorable peluche à votre collection Squishmallows. Cet objet de collection est parfait pour les fans de Squishmallows de tous âges. La peluche douce est parfaite pour se blottir tout en se relaxant à la maison, en regardant un film, pendant les longs trajets en voiture, les soirées pyjama, les trajets en avion et pour s'amuser à l'ancienne !", 16.99, "https://www.toysrus.ca/dw/image/v2/BDFX_PRD/on/demandware.static/-/Sites-toys-master-catalog/default/dwaae6cde1/images/F4BFAA1F_1.jpg"],
        null,
        (_, error) => console.error('Erreur lors de l\'ajout du produit:', error)
      );
    });
  });

const ProduitPic = (props) => {
  const DessertDefaut = "https://i0.wp.com/breezybakes.com/wp-content/uploads/2015/03/gluten-free-vanilla-cake-with-raspberry-filling.jpg ";
  let pic = props.uriPic ? props.uriPic : DessertDefaut;
  return <Image style={stylesBoutique.image} source={{ uri: pic }} />
}

const PressableProduit = ({ nom, image, prix, onPress }) => {
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
    dbPfi.transaction(tx => {
      tx.executeSql("SELECT * from produits", [], (_, { rows: { _array } }) => {
        //console.log("select ", JSON.stringify(_array));
        setProduits(_array);
      },
      (_, error) => {
        console.log("Erreur lors de l'exécution de la requête SQL :", error);
      }); 
    });
  }
  useEffect(() => {
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
          <Text style={stylesBoutique.appName}>Squismallow Dreams</Text>
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
  const [sound, setSound] = useState();
  async function playSound() {
    try {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(
        require("../sons/point.mp3")
      );
      setSound(sound);
      console.log('Sound loaded successfully');
      await sound.playAsync();
      console.log('Sound played successfully');
    } catch (error) {
      console.log('Error while playing sound:', error);
    }
  }

  return (
    <View style={stylesBoutique.produitDetailContainer}>
      <View tyle={stylesBoutique.detailImageContainer}>
        <Image style={stylesBoutique.imageDetail} source={{ uri: produitSelected.image }} />
      </View>
      <Text style={stylesBoutique.nomDetail}>{produitSelected.nom}</Text>
      <Text style={stylesBoutique.prixDetail}>{produitSelected.prix} $</Text>
      <Text style={stylesBoutique.descriptionDetail}>{produitSelected.description}</Text>
      <Button title="Ajouter au panier" onPress={playSound} />
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function BoutiqueScreen() {
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const { panier, setPanier } = usePanierContext(); 
  const AjouterPanier = (product) => {
    const index = panier.findIndex(item => item.id === product.id);
  
    if (index !== -1) {
      const nouveauPanier = [...panier];
      nouveauPanier[index].quantite += 1;
      setPanier(nouveauPanier);
    } else {
      setPanier(prevState => [...prevState, { ...product, quantite: 1 }]);
    }
  
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
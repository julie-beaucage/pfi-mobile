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
import i18n from "../translagion";

//import { RemplirTableProduits } from './Bd';
import { usePanierContext } from './global';

const Stack = createNativeStackNavigator();

const db = SQLite.openDatabase("pfi.db");

db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS produits (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, description TEXT, prix INTEGER, image TEXT);',
    [],
    () => console.log('Table produits créée avec succès'),
    error => console.error('Erreur lors de la création de la table produits:', error)
  );
});

  const insererProduits = () => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM produits;', [], () => {
      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        ["Miriam le chat petit gâteau", "Miriam est une professeure de danse qui apprend aux jeunes membres de la famille royale à valser ! Elle se réjouit d’aider les futurs rois et reines à remplir leurs devoirs sur la piste de danse, et ne demande en retour que des invitations aux bals royaux !",  16.99, "https://www.toysrus.ca/dw/image/v2/BDFX_PRD/on/demandware.static/-/Sites-toys-master-catalog/default/dw9a00bdc6/images/4446E8A5_1.jpg"],
        null,
        (_, error) => console.error('Erreur lors de l\'ajout du produit:', error)
      );
      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        ["Monica l'axolotl violet", "Cette peluche ultra-compressible est fabriquée avec des matériaux de haute qualité et ultra-doux. Ajoutez cette adorable peluche à votre collection Squishmallows. Cet objet de collection est parfait pour les fans de Squishmallows de tous âges. La peluche douce est parfaite pour se blottir tout en se relaxant à la maison, en regardant un film, pendant les longs trajets en voiture, les soirées pyjama, les trajets en avion et pour s'amuser à l'ancienne !", 16.99, "https://www.toysrus.ca/dw/image/v2/BDFX_PRD/on/demandware.static/-/Sites-toys-master-catalog/default/dwaae6cde1/images/F4BFAA1F_1.jpg"],
        null,
        (_, error) => console.error('Erreur lors de l\'ajout du produit:', error)
      );
      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        ["Wyatt la grenouille", "Wyatt adore tirer au panier à la maison avec sa grande sœur, Wendy ! Ces deux 'Mallows jouent au basket-ball jusqu’à l’heure du dîner. Cette année, Wyatt est devenu un mathlète, donc jouer un jeu amusant est exactement ce dont il a besoin pour rester affûté entre les compétitions.", 15.95, "https://shop.jazwares.com/cdn/shop/files/Vig_2000x.jpg"],
        null,
        (_, error) => console.error('Erreur lors de l\'ajout du produit:', error)
      );
      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        ["Marjorie le rat-taupe nu", "Marjorie est connue comme la reine de beaucoup de choses. Elle est la Miss 'Mallow en titre, a été élue reine du bal de promo de son lycée et « la plus susceptible de faire une différence dans le monde ». Marjorie reste humble même avec toutes les accolades et sait qu’être la reine de la gentillesse est ce qui compte le plus.", 15.95, "https://shop.jazwares.com/cdn/shop/files/Squishmallows-MediumPlush_12_Squishmallows_--NakedMoleRat-SQCR03049-Front-lpr_2000x.jpg"],
        null,
        (_, error) => console.error('Erreur lors de l\'ajout du produit:', error)
      );
      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        ["Caméra Le chat calicot", "Cam adore entrer et sortir des boîtes et construire des forts avec ses amis, Hoot et Wendy. Il aime aussi aller à la plage pour faire la sieste ou passer du temps avec ses amis, mais il est toujours partant pour l’aventure !", 16.99, "https://shop.jazwares.com/cdn/shop/files/SQCR04159NewSSQK-Squishmallows-Cam-BrownandWhiteCalicoCat-12inMediumPlush-OP-Front-lpr_768x.jpg"],
        null,
        (_, error) => console.error('Erreur lors de l\'ajout du produit:', error)
      );
      
      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        ["Warren le sanglier", "Si vous êtes toujours d’humeur à rire, Warren est la Mauve qu’il vous faut ! Ce sanglier teste toutes ses blagues sur ses copains avant de faire son numéro de stand-up dans un club de comédie. Warren plaisante beaucoup sur lui-même et son enfance farfelue. Saviez-vous qu’il a 10 frères et sœurs ?", 12.99, "https://shop.jazwares.com/cdn/shop/files/Squishmallows-7.5in-Warren-Brown-Boar-SQCR02666-FRONT-lpr_2000x.jpg?v=1709849594"],
        null,
        (_, error) => console.error('Erreur lors de l\'ajout du produit:', error)
      );

      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        ["Felipe le gobelin", "Felipe a récemment été couronné roi du kickball dans son école. Et pour cause : il est toujours le dernier debout ! Personne ne sait comment ce gobelin parvient à se balancer et à se faufiler avec une telle vitesse et une telle grâce. Mais si vous lui demandez, Felipe dit que son secret est une multivitamine quotidienne !", 14.99, "https://shop.jazwares.com/cdn/shop/files/Felipe-Front_540x.jpg"],
        null,
        (_, error) => console.error('Erreur lors de l\'ajout du produit:', error)
      );

      tx.executeSql(
        `INSERT INTO produits (nom, description, prix, image) VALUES (?, ?, ?, ?);`,
        ["Armand le monstre des marais", "Armand est un acteur polyvalent qui peut tout faire : pleurer dans les drames, tomber dans les comédies, même respirer sous l’eau ! Grâce à ses branchies spéciales, Armand accepte des rôles principaux pour des personnages terrestres et aquatiques. Maintenant, il espère que ce dernier film lui vaudra une statue en or dont il a toujours rêvé.", 19.99, "https://shop.jazwares.com/cdn/shop/files/SQCR05120SQK-Squishmallows-12InchMediumPlush-AquaticSeaMonster-SELECTSERIES-OP-Front-lpr_2000x.jpg"],
        null,
        (_, error) => console.error('Erreur lors de l\'ajout du produit:', error)
      );

    });
  });
}


const ProduitPic = (props) => {
  const DessertDefaut = "https://i0.wp.com/breezybakes.com/wp-content/uploads/2015/03/gluten-free-vanilla-cake-with-raspberry-filling.jpg ";
  let pic = props.uriPic ? props.uriPic : DessertDefaut;
  return <Image style={stylesBoutique.image} source={{ uri: pic }} />
}

const PressableProduit = ({ nom, image, prix, onPress,id }) => {
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
    db.transaction(tx => {
      tx.executeSql("SELECT * from produits", [], (_, { rows: { _array } }) => {
        console.log("select ", JSON.stringify(_array));
        setProduits(_array);
      },
      (_, error) => {
        console.log("Erreur lors de l'exécution de la requête SQL :", error);
      }); 
    });
  }
  
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT COUNT(*) AS count FROM produits',
        [],
        (_, { rows: { _array } }) => {
          const rowCount = _array[0].count;
          if (rowCount === 0) {
            insererProduits();
          } else {
            console.log('Les éléments existent déjà dans la base de données.');
            selectAll();
          }
        },
        error => console.error('Erreur lors de la vérification de la table produits:', error)
      );
    });
  }, []);

  return (
    <FlatList
      data={produits}
      style={{ backgroundColor:"#ffc0cb"}}
      ListHeaderComponent={() => (
        <LinearGradient
        colors={['#FBD3E9', '#BB377D']}
          style={stylesBoutique.linearGradientBackground}
        >
          <Text style={stylesBoutique.appName}>{i18n.t("appName")}</Text>
        </LinearGradient>
      )}
      renderItem={({ item }) => (
        <PressableProduit
          nom={item.nom}
          image={item.image}
          prix={item.prix}
          id={item.id}
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
  let idProduitSelecteed = produitSelected.id;
 
 /* async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../sons/point.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
    }
  }*/

  return (
    <View style={stylesBoutique.produitDetailContainer}>
      <View tyle={stylesBoutique.detailImageContainer}>
        <Image style={stylesBoutique.imageDetail} source={{ uri: produitSelected.image }} />
      </View>
      <Text style={stylesBoutique.nomDetail}>{produitSelected.nom}</Text>
      <Text style={stylesBoutique.prixDetail}>{produitSelected.prix} $</Text>
      <Text style={stylesBoutique.descriptionDetail}>{produitSelected.description}</Text>
      <Button title={i18n.t("addCart")} color="#f08080"  onPress={() => { 
        //playSound(); 
        AjouterPanier(produitSelected);
        }} />
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function BoutiqueScreen() {
  console.log("BoutiqueScreenLog");
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
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
    setSnackBarMessage(`SquishMallow ${product.nom} a été ajouté au panier`); 
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
  return (
    <View style={{ flex: 1 , backgroundColor:"#ffc0cb"}}>
    <SnackBar
      visible={snackBarVisible}
      textMessage={snackBarMessage}
      autoHidingTime={3000}
      backgroundColor="#333"
      accentColor="#FFD700"
    />
    <Stack.Navigator initialRouteName="BoutiqueScreen">
      <Stack.Screen name="Produit" component={ProduitScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProduitDetailsScreen" options={({ route }) => ({ title: i18n.t("return") })}>
          {(props) => <ProduitDetailsScreen {...props} AjouterPanier={AjouterPanier}setSnackBarVisible={setSnackBarVisible}/>}
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
    margin:8,
    borderWidth: 1,
    borderRadius:10,
    borderColor: '#ccc',
    backgroundColor:'#afeeee'
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
    color: '#afeeee',
    width: '100'
  }
}
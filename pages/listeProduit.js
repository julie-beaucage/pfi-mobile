import { Pressable, TextInput, View, FlatList, Text, Image } from "react-native";
import dbPfi, { RemplirTableProduits } from './bd';
import { useState, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';

const ProduitPic = (props) => {
  const DessertDefaut = "https://i0.wp.com/breezybakes.com/wp-content/uploads/2015/03/gluten-free-vanilla-cake-with-raspberry-filling.jpg ";
  let pic = props.uriPic ? props.uriPic : DessertDefaut;
  return <Image style={stylesBoutique.image} source={{ uri: pic }} />
}

const ProductList = ({ navigation }) => {
  const [produits, setProduits] = useState([]);

  const selectAll = () => {
    return new Promise((resolve, reject) => {
      dbPfi.transaction(tx => {
        tx.executeSql("SELECT * from produits", [],
          (_, { rows: { _array } }) => {
            //console.log("select ", JSON.stringify(_array));
            resolve(_array)
        },
        (error) => {
          reject(error);
        }); 
      });
    });
  };

  useEffect(() => {
    RemplirTableProduits();
    selectAll()
      .then((Produits) => setProduits(Produits))
      .catch((err) => console.log(err));
  },[]);

  return(
  <View>
    <AddForm/>
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
    renderItem={renderProduct}
    keyExtractor={(item, index) => index.toString()}
    />
  </View>
  );
}
  
const renderProduct = ({item}) => (<Product id={item.id} nom={item.nom} prix={item.prix} image={item.image}/>);

function Delete(id) {
  try{
    dbPfi.transaction(tx => {
      tx.executeSql("DELETE FROM produits WHERE id = " + id, [], null,
      (_, error) => console.error('Erreur lors de la supression du produit:', error));
    });
  }catch(err){
    console.log(err);
  }
}

const Product = ({id, nom, prix, image}) => {
  return(
      <View style={stylesBoutique.produitContainer}>
        <ProduitPic uriPic={image} />
        <View style={stylesBoutique.produitInfo}>
          <Text style={stylesBoutique.produitNom}>{nom}</Text>
          <Text style={stylesBoutique.produitPrix}>{prix}$</Text>
        </View>
        <Pressable style={stylesBoutique.deletePerssable} onPress={() => Delete(id)}><Text>Delete</Text></Pressable>
      </View>
  );
}

function Add(nom, desc, prix, img){
  try{
    dbPfi.transaction(tx => {
      tx.executeSql("INSERT INTO produits (nom, description, prix, image) VALUES(?,?,?,?);", [nom, desc, prix, img], null,
      (_, error) => console.error('Erreur lors de l\'ajout du produit:', error));
    });
  }catch(err){
    console.log(err);
  }
}

const AddForm = () => {
  const [nom, setNom] = useState("");
  const [desc, setDesc] = useState("");
  const [prix, setPrix] = useState("");
  const [img, setImg] = useState("");

  //may change how to get img from user
  return(
    <View>
      <TextInput placeholder="Nom" value={nom} onChangeText={n => setNom(n)}/>
      <TextInput placeholder="Description"  value={desc} onChangeText={d => setDesc(d)}/>
      <TextInput keyboardType="numeric" placeholder="Prix" value={prix} onChangeText={p => setPrix(p)}/>
      <TextInput placeholder="Image URI" value={img} onChangeText={i => setImg(i)}/>
      <Pressable style={stylesBoutique.addPressable} onPress={() => Add(nom, desc, prix, img)}><Text>Add</Text></Pressable>
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
  },
  addPressable:{
    backgroundColor: "lightgreen",
    alignItems: "center"
  },
  deletePerssable:{
    backgroundColor: "pink",
    marginLeft: 30,
    padding: 10,
    borderRadius: 5,
  }
}

export default ProductList
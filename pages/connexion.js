import { View , TextInput, Button} from 'react-native'
import { useState } from 'react';
import dbPfi from './bd'

export const ConnectionPage = ({ navigation }) => {
  const [nom, setNom] = useState("");
  const [mdp, setMdp] = useState("");
  
  return (
    <View>
      <TextInput placeholder='Nom' value={nom} onChangeText={n => setNom(n)}/>
      <TextInput placeholder='Mots de passe' value={mdp} onChangeText={m => setMdp(m)}/>
      <Button title='Connecter' onPress={() => navigation.navigate("dbConnexion", {Nom: nom, Mdp: mdp})}/>
      <Button title='Vous enregistrer?' onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
  
export const SignUpPage = ({ navigation }) => {
  const [nom, setNom] = useState("");
  const [mdp, setMdp] = useState("");
  return(
    <View>
      <TextInput placeholder='Nom' value={nom} onChangeText={n => setNom(n)}/>
      <TextInput placeholder='Mots de passe' value={mdp} onChangeText={m => setMdp(m)}/>
      <Button title='Enregistrer' onPress={() => navigation.navigate("dbEnregistement", {Nom: nom, Mdp: mdp})}/>
      <Button title="Vous connecter?" onPress={() => navigation.navigate('Connection')} />
    </View>
  );
}

export const DBConnect = ({ navigation, route }) =>{
  const [users, setUsers] = useState([]);
  const {Nom, Mdp} = route.params;

  const selectAll = () => {
    return new Promise((resolve, reject) => {
      dbPfi.transaction(tx => {
        tx.executeSql("SELECT * from users", [],
         (_, { rows: { _array } }) => {
           console.log("select ", JSON.stringify(_array));
           resolve(_array)
        },
        (error) => {
          reject(error);
        }); 
     });
    });
  };

  selectAll()
    .then((Users)=>{ setUsers(Users) })
    .catch((err)=>{console.log(err)})
  console.log(users)

  users.map((user)=> {
    if(user.nom == Nom && user.mdp == Mdp){
      navigation.navigate("tabNav", {admin: user.admin})
    }
  });

  navigation.navigate("Connection") //(optionel) passer en params pour montrer a l'usager l'erreur de connection  
}

export const DBRegister = ({navigation, route}) => {
  const {Nom, Mdp} = route.params;
  const usersInsert = (nom, mdp) => {
    try {
      dbPfi.transaction(tx => {
        tx.executeSql("INSERT INTO users (nom, mdp, admin) VALUES (?,?,?);", [nom, mdp, 0], null, 
        (_, error) => console.error('Erreur lors de l\'ajout du user:', error))
      })
    } catch (error) {
      console.log(error);
    }
  }
  const Exists = (nom) => {     
    try {
      return dbPfi.transaction(tx => {
        return tx.executeSql("SELECT * from users", [],
          (_, { rows: { _array } }) => {
            console.log("select ", JSON.stringify(_array));
            _array.map((user => {if(user.nom == nom) return true }));
            return false;
          }); 
      })
    } catch (error) {
      console.log(error);
    }
  }

  if(Exists(Nom)) navigation.navigate("Connection") // maybe show a msg to notify userr

  usersInsert(Nom, Mdp);

  navigation.navigate("Connection")
}
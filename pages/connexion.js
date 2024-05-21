import { View , TextInput, Button} from 'react-native'
import { useEffect, useState } from 'react';
import dbPfi, { AddAdmin } from './Bd';

export const ConnectionPage = ({ navigation }) => {
  const [nom, setNom] = useState("");
  const [mdp, setMdp] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    SelectAll();
  }, [])

  const Connect = (nom, mdp) => {
    for(let i = 0; i < users.length; i++){
      console.log(users[i].nom == nom && users[i].mdp == mdp);
      if(users[i].nom == nom && users[i].mdp == mdp)
        navigation.navigate("tabNav", {admin: users[i].admin});
    }
  }

  const SelectAll = () => {
    dbPfi.transaction(tx => {
      tx.executeSql("SELECT * from users", [], (tx, results) => {
        let data = [];
        for(let i = 0; i < results.rows.length; i++)
          data.push(results.rows.item(i));
        console.log(data);
        setUsers(data);
      });
    });
  }
  
  return (
    <View>
      <TextInput placeholder='Nom' value={nom} onChangeText={n => setNom(n)}/>
      <TextInput placeholder='Mots de passe' value={mdp} onChangeText={m => setMdp(m)}/>
      <Button title='Connecter' onPress={() => Connect(nom, mdp)}/>
      <Button title='Vous enregistrer?' onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
  
export const SignUpPage = ({ navigation }) => {
  const [nom, setNom] = useState("");
  const [mdp, setMdp] = useState("");

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

  const Register = (nom, mdp) => {

    if(Exists(nom)){ 
      navigation.navigate("Connection");  
      return; 
    }
    Insert(nom, mdp);
    navigation.navigate("Connection") 
  }

  const Insert = (nom, mdp) => {
    try {
      dbPfi.transaction(tx => {
        tx.executeSql("INSERT INTO users (nom, mdp, admin) VALUES (?,?,?);", [nom, mdp, 0], null, 
        (_, error) => console.error('Erreur lors de l\'ajout du user:', error))
      })
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <View>
      <TextInput placeholder='Nom' value={nom} onChangeText={n => setNom(n)}/>
      <TextInput placeholder='Mots de passe' value={mdp} onChangeText={m => setMdp(m)}/>
      <Button title='Enregistrer' onPress={() => Register(nom, mdp)}/>
      <Button title="Vous connecter?" onPress={() => navigation.navigate('Connection')} />
    </View>
  );
}
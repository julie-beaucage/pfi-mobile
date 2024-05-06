const ConnectionPage = ({ navigation }) => {
    return (
      <View>
        <TextInput placeholder='Nom' />
        <TextInput placeholder='Mots de passe'></TextInput>
        <Button title='Connecter' onPress={() => navigation.navigate('ListeProduit') /*Change*/}/>
        <Button title='Vous enregistrer?' onPress={() => navigation.navigate('Enregistrement')} />
      </View>
    );
  }
  
  const SignUpPage = ({ navigation }) => {
    return(
      <View>
        <TextInput placeholder='Nom' />
        <TextInput placeholder='Mots de passe'></TextInput>
        <Button title='Enregistrer'/>
        <Button title="Vous connecter?" onPress={() => navigation.navigate('Connection')} />
      </View>
    );
  }
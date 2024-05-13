  const ProductList = ({ navigation }) => {
    //get product list from db
    const Data = [{id: 0, nom: "test", description: "testtest", prix: "2.00$", image: "#"}];
    return(<FlatList data={Data} renderItem={renderProduct} keyExtractor={p => p.id}/>);
  }
  
  const renderProduct = ({item}) => (<Product nom={item.nom} desc={item.description} prix={item.prix} image={item.image}/>);
  
  const Product = ({nom, desc, prix, image }) => {
    return(
      <View style={styles.product}>
        <Image style={styles.image} source={{image}}/>
        <View style={styles.infos}></View>
        <Text>{nom}</Text>
        <Text>{desc}</Text>
        <Text>{prix}</Text>
      </View>
    );
  }
export default ProductList
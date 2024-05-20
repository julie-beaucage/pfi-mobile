import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import HomeMarker from './../assets/HomeMarker.png';
import {entrepot1, entrepot2, entrepot3, ligneBleu} from './../Map.json'

export const MapScreen = () => {
    const initialRegion = {
        latitude: 45.4735448,
        longitude: -73.5639533,
        latitudeDelta: 1,
        longitudeDelta: 1
    }
    

    return(
        <MapView style={{flex:1}} provider={PROVIDER_GOOGLE} initialRegion={initialRegion}>
            <Marker title='Home' coordinate={{latitude:45.6428144, longitude: -73.8453732}} image={HomeMarker}/>
            <Marker title='Entrepot 1' coordinate={{latitude:entrepot1.latitude, longitude: entrepot1.longitude}}/>
            <Marker title='Entrepot 2' coordinate={{latitude:entrepot2.latitude, longitude: entrepot2.longitude}}/>
            <Marker title='Entrepot 3' coordinate={{latitude:entrepot3.latitude, longitude: entrepot3.longitude}}/>
            <Polyline coordinates={ligneBleu}/>
        </MapView>
    );
}
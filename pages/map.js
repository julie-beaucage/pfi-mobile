import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export const MapScreen = () => {
    const initialRegion = {
        latitude: 45.4735448,
        longitude: -73.5639533,
        latitudeDelta: 1,
        longitudeDelta: 1
    }        
    return(
        <MapView style={{flex:1}} provider={PROVIDER_GOOGLE} initialRegion={initialRegion}>
            <Marker title='' coordinate={{latitude:45.6428144, longitude: -73.8453732}}/>
        </MapView>
    );
}
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map({navigation}){
    const [selectedLocation, setSelectedLocation] = useState()

    const region = {
        latitude: 37.78,
        longitude: -122.23,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    function selectLocation(event){
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({lat: lat, lng: lng});
    }

    const savePickedLocation = useCallback(() => {
        if(!selectedLocation){
            Alert.alert(
                'No Location Picked!',
                'First You have to pick a location, please!'
            );
            return;
        }

        navigation.navigate('AddPlace', {
            pickedLat: selectedLocation.lat, 
            pickedLng: selectedLocation.lng
        });
    }, [navigation, selectedLocation]);

    useLayoutEffect(() =>{
        navigation.setOptions({
            headerRight: ({tintColor}) => 
                <IconButton 
                    icon={'save'} 
                    size={24} 
                    color={tintColor} 
                    onPress={savePickedLocation}
                />
        });
    }, [navigation, savePickedLocation]);

    return (
        <MapView style={styles.map} 
                 initialRegion={region} 
                 onPress={selectLocation}
        >
            { selectedLocation && <Marker title="Picked Location"
                    coordinate={{latitude: selectedLocation.lat, longitude: selectedLocation.lng}}
            />}
        </MapView>
    );
}

export default Map;

const styles = StyleSheet.create({
    map:{
        flex: 1,
    }
})
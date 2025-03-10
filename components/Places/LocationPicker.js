import { StyleSheet, View, Alert, Image, Text } from "react-native";
import OutlinedButton from '../UI/OutlinedButton'
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { useState } from "react";
import { getMapPreview } from "../../util/location";

function LocationPicker(){
    const [pickedLocation, setPickedLocation] = useState();
    const [locationPermissionInfo, requestPermission] = useForegroundPermissions();

    async function verifyPermissions() {
        if(locationPermissionInfo.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if(locationPermissionInfo.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient Permissions!', 'You need to grant location permissions to use this app.');
            return false;
        }

        return true;        
    }

    async function getLocation(){
        const hadPermissions = await verifyPermissions();
        if(!hadPermissions){
            return;
        }
        
        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    }

    function pickOnMap(){

    }

    let locationPreview = <Text>No location picked yet.</Text>;

    if(pickedLocation) {
        locationPreview = (
            <Image 
                source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}}
                style= {styles.image}
            />
        );
    }

    return(
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon={'location'} onPress={getLocation}>
                    Locate User
                </OutlinedButton>
                <OutlinedButton icon={'map'} onPress={pickOnMap}>
                    Pick on Map
                </OutlinedButton>
            </View>
        </View>
    );
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        //borderRadius: 4
    }
});
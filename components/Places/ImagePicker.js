import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({onTakeImage}){
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

    async function verifyPermissions(){
        if(cameraPermissionInfo.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if(cameraPermissionInfo.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient Permissions!', 'You need to grant camera permissions to use this app.');
            return false;
        }

        return true;
    }

    async function takeImage(){
        const hadPermissions = await verifyPermissions();
        if(!hadPermissions){
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        setPickedImage(image.assets[0].uri);
        onTakeImage(image.assets[0].uri);
    }

    let imagePreview = <Text style={styles.textPreview}>No image taken yet!</Text>;

    if(pickedImage){
        imagePreview = <Image style={styles.image} source={{uri: pickedImage}}/>;
    }

    return (
        <View>
            <View style={styles.imagePreview}>{imagePreview}</View>
            <OutlinedButton onPress={takeImage} icon='camera'>
                Take Image
            </OutlinedButton>
        </View>
    );
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
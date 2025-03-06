import { Alert, Button, View } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";

function ImagePicker(){
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
        console.log(image);
    }

    return (
        <View>
            <View></View>
            <Button title="Take Image" onPress={takeImage}/>
        </View>
    );
}

export default ImagePicker;
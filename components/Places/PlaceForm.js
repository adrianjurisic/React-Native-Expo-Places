import { Text, View, StyleSheet, ScrollView, TextInput } from "react-native";
import { Colors } from '../../constants/colors';
import { useCallback, useState } from "react";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";

function PlaceForm({onCreatePlace}){
    const [enteredTitle, setEnteredTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();

    function changeTitle(enteredText){
        setEnteredTitle(enteredText);
    }

    function takeImage(imageUri){
        setSelectedImage(imageUri);
    }

    const pickLocation = useCallback((location) => {
        setPickedLocation(location);
    }, []);

    function savePlace(){
        const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
        onCreatePlace(placeData);
    }

    return(
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitle} value={enteredTitle}/>
            </View>
            <ImagePicker onTakeImage={takeImage}/>
            <LocationPicker onPickedLocation={pickLocation}/>
            <Button onPress={savePlace}>Add place</Button>
        </ScrollView>
    );
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
    },
});
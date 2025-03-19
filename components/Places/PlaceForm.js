import { Text, View, StyleSheet, ScrollView, TextInput } from "react-native";
import { Colors } from '../../constants/colors';
import { useState } from "react";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";

function PlaceForm(){
    const [enteredTitle, setEnteredTitle] = useState('');

    function changeTitle(enteredText){
        setEnteredTitle(enteredText);
    }

    return(
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitle} value={enteredTitle}/>
            </View>
            <ImagePicker/>
            <LocationPicker />
            <Button>Add place</Button>
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
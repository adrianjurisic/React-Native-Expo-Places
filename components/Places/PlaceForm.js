import { Text, View, StyleSheet } from "react-native";
import { Colors } from '../../constants/colors';

function PlaceForm(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>The Place Form!</Text>
        </View>
    );
}

export default PlaceForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: Colors.primary200
    },
});
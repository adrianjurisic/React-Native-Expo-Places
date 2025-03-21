import PlaceForm from "../components/Places/PlaceForm";

function AddPlace({navigation}){
    function createPlace(place){
        navigation.navigate('AllPlaces', {place});
    }

    return (
        <PlaceForm onCreatePlace={createPlace}/>
    );
}

export default AddPlace;
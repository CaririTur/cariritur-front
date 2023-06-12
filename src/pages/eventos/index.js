import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {useContext, useEffect, useState} from "react";
import { getPlaces } from "../../services/requests/users";

export default function Eventos() {
    const { AuthContext } = require("../../routes/login_routes")
    const { token } = useContext(AuthContext)

    const [eventPlaces, setEventPlaces] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getPlaces(token).then((response) => {
            const eventPlaces = response.places.filter((place) => place.category === "EVENT");
            setEventPlaces(eventPlaces);
        });
    }, []);

    return (
        <View>
            <FlatList
                keyExtractor={(item) => item.id}
                data={eventPlaces}
                renderItem={({ item }) => (
                    <>
                        <Text style={styles.date}>{item.curiosities}</Text>
                        <View style={styles.container}>
                            <TouchableOpacity
                                style={styles.container_filho}
                                onPress={() => {
                                    navigation.navigate('EventosUnicos', {
                                        foto: item.images[0],
                                        descricao: item.description,
                                        evento: item.name,
                                        data: item.open_hour,
                                        item_localiza: item.street,
                                        pessoa: "15800",
                                    });
                                }}
                            >
                                <Text style={styles.text}>{item.name}</Text>
                                <Text style={styles.text_description}>{item.description.length > 150 ? item.description.substring(0, 150) + "... veja mais." : item.description}</Text>
                                <Image source={{ uri: item.images[0] }} style={{ height: "55%", width: '100%' }} />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    container_filho: {
        justifyContent: 'space-between',
        width: '90%',
        height: 230,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        elevation: 10,
        shadowColor: '#030002',
        shadowOpacity: 0.25,
        shadowRadius: 5,
        backgroundColor: "#ffffff",
    },

    date: {
        fontSize: 18,
        marginLeft: 18,
        marginBottom: 10,
        marginTop: 10,
    },

    text: {
        fontSize: 18,
        fontWeight: "bold",
    },


    text_description: {
        fontSize: 15,
    },
});

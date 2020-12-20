import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from "firebase/app";


export default function ListReclamos(props) {
    const { navigation, idTransporte } = props;
    const [userLogged, setuserLogged] = useState(false)

    firebase.auth().onAuthStateChanged((user) => {
        user ? setuserLogged(true) : setuserLogged(false);
    })

    return (
        <View>
            {userLogged ? (
                <Button
                    title="Escribir reclamo"
                    buttonStyle={styles.buttonReclamo}
                    titleStyle={styles.btnTitle}
                    icon={{
                        type: "material-community",
                        name: "square-edit-outline",
                        color: "#EF0B0B"
                    }}
                    onPress={() => navigation.navigate("Reclamo", { idTransporte: idTransporte })}
                />
            ) : (<View>
                <Text
                    style={{ textAlign: "center", color: "#EF0B0B", padding: 20 }}
                    onPress={() => navigation.navigate("Login")} >
                    Para escribir un reclamo es necesario estar logeado{" "}
                    <Text style={{ fontWeight: "bold" }}>
                        Pulsa AQUI para iniciar sesion
                            </Text></Text>
            </View>)}
        </View>
    )
}

const styles = StyleSheet.create({
    buttonReclamo: {
        backgroundColor: "transparent",
    },
    btnTitle: {
        color: "#EF0B0B"
    }
})

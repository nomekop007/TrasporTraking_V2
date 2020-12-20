import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import firebase from "firebase/app";
import Toast from 'react-native-easy-toast'
import { Reclamo } from "../../model/Reclamo";
import Loading from "../../components/Loading";
const reclamo = new Reclamo();

export default function ReclamoForm(props) {
    const { navigation, } = props;
    const { idTransporte } = navigation.state.params;
    const [user, setuser] = useState(null)
    const [titulo, settitulo] = useState("");
    const [isLoading, setisLoading] = useState(false)
    const [comentario, setComentario] = useState("");
    const toastRef = useRef();

    firebase.auth().onAuthStateChanged((user) => {
        setuser(user)
    });

    const enviarReclamo = async () => {
        if (!titulo || !comentario) {
            toastRef.current.show("titulo o comentario vacio")
            return;
        }
        setisLoading(true);
        await reclamo.agregarReclamo({
            idUsuario: user.uid,
            idTransporte: idTransporte,
            fechaHora: new Date(),
            titulo: titulo,
            comentario: comentario,
        });
        setisLoading(false);
        navigation.goBack();
    }


    return (
        <View style={styles.viewBody}>
            <View style={styles.formReclamo}>
                <Input style
                    placeholder="Titulo..."
                    style={styles.input}
                    onChange={(e) => settitulo(e.nativeEvent.text)}
                />
                <Input
                    placeholder="comentario..."
                    title="Comentario"
                    multiline={true}
                    inputContainerStyle={styles.textArea}
                    onChange={(e) => setComentario(e.nativeEvent.text)}
                />
                <Button
                    title="Enviar Reclamo"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={enviarReclamo}
                >
                </Button>
            </View>
            <Loading text="Registrando reclamo" isVisible={isLoading} />
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    formReclamo: {
        flex: 1,
        alignItems: "center",
        margin: 20,
        marginTop: 10,
    },
    input: {
        marginBottom: 10
    },
    textArea: {
        height: 150,
        width: "100%",
        padding: 0,
        marginTop: 10,
    },
    btnContainer: {
        flex: 10,
        justifyContent: "flex-end",
        marginTop: 20,
        marginBottom: 10,
        width: "95%"
    },
    btn: {
        backgroundColor: "#EF0B0B"
    }
})

import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { db } from './firebaseConnection';
import { doc, deleteDoc } from 'firebase/firestore';

export function UsersList({ data }) {


    async function handleDeleteItem() {
        // console.log('Excluir item: ' + data.id);
        const docRef = doc(db, "users", data.id);
        await deleteDoc(docRef);

    }


    return (
        <View style={styles.container}>
            <Text>Nome: {data?.nome}</Text>
            <Text>Idade: {data?.idade}</Text>
            <Text>Cargo: {data?.cargo}</Text>

            <TouchableOpacity style={styles.button}  onPress={handleDeleteItem}>
                <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f0f0f0",
        padding: 8,
        borderRadius: 4,
        marginBottom: 8,
    },
    item: {
        color: "#000",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#ff0000",
        alignSelf: "flex-start",
        padding: 6,
        borderRadius: 4,
        marginTop: 12,
    },
    buttonText: {
        color: "#fff",
        fontSize: 12,
    }
})
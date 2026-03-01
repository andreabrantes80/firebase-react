import { View, StyleSheet, Text } from 'react-native';

export function UsersList({ data }) {
    return (
        <View style={styles.container}>
            <Text>Nome: {data?.nome}</Text>
            <Text>Idade: {data?.idade}</Text>
            <Text>Cargo: {data?.cargo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f0f0f0",
        padding: 8,
        borderRadius: 4,
        marginBottom: 8,
    }
})
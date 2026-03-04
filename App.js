import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { useEffect, useState } from 'react';

import { FormsUsers } from './src/formUsers';
import { auth } from './src/firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function App() {

  async function handleCreateUser() {

    const user = await createUserWithEmailAndPassword(auth, "teste@teste.com", "123456")
    console.log('Usuário criado com sucesso: ' + user);
  }


  return (
    <View style={styles.container}>
      <Text style={{ marginLeft: 10, fontSize: 18, color: '#000' }}>Email:</Text>
      <TextInput style={styles.input} placeholder="Digite seu email"></TextInput>


      <Text style={{ marginLeft: 10, fontSize: 18, color: '#000' }}>Senha:</Text>
      <TextInput style={styles.input} placeholder="Digite sua senha" ></TextInput>

      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
        <Text style={styles.textButton}>Criar uma conta</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000',
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  textButton: {
    color: '#fff',
    padding: 10,
  },
});

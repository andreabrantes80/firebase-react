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
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        setAuthUser({
          email: user.email,
          uid: user.uid,
        });
        return;
      }
    });
  }, []);

  async function handleCreateUser() {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Usuário criado com sucesso: ' + user);
  }

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then(user => {
        console.log('Usuário logado com sucesso: ' + user);
        setAuthUser({
          email: user.user.email,
          uid: user.user.uid,
        });
      })
      .catch(error => {
        if (error.code === 'auth/missing-password') {
          console.log('Senha é obrigatória');
          return;
        }
        console.log(error.code);
      });
  }

  async function handleLogout() {
    await auth.signOut(auth);
    setAuthUser(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textButtonLogin}>
        Usuario logado: {authUser ? authUser.email : 'Nenhum usuário logado'}
      </Text>

      <Text style={{ marginLeft: 10, fontSize: 18, color: '#000' }}>
        Email:
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={text => setEmail(text)}
      ></TextInput>

      <Text style={{ marginLeft: 10, fontSize: 18, color: '#000' }}>
        Senha:
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      ></TextInput>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.textButton}>Fazer Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
        <Text style={styles.textButton}>Criar uma conta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={[styles.textButton, { backgroundColor: '#ff0000' }]}>
          Sair da conta
        </Text>
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
    marginBottom: 10,
  },
  textButton: {
    color: '#fff',
    padding: 10,
  },
  textButtonLogin: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#000',
  },
});

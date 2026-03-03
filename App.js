import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { useEffect, useState } from 'react';

import { db } from './src/firebaseConnection';
import {
  doc,
  onSnapshot,
  setDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc
} from 'firebase/firestore';

import { UsersList } from './src/users';

export default function App() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cargo, setCargo] = useState('');

  const [showForm, setShowForm] = useState(true);
  const [isEditing, setIsEditing] = useState('');

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function buscarDados() {
      //   const docRef = doc(db, "users", "1");
      //   getDoc(docRef).then((snapshot) => {
      //     setNome(snapshot.data()?.nome);
      //   })
      //   .catch((error) => {
      //     console.log("Erro ao buscar os dados: " + error);
      //   });
      // onSnapshot(doc(db, 'users', '1'), doc => {
      //   setNome(doc.data()?.nome);
      // }).catch(error => {
      //   console.log('Erro ao buscar os dados: ' + error);
      // });
      const usersRef = collection(db, 'users');

      onSnapshot(usersRef, (snapshot) => {
        let lista = [];
        snapshot.forEach(doc => {
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            idade: doc.data().idade,
            cargo: doc.data().cargo,
          });
        });
        setUsers(lista);
      });

      // getDocs(usersRef)
      //   .then(snapshot => {
      //     let lista = [];
      //     snapshot.forEach(doc => {
      //       lista.push({
      //         id: doc.id,
      //         nome: doc.data().nome,
      //         idade: doc.data().idade,
      //         cargo: doc.data().cargo,
      //       });
      //     });
      //     setUsers(lista);
      //   })
      //   .catch(error => {
      //     console.log('Erro ao buscar os dados: ' + error);
      //   });
    }

    buscarDados();
  }, []);

  async function handlerRegister() {
    await addDoc(collection(db, 'users'), {
      nome: nome,
      idade: idade,
      cargo: cargo,
    })
      .then(() => {
        console.log('Dados cadastrados com sucesso!');
        setNome('');
        setIdade('');
        setCargo('');
      })
      .catch(error => {
        console.log('Erro ao cadastrar os dados: ' + error);
      });
  }

  function handleToggle() {
    setShowForm(!showForm);
  }

  function editUser(data) {
    setNome(data.nome);
    setIdade(data.idade);
    setCargo(data.cargo);
    setIsEditing(data.id);
  }

  async function handlerEditUser() {
    const docRef = doc(db, 'users', isEditing);

    await updateDoc(docRef, {
      nome: nome,
      idade: idade,
      cargo: cargo,
    })
      .then(() => {
        console.log('Dados editados com sucesso!');
        setNome('');
        setIdade('');
        setCargo('');
        setIsEditing('');
      })
      .catch(error => {
        console.log('Erro ao editar os dados: ' + error);
      });
  }

  return (
    <View style={styles.container}>
      {showForm && (
        <View>
          <Text style={styles.label}>Nome:</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o nome"
            value={nome}
            onChangeText={text => setNome(text)}
          />

          <Text style={styles.label}>Idade:</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite a idade"
            value={idade}
            onChangeText={text => setIdade(text)}
          />

          <Text style={styles.label}>Cargo:</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o cargo"
            value={cargo}
            onChangeText={text => setCargo(text)}
          />

          {isEditing !== "" ? (
            <TouchableOpacity style={styles.button} onPress={handlerEditUser}>
              <Text style={styles.textButton}>Editar Usuário</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handlerRegister}>
              <Text style={styles.textButton}>Adicionar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <TouchableOpacity
        onPress={handleToggle}
        style={{ marginTop: 10, alignItems: 'center' }}
      >
        <Text style={{ color: '#000', textAlign: 'center' }}>
          {showForm ? 'Esconder Formulário' : 'Mostrar Formulário'}
        </Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 14, marginLeft: 10, marginRight: 10 }}>
        Usuários
      </Text>

      <FlatList
        style={styles.list}
        data={users}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <UsersList
            data={item}
            handleEdit={item => editUser(item)}
          ></UsersList>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
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
  label: {
    marginLeft: 10,
    maerginRight: 10,
    color: '#000',
    fontSize: 16,
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  list: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
});

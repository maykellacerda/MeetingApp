import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text';

const FornecedorForm = ({ onAddFornecedor }) => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagem, setImagem] = useState(null);

  const escolherImagem = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissao.granted) {
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!resultado.canceled) {
        setImagem(resultado.assets[0].uri);
      }
    } else {
      Alert.alert('Permissão necessária', 'Permita o acesso à galeria.');
    }
  };

  const enviarFormulario = () => {
    if (!nome || !endereco || !contato || !categoria) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    onAddFornecedor({ nome, endereco, contato, categoria, imagem });
    setNome('');
    setEndereco('');
    setContato('');
    setCategoria('');
    setImagem(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Endereço:</Text>
      <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />

      <Text style={styles.label}>Contato:</Text>
      {/* Campo com máscara de telefone */}
      <TextInputMask
        type="cel-phone"
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) ',
        }}
        style={styles.input}
        value={contato}
        onChangeText={setContato}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Categoria:</Text>
      <TextInput style={styles.input} value={categoria} onChangeText={setCategoria} />

      <TouchableOpacity style={styles.button} onPress={escolherImagem}>
        <Text style={styles.buttonText}>Selecionar Imagem</Text>
      </TouchableOpacity>
      {imagem && <Image source={{ uri: imagem }} style={styles.image} />}

      <TouchableOpacity style={styles.button} onPress={enviarFormulario}>
        <Text style={styles.buttonText}>Cadastrar Fornecedor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    elevation: 2,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default FornecedorForm;

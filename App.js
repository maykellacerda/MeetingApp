import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FornecedorForm from './components/FornecedorForm';
import FornecedorList from './components/FornecedorList';

const App = () => {
  const [fornecedores, setFornecedores] = useState([]);

  const handleAddFornecedor = (fornecedor) => {
    setFornecedores([...fornecedores, fornecedor]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastro de Fornecedores</Text>
      <FornecedorForm onAddFornecedor={handleAddFornecedor} />
      <FornecedorList fornecedores={fornecedores} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default App;

import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const FornecedorList = ({ fornecedores }) => {
  // Agrupar fornecedores por categoria
  const fornecedoresPorCategoria = fornecedores.reduce((result, fornecedor) => {
    (result[fornecedor.categoria] = result[fornecedor.categoria] || []).push(
      fornecedor
    );
    return result;
  }, {});

  return (
    <FlatList
      data={Object.keys(fornecedoresPorCategoria)}
      keyExtractor={(item) => item}
      renderItem={({ item: categoria }) => (
        <View>
          {/* Cabeçalho da categoria */}
          <Text style={styles.categoryHeader}>{categoria}</Text>
          {fornecedoresPorCategoria[categoria].map((fornecedor, index) => (
            <View key={index} style={styles.card}>
              {fornecedor.imagem && (
                <Image source={{ uri: fornecedor.imagem }} style={styles.image} />
              )}
              <View style={styles.info}>
                <Text style={styles.name}>{fornecedor.nome}</Text>
                <Text style={styles.detail}>Endereço: {fornecedor.endereco}</Text>
                <Text style={styles.detail}>Contato: {fornecedor.contato}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  categoryHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default FornecedorList;

import React from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Country = [
  { id: '1', title: 'Italy', imageUrl: 'https://cdn.britannica.com/59/1759-004-F4175463/Flag-Italy.jpg' },
  { id: '2', title: 'Germany', imageUrl: 'https://cdn.britannica.com/97/897-004-232BDF01/Flag-Germany.jpg' },
  { id: '3', title: 'Mexico', imageUrl: 'https://cdn.britannica.com/73/2573-004-29818847/Flag-Mexico.jpg' },
  { id: '4', title: 'Japan', imageUrl: 'https://cdn.britannica.com/91/1791-004-DA3579A5/Flag-Japan.jpg' },
  { id: '5', title: 'Vietnam', imageUrl: 'https://cdn.britannica.com/41/4041-004-D051B135/Flag-Vietnam.jpg'},
  { id: '6', title: 'France ', imageUrl: 'https://cdn.britannica.com/82/682-004-F0B47FCB/Flag-France.jpg' },
];

const CategoriesScreen = () => {
  const navigation = useNavigation(); 

  const renderCategoryItem = (itemData: { item: { id: string; title: string; imageUrl: string } }) => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => navigation.navigate('Meals', { categoryId: itemData.item.id })}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: itemData.item.imageUrl }} style={styles.image} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{itemData.item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={Country}
      renderItem={renderCategoryItem}
      numColumns={2}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#dfe8f1',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  titleContainer: {
    backgroundColor: '#dfe8f1', 
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ecdddd',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});

export default CategoriesScreen;

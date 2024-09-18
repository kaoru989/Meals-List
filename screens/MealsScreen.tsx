import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type Category = {
  id: string;
  title: string;
  imageUrl: string;
};

type Meal = {
  id: string;
  title: string;
  imageUrl: string;
};

type RootStackParamList = {
  MealsScreen: { categoryId: string };
  MealDetail: { mealId: string };
};

const CATEGORIES: Category[] = [
  { id: '1', title: 'Italy', imageUrl: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Germany', imageUrl: 'https://via.placeholder.com/150' },
  { id: '3', title: 'Mexico', imageUrl: 'https://via.placeholder.com/150' },
  { id: '4', title: 'Japan', imageUrl: 'https://via.placeholder.com/150' },
  { id: '5', title: 'Vietnam', imageUrl: 'https://via.placeholder.com/150' },
  { id: '6', title: 'France', imageUrl: 'https://via.placeholder.com/150' },  
];

const MEALS: Record<string, Meal[]> = {
  '1': [
    { id: 'm1', title: 'Lasagne alla Bolognese', imageUrl: 'https://gobargingwp-s3.s3.eu-west-1.amazonaws.com/wp-content/uploads/2022/08/10-Famous-Italian-Dishes-You-Must-Try-Lasagne-alla-Bolognese.jpg' },
    { id: 'm2', title: 'Fettuccine al Pomodoro', imageUrl: 'https://gobargingwp-s3.s3.eu-west-1.amazonaws.com/wp-content/uploads/2022/08/Top-Italian-Dishes-Fettuccine-al-Pomodoro.jpg' },
    { id: 'm3', title: 'Gnocchi di Patate', imageUrl: 'https://gobargingwp-s3.s3.eu-west-1.amazonaws.com/wp-content/uploads/2022/08/10-Famous-Italina-Dishes-including-Gnocchi-di-Patate.jpg' },
    { id: 'm4', title: 'Melanzane alla Parmigiana', imageUrl: 'https://gobargingwp-s3.s3.eu-west-1.amazonaws.com/wp-content/uploads/2022/08/Melanzane-alla-Parmigiana-1024x683.jpg' },
  ],
  '2': [
    { id: 'm5', title: 'Käsespätzle', imageUrl: 'https://8668267.fs1.hubspotusercontent-na1.net/hubfs/8668267/Expatrio%20Hatch%20Child%20-%20Theme/Blog%20Graphics/Living%20in%20Germany/german-traditional-cheese-noodles.webp' },
    { id: 'm6', title: 'Currywurst', imageUrl: 'https://8668267.fs1.hubspotusercontent-na1.net/hubfs/8668267/Expatrio%20Hatch%20Child%20-%20Theme/Blog%20Graphics/Living%20in%20Germany/berlin_currywurst.webp' },
    { id: 'm7', title: 'Kartoffelpuffer & Bratkartoffeln', imageUrl: 'https://8668267.fs1.hubspotusercontent-na1.net/hubfs/8668267/Expatrio%20Hatch%20Child%20-%20Theme/Blog%20Graphics/Living%20in%20Germany/german-potato-pancakes-kartoffelpuffer.webp' },
    { id: 'm8', title: 'Rouladen', imageUrl: 'https://8668267.fs1.hubspotusercontent-na1.net/hubfs/8668267/Expatrio%20Hatch%20Child%20-%20Theme/Blog%20Graphics/Living%20in%20Germany/german_rouladen.webp' },
  ],
  '3': [
    { id: 'm9', title: 'Chilaquiles', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2022/05/Chilaquiles-93e406f.jpg?quality=90&webp=true&fit=975,649' },
    { id: 'm10', title: 'Pozole', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2022/05/Pozole-28a8da2.jpg?quality=90&webp=true&fit=975,649' },
    { id: 'm11', title: 'Tacos al pastor', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2024/06/Next-level-minced-beef-tacos-f55495e.jpg?quality=90&webp=true&fit=975,649 ' },
    { id: 'm12', title: 'Tostadas', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2024/06/Summer-veg-tostadas-6145ccf.jpg?quality=90&webp=true&fit=975,649' },
  ],
  '4': [
    { id: 'm13', title: 'Sushi', imageUrl: 'https://www.recipetineats.com/tachyon/2019/09/Sushi-tuna-ortoro.jpg?resize=768%2C614&zoom=1 ' },
    { id: 'm14', title: 'Ramen', imageUrl: 'https://www.recipetineats.com/tachyon/2019/09/Ramen_RamenStreet_YM-2.jpg?resize=1100%2C1375&zoom=1' },
    { id: 'm15', title: 'Japanese Curry', imageUrl: 'https://www.recipetineats.com/tachyon/2019/09/Japanese-Curry-Curry-Bondy.jpg?resize=1200%2C900&zoom=1' },
    { id: 'm16', title: 'Tonkatsu', imageUrl: 'https://www.recipetineats.com/tachyon/2019/09/Shibuya-Tonkatsu-1.jpg?resize=1100%2C713&zoom=1' },
  ],
  '5': [
    { id: 'm21', title: 'Pho', imageUrl: 'https://statics.vinwonders.com/popular-Vietnamese-dishes-2_1683453326.jpg' },
    { id: 'm22', title: 'Bun cha', imageUrl: 'https://statics.vinwonders.com/popular-Vietnamese-dishes-3_1683453317.jpg' },
    { id: 'm23', title: 'Com tam', imageUrl: 'https://statics.vinwonders.com/popular-Vietnamese-dishes-7_1683453276.jpg' },
    { id: 'm24', title: 'Banh Mi', imageUrl: 'https://statics.vinwonders.com/popular-Vietnamese-dishes-9_1683453257.jpg' },
  ],
  '6': [
    { id: 'm21', title: 'Confit du Canard', imageUrl: 'https://learnfrenchinvancouver.com/wp-content/uploads/2018/07/Confit-du-canard-Learn-French-in-Vancouver-small.jpg.webp' },
    { id: 'm22', title: 'Coq au Vin', imageUrl: 'https://learnfrenchinvancouver.com/wp-content/uploads/2018/07/Coq-au-vin-Learn-French-in-Vancouver-small.jpg' },
    { id: 'm23', title: 'Ratatouille', imageUrl: 'https://learnfrenchinvancouver.com/wp-content/uploads/2018/07/Ratatouille-Learn-French-in-Vancouver-small.jpg.webp' },
    { id: 'm24', title: 'Steak Tartare', imageUrl: 'https://learnfrenchinvancouver.com/wp-content/uploads/2018/07/Steak-Tartare-Learn-French-in-Vancouver-small.jpg.webp' },
  ],
};

const MealsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MealsScreen'>>();
const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { categoryId } = route.params;

  const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);

  const meals = MEALS[categoryId] || [];

  const renderMealItem = ({ item }: { item: Meal }) => {
    return (
      <TouchableOpacity
        style={styles.mealItem}
        onPress={() => navigation.navigate('MealDetail', { mealId: item.id })}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.categoryInfo}>Category ID: {categoryId}</Text>
      <Text style={styles.categoryTitle}>{selectedCategory?.title}</Text>
      
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  categoryInfo: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  mealItem: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default MealsScreen;

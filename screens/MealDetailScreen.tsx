import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { useFavorites } from '../screens/FavoritesContext';
import { NavigationProp } from '@react-navigation/native';

interface Meal {
  id: string;
  title: string;
  imageUrl: string;
}

type RootStackParamList = {
  MealDetail: { mealId: string };
  Favorites: undefined;
};

type MealDetailRouteProp = RouteProp<RootStackParamList, 'MealDetail'>;
type NavigationPropType = NavigationProp<RootStackParamList>;

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

const MealDetailScreen = () => {
  const route = useRoute<MealDetailRouteProp>();
  const navigation = useNavigation<NavigationPropType>();
  const { mealId } = route.params;
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  let meal: Meal | undefined;
  for (const key in MEALS) {
    const categoryMeals = MEALS[key];
    meal = categoryMeals.find((m) => m.id === mealId);
    if (meal) break;
  }

  const [isMealFavorite, setIsMealFavorite] = useState<boolean>(isFavorite(mealId));

  useEffect(() => {
    setIsMealFavorite(isFavorite(mealId));
  }, [mealId, isFavorite]);

  const toggleFavorite = () => {
    if (meal) {
      if (!isMealFavorite) {
        addFavorite(meal);
        console.log('Meal added to favorites:', meal);
        alert('Meal added to favorites');
      } else {
        removeFavorite(meal.id);
        console.log('Meal removed from favorites:', meal);
        alert('Meal removed from favorites');
      }
      setIsMealFavorite((prevState) => !prevState);
      navigation.navigate('Favorites');
    }
  };

  return (
    <View style={styles.screen}>
      {meal ? (
        <>
          <Image source={{ uri: meal.imageUrl }} style={styles.image} />
          <Text style={styles.title}>{meal.title}</Text>
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            <Icon
              name={isMealFavorite ? 'star' : 'star-outline'}
              size={30}
              color={isMealFavorite ? 'yellow' : 'black'}
            />
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.notFound}>Meal not found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  favoriteButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  notFound: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MealDetailScreen;

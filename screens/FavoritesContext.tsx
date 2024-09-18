import React, { createContext, useState, ReactNode, useContext } from 'react';

interface Meal {
  id: string;
  title: string;
  imageUrl: string;
}

interface FavoritesContextType {
  favorites: Meal[];
  addFavorite: (meal: Meal) => void;
  removeFavorite: (mealId: string) => void;
  isFavorite: (mealId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  const addFavorite = (meal: Meal) => {
    setFavorites((currentFavorites) => [...currentFavorites, meal]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((meal) => meal.id !== id));
  };

  const isFavorite = (mealId: string) => {
    return favorites.some((meal) => meal.id === mealId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

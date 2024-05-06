// useFavoritebooks.js
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFavoritebooks = () => {
  const [favoritebooks, setFavoritebooks] = useState([]);

  useEffect(() => {
    const fetchFavoritebooks = async () => {
      try {
        const favoriteBooksString = await AsyncStorage.getItem("favoritebooks");
        const favoritebooks = favoriteBooksString
          ? JSON.parse(favoriteBooksString)
          : [];
        setFavoritebooks(favoritebooks);
      } catch (err) {
        console.log("Error getting favorite books:", err);
      }
    };

    fetchFavoritebooks();
  }, []);

  const updateFavoritebooks = async (updatedFavoritebooks) => {
    try {
      await AsyncStorage.setItem(
        "favoritebooks",
        JSON.stringify(updatedFavoritebooks)
      );
      setFavoritebooks(updatedFavoritebooks);
    } catch (err) {
      console.log("Error updating favorite books:", err);
    }
  };

  return [favoritebooks, updateFavoritebooks];
};

export default useFavoritebooks;

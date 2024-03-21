import "./FavouritesList.scss";
import Favourite from "../Favourite/Favourite";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export default function FavouritesList(){
  const [favourites, setFavourites] = useState([]);
  const { userId } = useAuth();

  const handleDeleteFavourites = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/saveditems/${userId}/${id}`);
        console.log(`Request URL: http://localhost:8080/saveditems/${userId}/${id}`);
        if (response.status === 204) {
          toast("Your delete was successful!");
            setFavourites(currentFavourites => currentFavourites.filter(favourite => favourite.id !== id));
        } else {
            console.error('Failed to delete the item:', response);
            toast('Failed to save to delete the item. Please try again.');
        }
    } catch (error) {
        console.error('Error deleting:', error);
        toast('An error occurred while deleting to favourites. Please try again.');
    }
  };
  useEffect(() => {
    const fetchFavourites = async () => {
      if (!userId) {
          return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/saveditems/${userId}`);
        if (response.status === 200) {
            setFavourites(response.data);
        } else {
            console.error('Failed to fetch favourites:', response);
            toast('Failed to fetch favourites. Please try again.');
        }
      } catch (error) {
            console.error('Error fetching favourites:', error);
            toast('An error occurred while fetching favourites. Please try again.');
      }
    };
      fetchFavourites();
  }, [userId]);

  return (
    <div className="favourite__container">
      {favourites.map(favourite => (
        <Favourite key={favourite.id} favourite={favourite} onDelete={handleDeleteFavourites}/>
      ))}
    </div>
  );
}


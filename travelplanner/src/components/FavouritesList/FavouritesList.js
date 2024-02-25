import "./FavouritesList.scss";
import Favourite from "../Favourite/Favourite";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function FavouritesList(){
  const [favourites, setFavourites] = useState([]);
  const { userId } = useAuth();
      
    useEffect(() => {
      const fetchFavourites = async () => {
        if (!userId) {
            // alert('You must be logged in to view favourites.');
            return;
        }
        try {
          const response = await axios.get(`http://localhost:8080/saveditems/${userId}`);
          // console.log(response);
          if (response.status === 200) {
              setFavourites(response.data);
              // console.log(favourites);
          } else {
              console.error('Failed to fetch favourites:', response);
              alert('Failed to fetch favourites. Please try again.');
          }
        } catch (error) {
              console.error('Error fetching favourites:', error);
              alert('An error occurred while fetching favourites. Please try again.');
        }
      };
          fetchFavourites();
    }, [userId]);

  return (
    <div className="favourite__container">
      {favourites.map(favourite => (
        <Favourite key={favourite.id} favourite={favourite} />
      ))}
    </div>
  );
}
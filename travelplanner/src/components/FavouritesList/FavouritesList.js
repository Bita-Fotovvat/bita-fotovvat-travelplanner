import "./FavouritesList.scss";
import Favourite from "../Favourite/Favourite";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function FavouritesList(){
  const [favourites, setFavourites] = useState([]);
  const { userId } = useAuth();

  console.log(userId);
    // const favourites = [
            // {
            //   id: 1,
            //   location_id: '706589', 
            //   type: 'restaurant',
            //   // user_notes: 'Want to visit on my trip in December.',
            //   user_id: 1 
            // },
            // {
            //   id: 2,
            //   location_id: '1172031', 
            //   type: 'hotel',
            //   // user_notes: 'Recommended by a friend.',
            //   user_id: 2 
            // },
    //       {
    //         id: 30,
    //         category: 'Restaurant',
    //         name: 'Touro Churrascaria Brazilian Steakhouse & Wine Bar', 
    //         address: '125 York Blvd, Richmond Hill, Ontario L4B 3B4 Canada',
    //         phone: '+1 905-738-6876',
    //       }
    // ]

   
      // console.log(place.category.name);
      // console.log(place.name);
      // console.log(place.address);
      // console.log(place.phone);
      // console.log(user);
      // if (!isLoggedIn) {
      //     alert('You must be logged in to save to favourites.');
      //     return;
      // }
      
      useEffect(() => {
        const fetchFavourites = async () => {
        // Assuming the user's ID is stored in session storage upon login
        // For example, sessionStorage.setItem("userid", data.userid); in your login response

        // const userId = sessionStorage.getItem("userid");
        // console.log("userid");
        if (!userId) {
            // alert('You must be logged in to view favourites.');
            return;
        }
        try {
          // Use the userId in the request URL to fetch only the favourites for this user
          const response = await axios.get(`http://localhost:8080/users/${userId}/saveditems`);
          console.log(response);
          if (response.status === 200) {
              setFavourites(response.data);
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
  <div>
      {favourites.map(favourite => (
          <Favourite key={favourite.id} favourite={favourite} />
      ))}
  </div>
);
}
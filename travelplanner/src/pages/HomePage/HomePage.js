import "./HomePage.scss";
import React, { useEffect } from 'react';
import {useState} from 'react';
import { usePlaces } from '../../context/PlacesContext';
import SearchBar from "../../components/SearchBar/SearchBar";
import Map from "../../components/Map/Map";
import List from "../../components/List/List";
import { getPlacesData } from '../../api/index';

export default function HomePage(){




const [childClicked, setChildClicked] = useState(null);
const {
    places, setPlaces,
    filteredPlaces, setFilteredPlaces,
    coordinates, setCoordinates,
    bounds, setBounds,
    isLoading, setIsLoading,
    type, setType,
    rating, setRating,
  } = usePlaces();





      
        useEffect(()=>{
          navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
            setCoordinates({ lat: latitude, lng: longitude});
          })
        }, []);
      
        useEffect(()=>{
          const filteredPlaces = places.filter((place)=> place.rating > rating) //Number(place.rating)
          setFilteredPlaces(filteredPlaces);
        },[rating]);
      
      
        useEffect(()=>{
          // console.log(coordinates, bounds);
          if (bounds && bounds.sw && bounds.ne) {
            setIsLoading(true);
      
            getPlacesData(type, bounds.sw, bounds.ne)
      
              .then((data)=>{
                console.log(data);
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                setFilteredPlaces([]);
                // setRating('');
                setIsLoading(false);
            })
            .catch((error) => {
              console.error("Failed to fetch places data:", error);
            });
        }
        }, [type, coordinates, bounds]);

//////////////////////












    return(
    <>
      <SearchBar />
      <Map
      setChildClicked={setChildClicked}/>
      <List 
      childClicked={childClicked}/>
      isLoading={isLoading}
    </>
    )
}
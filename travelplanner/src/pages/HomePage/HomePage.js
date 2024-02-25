
import "./HomePage.scss";
import React, { useEffect } from 'react';
import {useState} from 'react';
import { usePlaces } from '../../context/PlacesContext';
import SearchBar from "../../components/SearchBar/SearchBar";
import Map from "../../components/Map/Map";
import List from "../../components/List/List";
import { getPlacesData } from '../../api/index';
import Greeting from "../../components/Greeting/Greeting";

export default function HomePage(){

  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [childClicked, setChildClicked] = useState(null);
  const {
      places, setPlaces,
  
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
  
    ////////////hfhfgf
        useEffect(()=>{
          const filteredPlaces = places.filter((place)=> place.rating > rating) //Number(place.rating)
          setFilteredPlaces(filteredPlaces);
        },[rating]);

        // useEffect(()=>{
        //   const filteredPlaces = places.filter((place)=> Number(place.rating) > Number(rating)) //Number(place.rating)
        //   setFilteredPlaces(filteredPlaces);
        // },[rating, places]);



      
      
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
  <Greeting/>
  <SearchBar />
    <Map
    places={filteredPlaces.length ? filteredPlaces : places}
    setChildClicked={setChildClicked}/>
    <List 
    places={filteredPlaces.length ? filteredPlaces : places}
    childClicked={childClicked}/>
    isLoading={isLoading}
  </>
  )
}


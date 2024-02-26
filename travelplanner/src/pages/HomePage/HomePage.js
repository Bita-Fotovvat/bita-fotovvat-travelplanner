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
    useEffect(()=>{
      const filteredPlaces = places.filter((place)=> place.rating > rating) //Number(place.rating)
        setFilteredPlaces(filteredPlaces);
    },[rating]);
    useEffect(()=>{
      if (bounds && bounds.sw && bounds.ne) {
        setIsLoading(true);
        getPlacesData(type, bounds.sw, bounds.ne)
        .then((data)=>{
            setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
            setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch places data:", error);
        });
      }
    }, [type, coordinates, bounds]);

  return(
  <>
    <Greeting/>
    <SearchBar />
      <section className="maplistparent">
        <Map
          places={filteredPlaces.length ? filteredPlaces : places}
          setChildClicked={setChildClicked}/>
        <List 
          places={filteredPlaces.length ? filteredPlaces : places}
          childClicked={childClicked}/>
          isLoading={isLoading}
      </section>
  </>
  )
}
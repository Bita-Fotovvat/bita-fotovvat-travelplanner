import './App.scss';
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import SearchBar from "./components/SearchBar/SearchBar";
import HomePage from "./pages/HomePage/HomePage";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import { getPlacesData } from './api/index';


export default function App() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);


  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
      setCoordinates({ lat: latitude, lng: longitude});
    })
  }, []);

  useEffect(()=>{
    const filteredPlaces = places.filter((place)=> place.rating > rating)
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
          setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch places data:", error);
      });
  }
  }, [type, coordinates, bounds]);

  return (
    <BrowserRouter>
      <Header/>
      <SearchBar setCoordinates={setCoordinates}/>
      <Map 
          setCoordinates = {setCoordinates}
          setBounds = {setBounds}
          coordinates = {coordinates}
          places = {filteredPlaces.length ? filteredPlaces : places}
          setChildClicked = {setChildClicked}
      />
      <List 
          places={filteredPlaces.length ? filteredPlaces : places}
          childClicked={childClicked}
          isLoading={isLoading}
          type = {type}
          setType = {setType}
          rating = {rating}
          setRating = {setRating}
      />
      <Routes>
          <Route path="/" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

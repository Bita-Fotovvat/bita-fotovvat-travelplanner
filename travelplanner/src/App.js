import './App.scss';
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import HomePage from "./pages/HomePage/HomePage";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import { getPlacesData } from './api/index';


export default function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
      setCoordinates({ lat: latitude, lng: longitude});
    })
  }, []);


  useEffect(()=>{
    console.log(coordinates, bounds);
    getPlacesData(bounds.sw, bounds.ne)
    .then((data)=>{
      
      console.log(data);
      setPlaces(data);
    }
    )
  }, [coordinates, bounds]);

  return (
    <BrowserRouter>
    <Header/>
    <Map 
    setCoordinates = {setCoordinates}
    setBounds = {setBounds}
    coordinates = {coordinates}
    />
    <List places={places}/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

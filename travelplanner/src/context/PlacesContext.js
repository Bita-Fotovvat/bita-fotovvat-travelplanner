import { createContext, useContext, useState } from 'react';
import ReactDOM from "react-dom/client";

const PlacesContext = createContext();

export const usePlaces = () => useContext(PlacesContext);

export const PlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState([]);

  return (
    <PlacesContext.Provider value={{
      places, setPlaces,
      filteredPlaces, setFilteredPlaces,
      childClicked, setChildClicked,
      coordinates, setCoordinates,
      bounds, setBounds,
      isLoading, setIsLoading,
      type, setType,
      rating, setRating
    }}>
      {children}
    </PlacesContext.Provider>
  );
};

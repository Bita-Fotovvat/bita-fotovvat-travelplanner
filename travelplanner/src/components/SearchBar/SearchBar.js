import "./SearchBar.scss";
import { usePlaces } from '../../context/PlacesContext';
import {useState} from 'react';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { Autocomplete } from '@react-google-maps/api';

export default function SearchBar(){
    const { setCoordinates } = usePlaces();
    const [autocomplete, setAutocomplete] = useState(null);
    const onLoad = (autoC)=> setAutocomplete(autoC);
    const onPlaceChanged = ()=>{
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoordinates({ lat, lng });
    }

    return(
        <section className="searchbar__container">
        <AppBar className="searchbar__background" position="static">
            <Toolbar>
                <Box className="searchbar__box">
                    <label className="searchbar__label">Explore new places</label>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <form  className="searchbar__form">
                        <input type="search" className="searchbar__input" placeholder="Search"/>
                    </form>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
        </section>

    );
}
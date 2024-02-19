import "./SearchBar.scss";
import {useState} from 'react';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete } from '@react-google-maps/api';


export default function SearchBar({setCoordinates}){
    const [autocomplete, setAutocomplete] = useState(null);
    
    const onLoad = (autoC)=> setAutocomplete(autoC);
    const onPlaceChanged = ()=>{
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoordinates({ lat, lng });
    }

    return(
        <AppBar position="static">
            <Toolbar >
                <h3>Travel Planner</h3>
                <Box display="flex">
                    <label>Explore new places</label>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <form className="form">
                        <input type="search" className="form__input" placeholder="Search"/>
                    </form>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
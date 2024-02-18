import "./List.scss";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails";
import Grid from "@mui/system/Unstable_Grid/Grid";
import {useState} from 'react';

export default function List(){
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const places = [
        {name: 'cool place'},
        {name: 'best beer'},
        {name: 'best steak'},
        {name: 'cool place'},
        {name: 'best beer'},
        {name: 'best steak'},
    ];

    return(
        <>
        <h1>Hotels, Restaurants & Attractions</h1>
        <FormControl className="form__parent">
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e)=> setType(e.target.value)}>
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
        </FormControl>
        <FormControl className="form__parent">
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e)=> setRating(e.target.value)}>
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
        </FormControl>
        <section className="cards">
            {places?.map((place, i)=>(
                <Grid item key={i}>
                    <PlaceDetails place={place}/>
                </Grid>
            ))}
        </section>
        </>
     );
}
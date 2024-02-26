import "./List.scss";
import { usePlaces } from '../../context/PlacesContext';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails";
import Grid from "@mui/system/Unstable_Grid/Grid";
import {useState, useEffect, createRef} from 'react';
import { useAuth } from '../../context/AuthContext';

export default function List({childClicked }){
    const { bounds, setPlaces, isLoading, setIsLoading } = usePlaces();
    const {places, type, setType, rating, setRating} = usePlaces();
    const [elRefs, setElRefs] = useState([]);
    const { isLoggedIn, user } = useAuth();
    const [favourite, setFavourite] = useState([]);
    const [displayedPlaces, setDisplayedPlaces] = useState([]);
    const { userId } = useAuth();
    useEffect(() => {
        const refs = Array(places?.length).fill().map((_,i)=> elRefs[i] || createRef());
        setElRefs(refs);
    }, [places]);
    useEffect(() => {
        if (childClicked !== null && places?.length > 0) {
            const clickedPlace = places[childClicked];
            const otherPlaces = places?.filter((_, index) => index !== childClicked);
            setDisplayedPlaces([clickedPlace, ...otherPlaces]);
        } else {
            setDisplayedPlaces(places);
        }
    }, [childClicked, places]);
  
    return(
        <div className="list">
            <h1 className="list__title">Hotels, Restaurants & Attractions</h1>
            {isLoading ? (
                <div>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                <FormControl className="form__parent">
                    <h4 className="form__typetitle">Type</h4>
                    <Select value={type} onChange={(e)=> setType(e.target.value)}>
                        <MenuItem className="form__options" value="restaurants">Restaurants</MenuItem>
                        <MenuItem className="form__options" value="hotels">Hotels</MenuItem>
                        <MenuItem className="form__options" value="attractions">Attractions</MenuItem>
                    </Select>
                </FormControl>
                {/* <FormControl className="form__parent">
                    <h4 className="form__ratingtitle">Rating</h4>
                    <Select value={rating} onChange={(e)=> setRating(e.target.value)}>
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={3}>Above 3.0</MenuItem>
                        <MenuItem value={4}>Above 4.0</MenuItem>
                        <MenuItem value={4.5}>Above 4.5</MenuItem>
                    </Select>
                </FormControl> */}
                <div className="cardli__container">
                    <section className="cardli__item">
                        {displayedPlaces?.map((place, i)=>(
                            <Grid item key={i}>
                                <PlaceDetails
                                place={place}
                                selected={Number(childClicked)=== i }
                                refProp={elRefs[i]}
                                />
                            </Grid>
                        ))}
                    </section>
                </div>
    
                </>
            )}
        </div>
    );
}
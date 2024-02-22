import "./List.scss";
import { usePlaces } from '../../context/PlacesContext';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails";
import Grid from "@mui/system/Unstable_Grid/Grid";
import {useState, useEffect, createRef} from 'react'; //craeteRef
import { useAuth } from '../../context/AuthContext';


export default function List(){
    const {places, childClicked, isLoading, type, setType, rating, setRating} = usePlaces();
    const [elRefs, setElRefs] = useState([]);
    const { isLoggedIn } = useAuth();

    // const handleSaveToFavourites = (place) => {
    //     // Placeholder for saving logic
    //     console.log('Saving to favourites:', place);
    //     // Here you would likely update some state or make an API call
    //   };
      
    console.log({childClicked});
    useEffect(() => {
        setElRefs((prevRefs) => {
            return Array(places?.length).fill().map((_, i) => prevRefs[i] || createRef());
        });
    }, [places]);
    

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
            <h4>Type</h4>
            <Select value={type} onChange={(e)=> setType(e.target.value)}>
                <MenuItem className="form__options" value="restaurants">Restaurants</MenuItem>
                <MenuItem className="form__options" value="hotels">Hotels</MenuItem>
                <MenuItem className="form__options" value="attractions">Attractions</MenuItem>
            </Select>
        </FormControl>
        <FormControl className="form__parent">
            <h4>Rating</h4>
            <Select value={rating} onChange={(e)=> setRating(e.target.value)}>
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
        </FormControl>
    <div className="card__container">
        <section className="card__item">
            {places?.map((place, i)=>(
                <Grid item key={i}>
                    <PlaceDetails
                    place={place}
                    selected={Number(childClicked)=== i }
                    refProp={elRefs[i]}
                    />
                {isLoggedIn && (
                    // <button onClick={() => handleSaveToFavourites(place)}>
                    <button>
                    Save
                    </button>
                )}
                </Grid>
            ))}
        </section>
    </div>

        </>
        )}
        </div>
     );
}
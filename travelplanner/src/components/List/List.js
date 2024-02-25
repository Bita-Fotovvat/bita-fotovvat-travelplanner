import "./List.scss";
import { usePlaces } from '../../context/PlacesContext';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails";
import Grid from "@mui/system/Unstable_Grid/Grid";
import {useState, useEffect, createRef} from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from "axios";
import { getPlacesData } from '../../api/index'; //my api call 

export default function List({childClicked }){
    const {
        bounds, setPlaces, isLoading, setIsLoading,
    } = usePlaces();////////////////////3



    const {places, type, setType, rating, setRating} = usePlaces();
    const [elRefs, setElRefs] = useState([]);
    const { isLoggedIn, user } = useAuth();
    const [favourite, setFavourite] = useState([]);
    const [displayedPlaces, setDisplayedPlaces] = useState([]);////////////NPP
    const { userId } = useAuth();


    console.log({childClicked});
    // useEffect(() => {
    //     setElRefs((prevRefs) => {
    //         return Array(places?.length).fill().map((_, i) => prevRefs[i] || createRef());
    //     });
    // }, [places]); /////////////////////////NEW

    useEffect(() => {
        const refs = Array(places?.length).fill().map((_,i)=> elRefs[i] || createRef());
        setElRefs(refs);
    }, [places]);


//////{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}

////{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}





//////////////////////////////////////NPP
useEffect(() => {
    if (childClicked !== null && places.length > 0) {
        const clickedPlace = places[childClicked];
        const otherPlaces = places.filter((_, index) => index !== childClicked);
        setDisplayedPlaces([clickedPlace, ...otherPlaces]);
    } else {
        setDisplayedPlaces(places); // Fallback to original order if no child is clicked
    }
}, [childClicked, places]);
////////////////NPP

/////////////////////////////////////////////////////PPP
// // Assume getPlacesData is your function to fetch data based on the selected type
// const fetchData = async () => {
//     setIsLoading(true); // Assuming you have a state to track loading status
//     try {
//         const data = await getPlacesData(type); // Fetch data for the current type
//         const validatedData = data.map((place) => ({
//             ...place,
//             photo: place.photo || { images: { large: { url: 'defaultImageUrl.jpg' } } }, // Provide default photo if missing
//         }));
//         setDisplayedPlaces(validatedData);
//     } catch (error) {
//         console.error("Error fetching places data:", error);
//         // Handle error (e.g., set an error message state here)
//     } finally {
//         setIsLoading(false); // Ensure loading state is reset whether the fetch succeeds or fails
//     }
// };

// // Call fetchData when 'type' changes
// useEffect(() => {
//     fetchData();
// }, [type]);
////////////////////////////////////////////////////PPP




// console.log({childClicked});
///////////////////////////////////
// getPlacesData(type, bounds.sw, bounds.ne)
      
// .then((data)=>{
//   console.log(data);
//   setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
//   setFilteredPlaces([]);
//   // setRating('');
//   setIsLoading(false);
// })
// .catch((error) => {
// console.error("Failed to fetch places data:", error);
// });


const handleSaveToFavourites = async (place) => {
// console.log(place.category.name);
// console.log(place.name);
// console.log(place.address);
// console.log(place.phone);
// console.log(user);
if (!isLoggedIn) {
    alert('You must be logged in to save to favourites.');
    return;
}

const payload = {
    category: place.category?.name || 'Unknown', // Assuming 'category' might be an object with a 'name' property
    name: place.name || 'Unknown',
    address: place.address || 'No address provided',
    phone: place.phone || 'No phone number provided'
};

try {
    const response = await axios.post(`http://localhost:8080/saveditems/${userId}`, payload);
    if (response.status === 201) { // Assuming 201 Created is the success status code from your backend
        alert("Your save was successful!");
    } else {
        // If the server responds with a status code outside the 2xx range, log the response
        console.error('Failed to save to favourites:', response);
        alert('Failed to save to favourites. Please try again.');
    }
} catch (error) {
    // Log the error object for debugging purposes
    console.error('Error saving to favourites:', error);
    alert('An error occurred while saving to favourites. Please try again.');
}
};

 
////////////////////////////////////

console.log(places);
console.log(displayedPlaces);



      

    

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
            {displayedPlaces?.map((place, i)=>(    /////places=>displayedPlaces////NPP
                <Grid item key={i}>
                    <PlaceDetails
                    place={place}
                    selected={Number(childClicked)=== i }
                    refProp={elRefs[i]}
                    />
                {isLoggedIn && (
                    <button onClick={(e) => handleSaveToFavourites(place)}>
                    + Save to My Favourites
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
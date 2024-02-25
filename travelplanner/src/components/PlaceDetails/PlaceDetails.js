import "./PlaceDetails.scss";
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from "@mui/material";
import Rating from "@mui/material/Rating";
import { classes } from "istanbul-lib-coverage";
import LocationIcon from "../../assets/icons/location.png";
import PhoneIcon from "../../assets/icons/phone.png";
import { useAuth } from '../../context/AuthContext';
import {useState, useEffect, createRef} from 'react';
import axios from "axios";

export default function PlaceDetails({place, selected, refProp}){
    const [elRefs, setElRefs] = useState([]);
    const { isLoggedIn, user } = useAuth();
    const { userId } = useAuth();
    if (!place) return null;
    // const fallbackImageUrl = 'https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_nuit_v2-scaled.jpg';
    const fallbackImageUrl = 'https://resizer.otstatic.com/v2/photos/wide-mlarge/3/59976967.webp';
    // const imageUrl = place.photo?.images?.large?.url || fallbackImageUrl;
    if(selected) refProp?.current?.scrollIntoView({ behavior:"smooth", block:"start"}) //

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
    
    return(
    //     <Card className="card" elevation={6}>
    //         <CardMedia
    //             // style={{height: 350}}
    //             className="card__image"
    //             image={place.photo ? place.photo.images.large.url : fallbackImageUrl}
    //             title={place.name}
    //         />
    //         <CardContent>
    //             <h2 className="card__placename">{place.name}</h2>
    //             <section className="card__ratingparent">
    //                 <div className="card__rating"><Rating size="small" value={Number(place.rating)} readOnly/></div>
    //                 <h4 className="card__revnum">Out of {place.num_reviews} reviews</h4>
    //             </section>
    //             <section className="card__priceparent">
    //                 <h4 className="card__price">Price Range</h4>
    //                 <p className="card__pricelevel">{place.price_level}</p>
    //             </section>
    //             {/* <section className="card__rankingparent">
    //                 <h4 className="card__ranking">Ranking</h4>
    //                 <p className="card__ranktext">{place.ranking}</p>
    //             </section> */}
    //             {place?.cuisine?.map(({name})=>(
    //                 <Chip key={name} size="small" label = {name} className={classes.chip} />
    //             ))}
    //             {place?.address && (
    //                 <>
    //                 <img className="locationicon" src={LocationIcon} alt="location icon" />
    //                 <p>{place.address}</p>
    //                 </>
    //             )}
    //             {place?.phone && (
    //                 <>
    //                 <img className="locationicon" src={PhoneIcon} alt="phone icon" />
    //                 <p>{place.phone}</p>
    //                 </>
    //             )}
    //             <button onClick={()=> window.open(place.website, '_blank')}>Website</button>
    //         </CardContent>
    //     </Card>
    // );
    <Card className="card" elevation={6}>
    <CardMedia
        // style={{height: 350}}
        className="card__image"
        image={place.photo ? place.photo.images.large.url : fallbackImageUrl}
        title={place.name}
    />
    <CardContent>
        <h2 className="card__placename">{place.name}</h2>
        <section className="card__ratingparent">
            <div className="card__rating"><Rating size="small" value={Number(place.rating)} readOnly/></div>
            <h4 className="card__revnum">Out of {place.num_reviews} reviews</h4>
        </section>
        <section className="card__priceparent">
            <h4 className="card__price">Price Range</h4>
            <p className="card__pricelevel">{place.price_level}</p>
        </section>
        {/* <section className="card__rankingparent">
            <h4 className="card__ranking">Ranking</h4>
            <p className="card__ranktext">{place.ranking}</p>
        </section> */}
        {place?.cuisine?.map(({name})=>(
            <Chip key={name} size="small" label = {name} className={classes.chip} />
        ))}
        {place?.address && (
            <section className="card__location">
                <img className="card__location--icon" src={LocationIcon} alt="location icon" />
                <p className="card__location--address">{place.address}</p>
            </section>
        )}
        {place?.phone && (
            <section className="card__phone">
                <img className="card__phone--icon" src={PhoneIcon} alt="phone icon" />
                <p className="card__phone--num">{place.phone}</p>
            </section>
        )}
        <button className="card__websitebutton" onClick={()=> window.open(place.website, '_blank')}>Website</button>
    </CardContent>
    {isLoggedIn && (
        <button  className="card__savebutton" onClick={(e) => handleSaveToFavourites(place)}>
            + Save to My Favourites
        </button>
    )}
</Card>
);
}
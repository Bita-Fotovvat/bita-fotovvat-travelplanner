import "./PlaceDetails.scss";
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from "@mui/material";
import Rating from "@mui/material/Rating";
import { classes } from "istanbul-lib-coverage";
import LocationIcon from "../../assets/icons/location.png";
import PhoneIcon from "../../assets/icons/phone.png";
import { useAuth } from '../../context/AuthContext';
import {useState, useEffect, createRef} from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

export default function PlaceDetails({place, selected, refProp}){
    const [elRefs, setElRefs] = useState([]);
    const { isLoggedIn, user } = useAuth();
    const { userId } = useAuth();
    if (!place) return null;
    const fallbackImageUrl = 'https://resizer.otstatic.com/v2/photos/wide-mlarge/3/59976967.webp';
    if(selected) refProp?.current?.scrollIntoView({ behavior:"smooth", block:"start"}) //

    const handleSaveToFavourites = async (place) => {
        if (!isLoggedIn) {
            toast('You must be logged in to save to favourites.');
            return;
        }
        const payload = {
            category: place.category?.name || 'Unknown',
            name: place.name || 'Unknown',
            address: place.address || 'No address provided',
            phone: place.phone || 'No phone number provided'
        };
        try {
            const response = await axios.post(`http://localhost:8080/saveditems/${userId}`, payload);
            if (response.status === 201) {
                toast("Your save was successful");
            } else {
                console.error('Failed to save to favourites:', response);
                toast('Failed to save to favourites. Please try again.');
            }
        } catch (error) {
            console.error('Error saving to favourites:', error);
            toast('An error occurred while saving to favourites. Please try again.');
        }
    };
    
    return(
        <Card className="card" elevation={6}>
        <CardMedia
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



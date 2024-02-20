import "./PlaceDetails.scss";
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from "@mui/material";
import Rating from "@mui/material/Rating";
import { classes } from "istanbul-lib-coverage";
import LocationIcon from "../../assets/location.png";
import PhoneIcon from "../../assets/phone.png";

export default function PlaceDetails({place, selected, refProp}){

    if(selected) refProp?.current?.scrollIntoView({ behavior:"smooth", block:"start"}) //

    return(
        <>
        {/* <h1>{place.name}</h1> */}

        <Card elevation={6}>
            <CardMedia
            style={{height: 350}}
            image={place.photo ? place.photo.images.large.url : 'https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_nuit_v2-scaled.jpg'}
            title={place.name}
            />
            <CardContent>
                <h2>{place.name}</h2>
                <div className="card__rating"><Rating size="small" value={Number(place.rating)} readOnly/></div>
                <h4>Out of {place.num_reviews} reviews</h4>
                <h4>Price</h4>
                <p>{place.price_level}</p>
                <h4>Ranking</h4>
                <p>{place.ranking}</p>
                {place?.cuisine?.map(({name})=>(
                    <Chip key={name} size="small" label = {name} className={classes.chip} />
                ))}
                {place?.address && (
                    <>
                    <img className="locationicon" src={LocationIcon} alt="location icon" />
                    <p>{place.address}</p>
                    </>
                )}
                {place?.phone && (
                    <>
                    <img className="locationicon" src={PhoneIcon} alt="phone icon" />
                    <p>{place.phone}</p>
                    </>
                )}
                <button onClick={()=> window.open(place.website, '_blank')}>Website</button>
            </CardContent>
        </Card>
        </>
    );
}

import "./Map.scss";
import GoogleMapReact from 'google-map-react';
import { usePlaces } from '../../context/PlacesContext';
import {Paper, Typography, useMediaQuery} from '@mui/material';
import Rating from "@mui/material/Rating";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';



// const handleChange = (e) => {
//     setCoordinates({ lat: e.center.lat, lng: e.center.lng });
//     setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
// };

export default function Map(){

    const { setCoordinates, setBounds, coordinates, places, setChildClicked } = usePlaces();
    // const coordinates = { lat: 0, lng: 0};
    // const API_KEY = AIzaSyAb4K_QXu9ej6UO3vTvykrZTMm31zRjQGA;
    const isDesktop = useMediaQuery('(min-width:600px)');

    return(
        <>
        <div className="map__container">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAb4K_QXu9ej6UO3vTvykrZTMm31zRjQGA' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={(e)=>{
                    console.log(e);

                    setCoordinates({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});

                }}
                onChildClick={(child)=>{setChildClicked(child)}}
                >
                   {places?.map((place, i)=>(
                    <div
                    className="marker"
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    key={i}
                    >
                       {
                        !isDesktop ? (
                            <LocationOnOutlinedIcon />
                        ) : (
                            <Paper elevation={3} className="marker__cards">
                                <Typography className="class" varient="subtitle2" gutterBottom>{place.name}</Typography>
                                <img 
                                className="marker__cardimg"
                                src={place.photo ? place.photo.images.large.url : 'https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_nuit_v2-scaled.jpg'}
                                alt={place.name}
                                />
                                <Rating size="small" value={Number(place.rating)} readOnly/>
                            </Paper>
                        )
                       }
                    </div>
                   ))} 
            </GoogleMapReact>
        </div>
        </>
    );
}
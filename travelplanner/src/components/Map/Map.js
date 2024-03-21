import "./Map.scss";
import GoogleMapReact from 'google-map-react';
import { usePlaces } from '../../context/PlacesContext';
import { useMediaQuery } from '@mui/material';
import Rating from "@mui/material/Rating";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';


export default function Map({setChildClicked}){

    const { setCoordinates, setBounds, coordinates, places} = usePlaces();
    const isDesktop = useMediaQuery('(min-width:600px)');
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const fallbackImageUrl = 'https://resizer.otstatic.com/v2/photos/wide-mlarge/3/59976967.webp';

    return(
        <>
        <div className="map__container">
            <GoogleMapReact
                bootstrapURLKeys={{ key: googleMapsApiKey }}
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
                    onClick={() => setChildClicked(i)}
                    >
                       {
                        !isDesktop ? (
                            <LocationOnOutlinedIcon color="primary" fontsize="large"/>
                        ) : (
                            <div className="marker__cards">
                                <h4 className="marker__title" gutterBottom>{place.name}</h4>
                                <img 
                                className="marker__img"
                                src={place.photo ? place.photo.images.large.url : fallbackImageUrl}
                                alt={place.name}
                                />
                                <Rating className="marker__rating" size="small" value={Number(place.rating)} readOnly/>
                            </div>
                        )
                       }
                    </div>
                   ))} 
            </GoogleMapReact>
        </div>
        </>
    );
}


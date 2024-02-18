import "./Map.scss";
import GoogleMapReact from 'google-map-react';

export default function Map({setCoordinates, setBounds, coordinates}){

    // const coordinates = { lat: 0, lng: 0};
    // const API_KEY = AIzaSyAb4K_QXu9ej6UO3vTvykrZTMm31zRjQGA;

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
                inChildClick={''}
                >
            </GoogleMapReact>
        </div>
        </>
    );
}
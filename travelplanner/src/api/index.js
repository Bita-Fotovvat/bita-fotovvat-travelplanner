import axios from 'axios';

// const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

const options = {
    params: {
        bl_latitude: '11.847676',
        tr_latitude: '12.838442',
        bl_longitude: '109.095887',
        tr_longitude: '109.149359',
      },
      headers: {
        'X-RapidAPI-Key': '8ce1e28579msh275ca8773e55ad9p1c2fcbjsn7707c937760e',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
}

export const getPlacesData = async (type, sw, ne) =>{
    try {
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
              },
              headers: {
                'X-RapidAPI-Key': '8ce1e28579msh275ca8773e55ad9p1c2fcbjsn7707c937760e',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
              }
        });

        return data;
    } catch (error) {
        console.log(error);
    }
}
import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async (sw,ne) =>{
    try {
        const { data: {data}} = await axios.get(URL, {
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
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

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
  };
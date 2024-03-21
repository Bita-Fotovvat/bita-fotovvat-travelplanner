import axios from 'axios';

export const getPlacesData = async (type, sw, ne) =>{
    const travelAdvisorApiKey = process.env.TRAVEL_ADVISOR_API_KEY;
    try {
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
              },
              headers: {
                'X-RapidAPI-Key': travelAdvisorApiKey,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
              }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}
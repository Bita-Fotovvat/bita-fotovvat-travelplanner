import "./FavouritesList.scss";
import Favourite from "../Favourite/Favourite";

export default function FavouritesList(){

    const favourites = [
            {
              id: 1,
              location_id: '706589', 
              type: 'restaurant',
              // user_notes: 'Want to visit on my trip in December.',
              user_id: 1 
            },
            {
              id: 2,
              location_id: '1172031', 
              type: 'hotel',
              // user_notes: 'Recommended by a friend.',
              user_id: 2 
            },
    ]

return(
<div>
    {favourites.map( favourite =>{
        return <Favourite key = {favourite.id} favourite={favourite}></Favourite>
    })}
</div>
);
}
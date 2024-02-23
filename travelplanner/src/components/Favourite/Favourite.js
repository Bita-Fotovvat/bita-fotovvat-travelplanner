import "./Favourite.scss";

export default function Favourite(props){
    return(
        <>
        <article className="favourite__section">
            <h3>Location Id</h3>
            <div>{props.favourite.location_id}</div>

            <h3>Type</h3>
            <div>{props.favourite.type}</div>

            {/* <h3>My Notes</h3>
            <div>{props.favourite.user_notes}</div> */}
        </article>
        </>

    )
}
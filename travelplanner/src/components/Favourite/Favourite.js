import "./Favourite.scss";


export default function Favourite(props){
    return(
        <>
        <article className="favourite__section">
            <h3>Category</h3>
            <div>{props.favourite.category}</div>

            <h3>Name</h3>
            <div>{props.favourite.name}</div>

            <h3>Address</h3>
            <div>{props.favourite.address}</div>

            <h3>Phone</h3>
            <div>{props.favourite.phone}</div>
        </article>
        </>

    )
}
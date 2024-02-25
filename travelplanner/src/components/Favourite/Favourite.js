import "./Favourite.scss";

export default function Favourite(props){
    return(
        <article className="favourite__section">
            <section calssName="category__parent">
                <h3 calssName="category__title">Category</h3>
                <div calssName="category__item">{props.favourite.category}</div>
            </section>
            <section calssName="name__parent">
                <h3 calssName="name__title">Name</h3>
                <div calssName="name__item">{props.favourite.name}</div>
            </section>
            <section calssName="address__parent">
                <h3 calssName="address__title">Address</h3>
                <div calssName="address__item">{props.favourite.address}</div>
            </section>
            <section calssName="phone__parent">
                <h3 calssName="phone__title">Phone</h3>
                <div calssName="phone__item">{props.favourite.phone}</div>
            </section>
            <button className="delete__button">Delete from My Favourites</button>
        </article>
    )
}
import "./Favourite.scss";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Favourite({ favourite, onDelete }){
    const handleDelete = () => {
        // Call the onDelete function passed as a prop with favourite.id
        onDelete(favourite.id);
        console.log("Item deleted");
        // Close the toast manually after performing the action
        toast.dismiss();
    };

    // This function triggers the confirmation toast
    const confirmDelete = () => {
        toast.warn(<div className="confirmation">
            Are you sure you want to delete this?
            {/* Bind handleDelete directly to the Yes button */}
            <button className="yesbutton" onClick={handleDelete}>Yes</button>
            {/* Use toast.dismiss to bind a No button that cancels the action */}
            <button className="nobutton"  onClick={() => toast.dismiss()}>No</button>
        </div>, {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            draggable: true,
        });
    };

    
    return(
        <article className="favourite__section">
            <section calssName="category__parent">
                <h3 calssName="category__title">Category</h3>
                <div calssName="category__item">{favourite.category}</div>
            </section>
            <section calssName="name__parent">
                <h3 calssName="name__title">Name</h3>
                <div calssName="name__item">{favourite.name}</div>
            </section>
            <section calssName="address__parent">
                <h3 calssName="address__title">Address</h3>
                <div calssName="address__item">{favourite.address}</div>
            </section>
            <section calssName="phone__parent">
                <h3 calssName="phone__title">Phone</h3>
                <div calssName="phone__item">{favourite.phone}</div>
            </section>
            <button className="delete__button" onClick={confirmDelete}>Delete from My Favourites</button>
        </article>
    )
}
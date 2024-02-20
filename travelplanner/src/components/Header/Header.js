import "./Header.scss";

// export default function Header(){

//     return(
//         <header className="header">
//             <nav className="header__nav">
//                 <ul className="header__navli">
//                     <li className="header__navli--item">Home</li>
//                     <li className="header__navli--item">My Profile</li>
//                     <li className="header__navli--item">Log In</li>
//                 </ul>
//             </nav>
//         </header>
//     );
// }

import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
    const { isLoggedIn, logout } = useAuth();

    return (
        <header className="header">
            <nav className="header__nav">
                <ul className="header__navli">
                    <li className="header__navli--item"><Link to="/">Home</Link></li>
                    {isLoggedIn ? (
                        <>
                            <li className="header__navli--item"><Link to="/profile">My Profile</Link></li>
                            <li className="header__navli--item" onClick={logout}>Log Out</li>
                        </>
                    ) : (
                        <li className="header__navli--item"><Link to="/login">Log In</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
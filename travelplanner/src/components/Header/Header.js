import "./Header.scss";

import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
    const { isLoggedIn, logout } = useAuth();

    return (
        <header className="header">
            <nav className="header__nav">
                <ul className="header__navli">
                    <li className="header__navli--item"><Link className="header__navli--link" activeClassName="active" to="/">Home</Link></li>
                    {isLoggedIn ? (
                        <>
                            <li className="header__navli--item"><Link className="header__navli--link"  to="/profile">My Profile</Link></li>
                            <li className="header__navli--item" onClick={logout}>Log Out</li>
                        </>
                    ) : (
                        <li className="header__navli--item"><Link  className="header__navli--link" to="/login">Log In</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
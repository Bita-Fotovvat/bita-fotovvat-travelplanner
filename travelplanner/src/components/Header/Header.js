import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext'; 
import Logo from "../../assets/logo/logo.png"

export default function Header() {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    return (
        <header className="header">
            <nav className="header__nav">
                <ul className="header__navli">
                {/* <img className="header__logo" src={Logo} onClick={()=>navigate("/")}/> */}
                    <li className="header__navli--item" onClick={()=>navigate("/")}>Home</li>
                    {isLoggedIn ? (
                        <>
                            <li className="header__navli--item" onClick={()=>navigate("/profile")}>My Profile</li>
                            <li className="header__navli--item" onClick={logout}>Log Out</li>
                        </>
                    ) : (
                        <li className="header__navli--item" onClick={()=>navigate("/login")}>Log In</li>
                    )}
                </ul>
            </nav>
        </header>
    );
}